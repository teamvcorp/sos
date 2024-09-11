"use client";

import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LoginSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [showForm, setShowForm] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another provider"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        router.push("/dashboard");
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <div className="flex flex-col items-center">
        {/* Small button aligned to the left */}
        <Button
          onClick={() => setShowForm((prev) => !prev)}
          variant="link"
          className="self-center"
        >
          {showForm ? "Never Mind" : "Use Email"}
        </Button>

        {/* Conditional form rendering */}
        {showForm && (
          <Form {...form}>
            <form className="space-y-6 w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-santa-red">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@gmail.com"
                          type="email"
                          className="w-full bg-transparent text-neutral-700 border border-neutral-400 rounded-md placeholder-neutral-400 focus:border-santa-red focus:ring-0 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage className="text-mistletoe" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-santa-red">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="123456!"
                          type="password"
                          className="w-full bg-transparent text-neutral-700 border border-neutral-400 rounded-md placeholder-neutral-400 focus:border-santa-red focus:ring-0 focus:outline-none"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal text-mistletoe"
                      >
                        <Link href="/auth/reset">Forgot Password?</Link>
                      </Button>
                      <FormMessage className="text-mistletoe" />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error || urlError} className="text-red-500" />
              <FormSuccess message={success} className="text-green-500" />
              <Button
                type="submit"
                className="w-full bg-santa-red text-snow-white hover:bg-red-700 disabled:bg-red-300"
                disabled={isPending}
              >
                Login
              </Button>
            </form>
          </Form>
        )}
      </div>
    </CardWrapper>
  );
};
