import bcrypt from "bcryptjs";
import type  { NextAuthConfig }  from "next-auth";

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (typeof value === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
}

export default {
  providers: [
    Github({
      clientId: getEnvVar('GITHUB_CLIENT_ID'),
      clientSecret: getEnvVar('GITHUB_CLIENT_SECRET'),
    }),
    Google({
      clientId: getEnvVar('GOOGLE_CLIENT_ID'),
      clientSecret: getEnvVar('GOOGLE_CLIENT_SECRET'),
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
    
  ],
  

} satisfies NextAuthConfig;
