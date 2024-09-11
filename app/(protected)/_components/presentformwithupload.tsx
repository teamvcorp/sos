"use client";
import axios from "axios";
import React, { useRef, useState, useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { CreatePresent } from "@/actions/presentCreate";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
// Schema for the form validation
import { PresentSchema } from "@/schemas";

export const PresentFormWithUpload = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [imageError, setImageError] = useState<string | undefined>("");
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [imageId, setImageId] = useState<string>("/api/uploads/");

  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof PresentSchema>>({
    resolver: zodResolver(PresentSchema),
    defaultValues: {
      name: "",
      imageId: "/api/uploads/", // Optional, with default value
      retailer: "",
      retailerId: "",
      retailCost: 0,
      wholesaleCost: 0,
      onHand: 0,
    },
  });

  // Handle image upload
  const handleImageUpload = async () => {
    try {
      const input = imageRef.current!;
      const formData = new FormData();
      for (const file of Array.from(input.files ?? [])) {
        formData.append("file", file);
      }

      const imageUploadResponse = await axios.post("/api/upload", formData);
      if (imageUploadResponse.status !== 200) {
        setImageError("Failed to upload image.");
        return;
      }

      const uploadedImageId = imageUploadResponse.data.imageUrl; // Get the uploaded image URL
      setImageId(uploadedImageId); // Set imageId to state
      setImageUploaded(true); // Mark image as uploaded
      setImageError(undefined); // Clear any previous image error
    } catch (err) {
      setImageError("Error uploading image.");
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof PresentSchema>) => {
    // Ensure the image has been uploaded before submission
    if (!imageUploaded) {
      setImageError("Please upload an image before submitting.");
      return;
    }

    // Add the imageId to form values before submitting

    startTransition(() => {
      CreatePresent(values).then((data) => {
        if (!data.success) {
          if (typeof data.error === "object") {
            // Console log detailed field-specific errors
            console.log("Field-specific errors:", data.error);
            console.log(imageId);
            // Optional: Format and log the errors in a more readable way
            const formattedErrors = Object.entries(data.error).map(
              ([field, errorObject]: [string, any]) => {
                return `${field}: ${errorObject?._errors?.join(", ")}`;
              }
            );
            console.log("Formatted errors:", formattedErrors.join("; "));
          } else {
            console.log("Error:", data.error); // Log string error
          }
        } else {
          console.log("Form submission success:", data.success);
          setSuccess(data.success);
          form.reset();
          router.push("/dashboard");
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Add a New Present"
      backButtonLabel="Back to Dashboard"
      backButtonHref="/dashboard"
      showSocial={false} // Adjust if social buttons are needed
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Present Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <input type="file" ref={imageRef} />
              </FormControl>
              <Button
                type="button"
                onClick={handleImageUpload}
                disabled={imageUploaded}
              >
                {imageUploaded ? "Image Uploaded" : "Upload Image"}
              </Button>
              {imageError && <p className="text-red-500">{imageError}</p>}
              {imageUploaded && (
                <p className="text-green-500">Upload Completed!</p>
              )}
            </FormItem>
            {/* Hidden FormField for imageId */}
            <FormField
              control={form.control}
              name="imageId"
              render={({ field }) => (
                <FormItem>
                  <Input {...field} type="hidden" value={imageId || ""} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="retailer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retailer</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Retailer Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="retailerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retailer ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Retailer ID"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="retailCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retail Cost</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Retail Cost"
                      type="number"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wholesaleCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wholesale Cost</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Wholesale Cost"
                      type="number"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="onHand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>On Hand Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Quantity"
                      type="number"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !imageUploaded}
          >
            Add Present
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
