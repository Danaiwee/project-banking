import AuthForm from "@/components/forms/AuthForm"


const SignInPage = () => {
  return (
    <section className='size-full flex-center max-sm:px-6'>
      <AuthForm type="sign-in" />
    </section>
  )
}

export default SignInPage