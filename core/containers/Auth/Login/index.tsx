"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogIn, User, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Cookies from 'js-cookie'

// Shadcn UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Custom Hooks & Store
import { useAxiosPost } from "@/hooks/axios/useAxiosPostHook";
import { useAuth } from "@/store/useAuth";

// Zod Schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPageContainer = () => {
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { data, error, loading, postData } = useAxiosPost<{
    token: string;
    user: {
      id: string;
      email: string;
      role: "admin" | "user" | "trainer";
    };
  }>();
  console.log("first", data, error, loading);
  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setMessage("");
    setUserRole(null);
    await postData("http://localhost:3000/api/auth/login", values);
  };

  // Side-effect for login success or error
 useEffect(() => {
  if (data) {
    Cookies.set('token', data.token, { path: '/', secure: true, sameSite: 'strict' })
    useAuth.getState().login(data.user, data.token);
    setUserRole(data.user.role);
    setMessage(`Login successful! Redirecting to ${data.user.role} dashboard...`);
   
    // Push after 500ms to let message display
    setTimeout(() => {
      router.push(`/dashboard/${data?.user?.role}`);
    }, 500);
  }

  if (error) {
    setMessage(error);
  }
}, [data, error]);


  return (
    <div className="flex flex-col md:flex-row min-h-screen font-thin text-gray-800 dark:text-white">
      {/* Left Visual */}
      <div className="hidden md:flex flex-1 items-center justify-center p-8 relative">
        <div className="text-center space-y-8 lg:space-y-12">
          <h1 className="text-4xl md:text-5xl font-extralight text-green-600 dark:text-green-400">
            FORGE YOUR STRENGTH
          </h1>
          <h2 className="text-4xl lg:text-6xl font-thin tracking-wide text-gray-700 dark:text-gray-200">
            BREAK YOUR LIMITS
          </h2>
          <p className="text-lg font-extralight text-gray-600 dark:text-gray-500 max-w-sm mx-auto">
            TRANSFORM YOURSELF. DEFY EXPECTATIONS.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-sm rounded-2xl border-gray-300 dark:border-gray-800 bg-zinc-900/90">
          <CardHeader className="flex flex-col items-center p-6">
            <LogIn
              size={48}
              className="text-green-600 dark:text-green-500 mb-2"
            />
            <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-500">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 text-center font-thin">
              Enter your email and password below to log in.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-6 pt-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-600 dark:text-green-500">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <Input
                            placeholder="user@example.com"
                            {...field}
                            className="pl-10 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-green-600 dark:text-green-500">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            className="pl-10 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-thin flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>

            {/* Forgot Link */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <a
                href="#"
                className="font-medium text-green-600 hover:text-green-700 dark:hover:text-green-400"
              >
                Forgot your password?
              </a>
            </div>

            {/* Messages */}
            {message && (
              <div className="text-center text-sm font-thin">
                <p
                  className={
                    userRole
                      ? "text-green-600 dark:text-green-500"
                      : "text-red-500"
                  }
                >
                  {message}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPageContainer;
