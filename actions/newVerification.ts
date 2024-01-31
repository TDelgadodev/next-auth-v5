"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) return { error: "Token does not exist!" };

    const hasExpires = new Date(existingToken.expires) < new Date();

    if (hasExpires) return { error: "Token was expired!" };

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) return { error: "Email does not exist!" };

    await db.user.update({
        where : { id: existingUser.id },
        data : {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where : { id: existingToken.id }
    })

    return { sucess: "Email verified!" };
};