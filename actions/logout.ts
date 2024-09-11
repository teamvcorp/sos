import { getServerSession } from "next-auth";
import { authOptions } from "@/auth"; // Import authOptions based on your setup
import { signOut } from "next-auth/react"; // Client-side signOut

// Server-side logout action
export const logout = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    // Do any server-side logout actions here, like clearing cookies, tokens, etc.
    return signOut(); // For client-side logout handling
  }
  return null;
};
