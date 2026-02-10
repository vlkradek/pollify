import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async jwt({ token, user, account }) {
            // Runs on sign-in
            if (account && user) {
                token.id = user.id;

                // 👇 THIS IS THE IMPORTANT PART
                token.isNewUser = account.isNewUser ?? false;
            }

            return token;
        },

        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                    // 👇 expose to client
                    isNewUser: token.isNewUser as boolean,
                },
            };
        },
    },
} satisfies NextAuthConfig;
