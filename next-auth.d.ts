import { UserRole } from "@prisma/client";
import nextAuth, { type DefaultSession } from "next-auth";

export type Extendeduser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: Extendeduser;
  }
}
