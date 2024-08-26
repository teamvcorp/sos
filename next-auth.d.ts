import NextAuth, {type DefaultSession} from "next-auth";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";





export type ExtendedUser = DefaultSession["user"] & { 
  role: UserRole;
  
}

declare module "next-auth"{
  interface Session {
    user: ExtendedUser;
  }
}

// declare module "next-auth" {
//   interface User {
//     role?: string;
//   }

//   interface Session {
//     user: {
//       id: string;
//       role?: string;
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//   }
// }
