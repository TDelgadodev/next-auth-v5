import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {

      if (account?.provider !== "credentials") return true;

      const userId = user.id;

      if (!userId) {
        return false; 
      };

      const existingUser = await getUserById(userId);

      if (!existingUser || !existingUser.id) {
        return false;
      }

      if (existingUser.isTwoFactorEnable) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      if (session.user) {
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? ""; 
        session.user.isOAuth = token.isOAuth as boolean ?? false;    
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      if (existingUser && existingUser.id) {
        const existingAccount = await getAccountByUserId(existingUser.id);    
        token.isOAuth = !!existingAccount
        token.name = existingUser.name;
        token.email = existingUser.email
        token.role = existingUser.role;
        token.isTwoFactorEnabled = existingUser.isTwoFactorEnable;
      }
      
      return token;
    },
  },
});
