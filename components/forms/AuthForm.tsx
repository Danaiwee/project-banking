"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ROUTES } from "@/constants/routes";
import { signIn, signUp } from "@/lib/actions/user.action";
import logger from "@/lib/logger";
import { authFormSchema } from "@/lib/validations";

import CustomInput from "./CustomInput";
import PlaidLink from "../plaid/PlaidLink";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };

        const newUser = await signUp(userData);
        if (!newUser) throw new Error("Error in sign up");

        setUser(newUser);
        toast("Success", {
          description: "Sign up successfully",
        });
      }

      if (type === "sign-in") {
        const { email, password } = data;

        const response = await signIn({ email, password });

        if (response) {
          toast("Success", {
            description: "Sign in successfully",
          });

          router.push(ROUTES.HOME);
        }
      }
    } catch (error) {
      toast("Error", {
        description: `An error occurred while ${type === "sign-in" ? "sign in" : "sign up"}`,
      });
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-[26px] leading-[30px] font-IBMPlexSerif font-bold text-black-1">
            Next
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] lg:text-[36px] font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "sign in" : "sign up"}
            <p className="text-[16px] font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Example: NY"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Example: 11101"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {type === "sign-in" ? "Signing in..." : "Signing up..."}
                    </>
                  ) : type === "sign-in" ? (
                    "Sign in"
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex items-center justify-center gap-1">
            {type === "sign-in" ? (
              <>
                <p className="text-sm font-bold text-gray-500">
                  Don&apos;t have an account?
                </p>
                <Link href="/sign-up" className="text-blue-500 font-bold">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-gray-500">
                  Already have an account?
                </p>
                <Link href="/sign-in" className="text-blue-500 font-bold">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default AuthForm;
