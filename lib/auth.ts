import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import ResendProvider from "next-auth/providers/resend";

import { createDb } from "./db";
import { accounts, sessions, users, verificationTokens } from "./db/schema";
import type { Role } from "./db/schema";

// 扩展NextAuth的类型定义
declare module "next-auth" {
  interface User {
    role: Role;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const db = createDb();

  return {
    secret: process.env.AUTH_SECRET,
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    providers: [
      ResendProvider({
        apiKey: process.env.AUTH_RESEND_KEY,
        from: "no-reply@88boy.lol",
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          token.id = user.id;
          token.role = user.role;
        }
        return token;
      },
      session: async ({ session, token }) => {
        if (token && session.user) {
          session.user.id = token.id as string;
          session.user.role = token.role as Role;
        }
        return session;
      },
    },
  };
});
