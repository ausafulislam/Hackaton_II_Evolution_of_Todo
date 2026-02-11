import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import nodemailer from "nodemailer";
import { db } from "@/db";
import { headers } from "next/headers";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    pages: {
        signIn: '/login',
    },

    user: {
        deleteUser: {
            enabled: true,
        },
    },
    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        emailOTP({
            overrideDefaultEmailVerification: true,
            sendVerificationOnSignUp: true,
            async sendVerificationOTP({ email, otp, type }) {
                try {
                    await transporter.sendMail({
                        from: `"Listify" <${process.env.SMTP_USER}>`,
                        to: email,
                        subject: `${type === 'email-verification' ? 'Verify your email' : 'Your OTP code'}`,
                        html: `
                            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                                <h2 style="color: #ea580c;">Listify Verification</h2>
                                <p>Your one-time password (OTP) is:</p>
                                <div style="background: #fff7ed; padding: 15px; border-radius: 8px; border: 1px solid #ffedd5; font-size: 24px; font-weight: bold; color: #ea580c; text-align: center; letter-spacing: 4px;">
                                    ${otp}
                                </div>
                                <p style="margin-top: 20px; font-size: 14px; color: #666;">This code will expire in 5 minutes.</p>
                            </div>
                        `,
                    });
                } catch (err) {
                    // Silently catch errors in background tasks
                }
            },
        }),
    ],
});

export const getSession = async () => auth.api.getSession({
    headers: await headers(),
});