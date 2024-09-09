import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    return null;
  }
};
// export const findPresentsByIds = async (presentsId: string[]) => {
//   try {
//     // Use findMany to retrieve presents by their IDs
//     const presents = await db.present.findMany({
//       where: {
//         id: {
//           in: presentsId, // Filter by the array of presentsId
//         },
//       },
//       select: {
//         id: true,
//         name: true,
//         imageId: true,
//         retailer: true,
//         retailerId: true,
//         retailCost: true,
//         wholesaleCost: true,
//         onHand: true,
//       },
//     });
    
//     console.log('Fetched presents:', presents);
//     return presents; // Return the array of present objects
//   } catch (error) {
//     console.error("Error fetching presents:", error);
//     return [];
//   }
// };

  

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
        presentsId: true,
        emailVerified: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
