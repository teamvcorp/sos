"use client";

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
} from "../../../components/ui/form";
import { PresentSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { useState, useTransition } from "react";
import { CreatePresent } from "@/actions/presentCreate";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

export const PresentForm = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const router = useRouter();

  const form = useForm<z.infer<typeof PresentSchema>>({
    resolver: zodResolver(PresentSchema),
    defaultValues: {
      name: "",
      imageId: "",
      retailer: "",
      retailerId: "",
      retailCost: 0,
      wholesaleCost: 0,
      onHand: 0, // Adding onHand field
    },
  });

  const onSubmit = (values: z.infer<typeof PresentSchema>) => {
    startTransition(() => {
      CreatePresent(values).then((data) => {
        setError(data.error);
        if (data.success) {
          setSuccess(data.success);
          form.reset();
          router.push("/dashboard"); // Redirect to a relevant page after submission
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
                      placeholder="Toy Train"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="https://example.com/image.jpg"
                    />
                  </FormControl>
                  <FormMessage />
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
                      placeholder="Toy Store"
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
                      placeholder="TS1234"
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
                      placeholder="50.00"
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
                      placeholder="30.00"
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
                      placeholder="100"
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
          <Button type="submit" className="w-full" disabled={isPending}>
            Add Present
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
