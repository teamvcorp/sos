"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { ObjectId } from "mongodb"; // Import MongoDB ObjectId

// Define a schema for the input to validate the `presentsId` as an array of ObjectId strings
const PresentIdSchema = z.object({
  presentsId: z.array(z.string(), {
    message: "Invalid ObjectId",
  }), // Array of ObjectId strings
  userId: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid User ID",
  }), // The ID of the user to update
});

// Server action to update only the presentsId field in the user model
export const UpdateUserPresentsId = async (values: z.infer<typeof PresentIdSchema>) => {
  // Validate the incoming form data
  const validatedFields = PresentIdSchema.safeParse(values);

  // If validation fails, return an error message
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  // Extract the validated fields
  const { presentsId, userId } = validatedFields.data;

  try {
    // Get the current authenticated user (optional, depending on your app logic)
    const user = await currentUser();
    if (!user) {
      return { error: "User not authenticated" };
    }



    // Update the `presentsId` field in the database for the specified user
    const updatedUser = await db.user.update({
      where: { id: userId }, // Update the user with the matching ID
      data: { presentsId }, // Only update the presentsId field with ObjectId array
    });

    // Return success message and the updated user
    return { success: "presentsId updated successfully", updatedUser };
  } catch (error) {
    // Log the error and return an error message
    console.error("Error updating presentsId:", error);
    return { error: "Error updating presentsId" };
  }
};
