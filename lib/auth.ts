import { getServerSession } from "next-auth/next"; // Ensure you're importing from next-auth/next for server components
import { authOptions } from "@/auth"; // Adjust this path based on where your authOptions are defined

// Fetch the current user session
export const currentUser = async () => {
  const session = await getServerSession(authOptions);

  return session?.user || null; // Return null if no session is found
};

// Fetch the current user role
export const currentUserRole = async () => {
  const session = await getServerSession(authOptions);

  return session?.user?.role || null; // Return null if no role is found
};
