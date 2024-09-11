import NextAuth from "next-auth";
// import authOptions from "./auth.config";  // Import auth options from config file
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { signIn as nextSignIn } from "next-auth/react"; // Import signIn from next-auth/react
import { signOut as nextSignOut } from "next-auth/react"; // Import signIn from next-auth/react
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AzureADProvider from "next-auth/providers/azure-ad";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import { NextAuthOptions } from "next-auth";  // Use NextAuthOptions type

function getEnvVar(key: string, defaultValue: string = ''): string {
  const value = process.env[key];
  if (typeof value === 'undefined') {
    console.error(`Warning: Environment variable ${key} is not set. Using default value: ${defaultValue}`);
    return defaultValue; // Return the default value or handle accordingly
  }
  return value;
}



// Custom authentication configuration
export const authOptions: NextAuthOptions = {
 
  providers: [
    GithubProvider({
      clientId: getEnvVar('GITHUB_CLIENT_ID'),
      clientSecret: getEnvVar('GITHUB_CLIENT_SECRET'),
    }),
    GoogleProvider({
      clientId: getEnvVar('GOOGLE_CLIENT_ID'),
      clientSecret: getEnvVar('GOOGLE_CLIENT_SECRET'),
    }),
    FacebookProvider({
      clientId: getEnvVar('FACEBOOK_CLIENT_ID'),
      clientSecret: getEnvVar('FACEBOOK_CLIENT_SECRET'),
    }),
    AzureADProvider({
      clientId: getEnvVar('MICROSOFT_CLIENT_ID'),
      clientSecret: getEnvVar('MICROSOFT_CLIENT_SECRET'),
      tenantId: getEnvVar('MICROSOFT_TENANT_ID'),
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john.doe@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "••••••••" },
      },
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
  secret: getEnvVar('NEXTAUTH_SECRET'),

  
  adapter: PrismaAdapter(db),

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;

      return true;
    },

    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.role) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (existingUser) {
        token.role = existingUser.role;
      }

      return token;
    },
  },
  session: { strategy: "jwt" },  // Use JWT strategy for session management
};

// Export NextAuth and the signIn function

export const signIn = nextSignIn;
export const signOut = nextSignOut;
export default authOptions;
