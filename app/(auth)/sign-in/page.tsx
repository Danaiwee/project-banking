import AuthForm from "@/components/forms/AuthForm";
import { getLoggedInUser } from "@/lib/actions/user.action";

const SignInPage = async () => {
  const user = await getLoggedInUser();
  console.log(user);
  return (
    <section className="size-full flex-center max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
};

export default SignInPage;
