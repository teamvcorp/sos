"use server";

import * as z from "zod";
import { PresentSchema } from "@/schemas"; // Adjust the import path as necessary
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const CreatePresent = async (values: z.infer<typeof PresentSchema>) => {
  const validatedFields = PresentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  
  const { name, retailer, retailerId, retailCost, wholesaleCost, quantityWanted, userId } = validatedFields.data;

  try {
    const user = await currentUser();
    
    const present = await db.present.create({
      data: {
        name,
        retailer,
        retailerId,
        retailCost,
        wholesaleCost,
        quantityWanted,
        userId: user?.id
      },
    });

    return { success: "Present created successfully", present };
  } catch (error) {
    console.error("Error creating present:", error);
    return { error: "Error creating present" };
  }
};
