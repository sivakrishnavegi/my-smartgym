"use client";

// Imports from React and other libraries
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sun, Moon, LogIn, User, Lock } from "lucide-react";

// Shadcn UI components
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
import { useAxiosPost } from "@/hooks/axios/useAxiosPostHook";

// --- ZOD SCHEMA AND TYPES ---
// Zod schema for form validation
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

// TypeScript type based on the Zod schema
type FormValues = z.infer<typeof formSchema>;

// --- RBAC LOGIN COMPONENT ---
const LoginPageContainer = () => {
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);

  // Initialize React Hook Form with Zod resolver
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

  // Function to handle the form submission
  const onSubmit = async (values: FormValues) => {
    setMessage("");
    setUserRole(null);

    await postData("http://localhost:3000/api/auth/login", values);

    if (error) {
      setMessage(error);
      return;
    }

    if (data) {
      localStorage.setItem("token", data.token);
      setUserRole(data.user.role);
      setMessage(
        `Login successful! Redirecting to ${data.user.role} dashboard...`
      );
      // Optionally: router.push(`/dashboard/${data.user.role}`)
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-thin text-gray-800 dark:text-white">
      {/* Left Half: Fitness Theme Text */}
      <div className="hidden md:flex flex-1 items-center justify-center p-8 relative">
        <div className="text-center space-y-8 lg:space-y-12">
          <h1 className="text-4xl md:text-5xl lg:text-4xl font-extralight text-green-600 dark:text-green-400">
            FORGE YOUR STRENGTH
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-thin leading-tight tracking-wide text-gray-700 dark:text-gray-200">
            BREAK YOUR LIMITS
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-extralight lowercase text-gray-600 dark:text-gray-500 max-w-sm mx-auto">
            TRANSFORM YOURSELF. DEFY EXPECTATIONS.
          </p>
        </div>
      </div>

      {/* Right Half: Login Form */}
      <div className="flex flex-1 items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-sm rounded-2xl border-gray-300 dark:border-gray-800 bg-zinc/90">
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
                {/* Email Input Field */}
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
                            className="pl-10 text-gray-800 dark:text-white placeholder:text-gray-400 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus-visible:ring-green-500 focus:border-green-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Input Field */}
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
                            placeholder="password"
                            {...field}
                            className="pl-10 text-gray-800 dark:text-white placeholder:text-gray-400 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus-visible:ring-green-500 focus:border-green-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-thin"
                >
                  Sign in
                </Button>
              </form>
            </Form>

            {/* Forgot Password Link */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <a
                href="#"
                className="font-medium text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400"
              >
                Forgot your password?
              </a>
            </div>

            {/* Message area */}
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
