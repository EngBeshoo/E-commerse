import Credentials from 'next-auth/providers/credentials';
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const req = await fetch(`${process.env.API}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                    
                });
                console.log("===== AUTHORIZE CHECK =====");


                const payload = await req.json();
                console.log("API Response:", payload);

                if (payload.message === 'success' && payload.token) {
                    return {
                        id: payload.user?.email || '1',
                        email: payload.user?.email || credentials?.email,
                        name: payload.user?.name || 'User',
                        user: payload.user,
                        token: payload.token
                    };
                }

                return null;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user;
                token.token = user.token;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // ✅ خليها كائن كامل، مش نص
                session.user = token.user;
                session.accessToken = token.token;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};