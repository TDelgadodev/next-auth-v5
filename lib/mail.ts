import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    const ownerEmail = process.env.OWNER_EMAIL;

    if (!ownerEmail) {
        console.error("OWNER_EMAIL is undefined. Please set it in your environment variables.");
        return; 
    }

    console.log(ownerEmail);
    
    try {
        const sendEmail = await resend.emails.send({
            from: "delivered@resend.dev",
            to: [ownerEmail],
            subject: "Confirm your email",
            html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
        });

        console.log(sendEmail);

        console.log(`Verification email sent successfully to ${email}`);
    } catch (error) {
        console.error(`Error sending verification email to ${email}:`, error);
        throw error; 
    }
    
}