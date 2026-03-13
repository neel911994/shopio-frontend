import Image from "next/image";
import { CheckIcon } from "@/components/svg";

const stats = [
  { label: "Active deals", value: "1,200+" },
  { label: "Trusted users", value: "250k" },
  { label: "Avg. rating", value: "4.8\u2605" },
];

export default function LoginHero() {
  return (
    <div className="flex flex-col justify-between h-full px-10 py-10 lg:px-16 lg:py-12">
      <div className="flex items-center gap-3">
        <Image
          src="/images/logo.png"
          alt="Shopio logo"
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>

      <div>
        <div className="mb-6 flex items-center gap-2">
          <CheckIcon size={16} className="text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">
            Seamless shopping starts here
          </span>
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight text-white lg:text-5xl">
          Welcome back to your favorite marketplace.
        </h1>

        <p className="max-w-md text-base text-gray-400 leading-relaxed">
          Track orders, manage wishlists, and enjoy quick checkout with your
          saved addresses and cards. All in one elegant, secure experience.
        </p>

        <div className="mt-10 flex gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-r border-gray-700 pr-6 last:border-0 last:pr-0"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Secure by design · Encrypted authentication · Privacy-first
      </p>
    </div>
  );
}
