"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async function GET() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { sucess: "Allowed Server Action!" }
  }

  return { error: "Forbidden Server Actions!" }
}
