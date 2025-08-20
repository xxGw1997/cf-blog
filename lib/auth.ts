import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import ResendProvider from "next-auth/providers/resend";

import { createDb } from "./db";
import { accounts, sessions, users, verificationTokens } from "./db/schema";

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
        }
        return token;
      },
      session: async ({ session, token }) => {
        if (token && session.user) {
          session.user.id = token.id as string;
        }
        return session;
      },
    },
  };
});
