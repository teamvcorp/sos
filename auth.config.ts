import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AzureADProvider from "next-auth/providers/azure-ad";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import { NextAuthOptions } from "next-auth";  // Use NextAuthOptions type

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (typeof value === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
}

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
};

export default authOptions;
