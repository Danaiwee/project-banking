import { Metadata } from "next";

import AuthForm from "@/components/forms/AuthForm";

export const metadata: Metadata = {
  title: "Next Bank | Sign in",
  description:
    "Sign in to your Next Banking account to securely access your balances, manage transactions, and stay on top of your financial activity in one place",
};

const SignInPage = async () => {
  return (
    <section className="size-full flex-center max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
};

export default SignInPage;
