import { db } from "@/lib/db";
import { UserRole as PrismaUserRole } from "@prisma/client";

interface User {
  id: string;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  role: PrismaUserRole; 
  isTwoFactorEnable: boolean | null; 
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({ where: { email } });    

    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
    try {
      const user = await db.user.findUnique({ where: { id } });
  
      return user;
    } catch (error) {
      throw error;
    }
  };
