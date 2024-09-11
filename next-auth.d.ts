import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";

// Extend the DefaultSession to include id and role
export type ExtendedUser = DefaultSession["user"] & { 
  id: string;          // Add the id field
  role: UserRole;      // Add the role field from your Prisma UserRole
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;  // The user in session will have id and role
  }

  interface User {
    id: string;         // Ensure id exists on User
    role: UserRole;     // Ensure role exists on User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;         // Add id to the JWT token
    role: UserRole;     // Add role to the JWT token
  }
}
