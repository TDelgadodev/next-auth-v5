import { db } from "@/lib/db";
import { UserRole as PrismaUserRole } from "@prisma/client";

interface User {
  email: string | null;
  password: string | null;
  role: PrismaUserRole; 
}

export const getUserByEmail = async (email: string): Promise<User | Error | null> => {
  try {
    const user = await db.user.findUnique({ where: { email } });    

    return user;
  } catch (error) {
    return error as Error;
  }
};

export const getUserById = async (id: string): Promise<User | Error | null> => {
    try {
      const user = await db.user.findUnique({ where: { id } });
  
      return user;
    } catch (error) {
      return error as Error;
    }
  };
