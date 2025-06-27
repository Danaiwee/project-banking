import AuthForm from "@/components/forms/AuthForm";

const SignUpPage = async () => {
  return (
    <section className="size-full flex-center max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default SignUpPage;
