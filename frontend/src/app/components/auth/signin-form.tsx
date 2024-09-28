"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "../icons";

import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/app/components/ui/use-toast";

const formSchema = z.object({
  username: z.string({ required_error: "Please enter your username" }),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof formSchema>;

interface Props {
  callbackUrl?: string;
}

export function SignInForm({ callbackUrl }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<InputType>({
    // validate inputs
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: InputType) {
    try {
      setIsLoading(true);

      const response = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      console.log(response);
      if (!response?.ok) {
        toast({
          title: "Something went wrong!",
          description: response?.error,
          variant: "destructive",
        });
        return;
      }

      if (response?.error == "CredentialsSignin") {
        toast({
          title: "Incorrect username or password. Please try again.",
          // description: response?.error,
          variant: "destructive",
        });
      }

      if (!response?.error) {
        toast({
          title: "Welcome back! ",
          description: "Redirecting you to your dashboard!",
        });
      }

      router.push(callbackUrl ? callbackUrl : "/");
    } catch (error) {
      console.log({ error });
      toast({
        title: "Something went wrong!",
        description: "We couldn't create your account. Please try again later!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Icons.email
                        className={`${
                          form.formState.errors.username
                            ? "text-destructive"
                            : "text-muted-foreground"
                        } `}
                      />
                      <Input
                        type="text"
                        placeholder="Your Username"
                        className={`${
                          form.formState.errors.username &&
                          "border-destructive bg-destructive/30"
                        }`}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Icons.key
                        className={`${
                          form.formState.errors.password
                            ? "text-destructive"
                            : "text-muted-foreground"
                        } `}
                      />
                      <Input
                        type="password"
                        placeholder="Your Password"
                        className={`${
                          form.formState.errors.password &&
                          "border-destructive bg-destructive/30"
                        }`}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="text-foreground mt-4 bg-teal-600 hover:bg-teal-300 text-slate-100 hover:text-sky-950" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
}
