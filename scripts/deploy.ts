import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PROJECT_NAME = process.env.PROJECT_NAME || "cf-blog";

const REQUIRED_ENV = [
  "NEXT_PUBLIC_BASE_URL",
  "NEXT_PUBLIC_R2_DOMAIN",
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_API_TOKEN",
  "DATABASE_NAME",
  "DATABASE_ID",
] as const;

/**
 * 主函数
 */
const main = async () => {
  try {
    console.log("[🚀] Starting deployment process...");

    validateEnvironment();
    setupEnvFile();
    migrateDatabase();
    await pushWorkerSecret();
    deployWorkers();

    console.log("[🎉🎉🎉] Deployment completed successfully");
  } catch (error) {
    console.error("[❌] Deployment failed:", error);
    process.exit(1);
  }
};

main();

function validateEnvironment() {
  const missing = REQUIRED_ENV.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(
      `[❌] Missing required env variables: ${missing.join(", ")}`
    );
  }
}

function setupEnvFile() {
  console.log("[📄] Setting up env file ...");
  const envFilePath = resolve(".env");

  if (existsSync(envFilePath)) {
    console.log("[✅] .env file is exists ...");
  } else {
    console.error("[❌] .env file not found!");
    throw new Error(".env file not found!");
  }
}

function migrateDatabase() {
  console.log("[📝] Migrating remote database ...");
  try {
    execSync("pnpm run db:migrate-remote", { stdio: "inherit" });
    console.log("[✅] Database migration completed successfully");
  } catch (error) {
    console.error("[❌] Database migration failed:", error);
    throw error;
  }
}

function pushWorkerSecret() {
  console.log("[🔏] Pushing env secrets to Worker ...");
  try {
    // 创建临时文件，只包含运行时所需要的变量
    const envContent = readFileSync(resolve(".env"), "utf-8");
    const runtimeEnvFile = resolve(".env.runtime");

    const runtimeEnvContent = envContent
      .split("\n")
      .filter((line) => {
        const trimmedLine = line.trim();
        // Skip annotation and empty line
        if (!trimmedLine || trimmedLine.startsWith("#")) return false;

        // Check whether it is an env variable required for runtime
        for (const varName of REQUIRED_ENV) {
          if (
            line.startsWith(`${varName} =`) ||
            line.startsWith(`${varName}=`)
          ) {
            return true;
          }
        }

        return false;
      })
      .join("\n");

    // Write the env variables into the temporary env file.
    writeFileSync(runtimeEnvFile, runtimeEnvContent);

    // Push the variable from the temporary env file to Cloudflare
    execSync(
      `pnpm dlx wrangler secret bulk ${runtimeEnvFile} --name ${PROJECT_NAME}`,
      { stdio: "inherit" }
    );

    // Delete the temporary env file
    execSync(`rm ${runtimeEnvFile}`, { stdio: "inherit" });

    console.log("[✅] Push secrets successful!");
  } catch (error) {
    console.error("[❌] Failed to push secrets:", error);
    throw error;
  }
}

function deployWorkers() {
  console.log(`[🚧] Deploying to Cloudflare Worker ...`);
  try {
    execSync("pnpm run deploy", { stdio: "inherit" });
    console.log("[✅] Worker deployment completed successfully~");
  } catch (error) {
    console.error("❌ Worker deployment failed:", error);
    throw error;
  }
}
