"use server";

import * as z from "zod";
import { PresentSchema } from "@/schemas"; // Adjust the import path as necessary
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

// Server action to handle creating a new Present
export const CreatePresent = async (values: z.infer<typeof PresentSchema>) => {
  // Validate the incoming form data using the PresentSchema
  const validatedFields = PresentSchema.safeParse(values);

  // If validation fails, return an error message
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.format(), // This will return detailed field-level errors
    };
  }

  // Extract the validated fields
  const {
    name,
    imageId,
    retailer,
    retailerId,
    retailCost,
    wholesaleCost,
    onHand,
  } = validatedFields.data;


  try {
    // Get the current authenticated user (if necessary for the operation)
    const user = await currentUser();

    // Create a new present in the database with all the fields
    const present = await db.present.create({
      data: {
        name,
        imageId,
        retailer,
        retailerId,
        retailCost,
        wholesaleCost,
        onHand,
      },
    });

    // Return success message and the created present
    return { success: "Present created successfully", present };
  } catch (error) {
    // Log the error and return an error message
    console.error("Error creating present:", error);
    return { error: "Error creating present" };
  }
};
