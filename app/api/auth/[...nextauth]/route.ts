import { authConfig } from "@/app/dashboard/auth";
import NextAuth from "next-auth/next";

let authOptions = NextAuth(authConfig);

export {authOptions as GET, authOptions as POST};