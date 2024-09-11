import NextAuth from "next-auth";
import { authOptions } from "@/auth"; // Import your auth configuration

// Export NextAuth as handlers for both GET and POST requests
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
