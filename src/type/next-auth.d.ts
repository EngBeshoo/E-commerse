import { UserResponse } from './authInterface';
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        user: UserResponse;
        token: string;
    }

    interface Session {
        user: UserResponse & DefaultSession["user"];
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: UserResponse;
        token?: string;
        email?: string;
        name?: string;
    }
}