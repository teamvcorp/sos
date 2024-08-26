import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        magicPoints: true, // Ensure this attribute is fetched
        emailVerified: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
