"use server";

import { createR2 } from "@/lib/r2";

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File | null;

    if (!file || file.size === 0)
      throw new Error("No file to upload, please select a file!");

    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");

    const r2 = createR2();
    const fileFromR2 = await r2.get(sanitizedFilename);

    if (fileFromR2)
      throw new Error(
        `File name "${sanitizedFilename}" already exist! please change another name.`
      );

    const fileBuffer = await file.arrayBuffer();
    await r2.put(sanitizedFilename, fileBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    return {
      success: true,
      message: `File upload success~`,
      url: `${process.env.NEXT_PUBLIC_R2_DOMAIN}/${sanitizedFilename}`,
      filename: sanitizedFilename,
    };
  } catch (error) {
    throw error;
  }
}
