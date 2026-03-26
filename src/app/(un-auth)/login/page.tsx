import LoginForm from "@/components/pageLogin/LoginForm/LoginForm";
import LoginHero from "@/components/pageLogin/LoginHero/LoginHero";
import { ShopioLogoIcon } from "@/components/svg";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <div className="hidden lg:flex lg:w-1/2">
        <LoginHero />
      </div>
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="flex items-center gap-2 mb-6 lg:hidden">
          <ShopioLogoIcon size={40} />
          <span className="text-2xl font-bold text-[#1db5bf]">Shopio</span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
