import { Metadata } from "next";

import AuthForm from "@/components/forms/AuthForm";

export const metadata: Metadata = {
  title: "Next Bank | Sign up",
  description:
    "Create your Next Banking account to take control of your finances. Track spending, manage accounts, and enjoy a seamless digital banking experience.",
};

const SignUpPage = async () => {
  return (
    <section className="size-full flex-center max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default SignUpPage;
