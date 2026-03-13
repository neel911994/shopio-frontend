import LoginForm from "@/components/pageLogin/LoginForm/LoginForm";
import LoginHero from "@/components/pageLogin/LoginHero/LoginHero";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <div className="hidden lg:flex lg:w-1/2">
        <LoginHero />
      </div>
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}
