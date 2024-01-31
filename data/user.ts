import { db } from "@/lib/db";
import { UserRole as PrismaUserRole } from "@prisma/client";

interface User {
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  role: PrismaUserRole; 
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
