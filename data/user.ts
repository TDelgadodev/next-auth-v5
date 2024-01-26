import { db } from "@/lib/db";

interface User {
  email: string | null;
  password: string | null;
  // any other properties you expect `user` to have
}

export const getUserByEmail = async (email: string): Promise<User | Error | null> => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    return error as Error;
  }
};

export const getUserById = async (id: string) => {
    try {
      const user = await db.user.findUnique({ where: { id } });
  
      return user;
    } catch (error) {
      return error;
    }
  };
