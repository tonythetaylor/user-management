import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import { compare } from "bcrypt";
import { login } from "./actions/auth-actions";
import { redirect } from "next/navigation";

interface User {
    username: string;
    password: string;
    email: string;
    status: number;
    fullName: string
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/signin',
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    if (!user) return null;

                    const { status } = user as User
                    if (status === 401) {
                        return null
                    }
                    if (user) {
                        return user;
                    } else {
                        return null
                    }

                } catch (e: any) {
                    return e;
                }
                // console.log('CREDENTIALS : ', credentials)
                // const {username} = credentials
                // if (!credentials?.username || !credentials.password) {
                //     return null;
                // }

                // const user = await prisma.user.findUnique({
                //     where: {username: username as any},
                // });
                // console.log(user)
                // if (!user || !(await compare(credentials.password, user.password))) {
                //     return null;
                // }

                // console.log("credentials", credentials);
                // return {
                //     id: user?.id,
                //     username: user?.username,
                //     randomKey: process.env.NEXTAUTH_SECRET
                // };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            // pass in extra data to token
            if (user) {
                return {
                    ...token,
                    userId: user?.data?.id,
                    fullname: user?.data?.fullName,
                    username: user?.data?.username,
                    email: user?.data?.email
                }
            }
            return token;
        },
        async session({ token, session, user }: any) {
            // add mutated token to users session
               return {
                ...session,
                user: {
                    ...session.user,
                    token
                },
            }; 
        },
    },
    secret: process.env.NEXTAUTH_SECRET
});