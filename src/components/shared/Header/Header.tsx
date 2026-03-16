import { BellIcon } from "@/components/svg";
import { Avatar } from "@/components/shared";
import PageTitle from "./PageTitle";
import HeaderSearch from "./HeaderSearch";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName = "Admin" }: HeaderProps) {
  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between gap-4 border-b border-gray-800 bg-[#0f1117] px-4 sm:px-6">
      {/* Left — Logo + project name + page title */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 flex-shrink-0">
          <span className="text-base font-bold text-white">S</span>
        </div>
        <span className="hidden sm:block text-lg font-bold text-white tracking-wide">
          Shopio
        </span>
        <span className="hidden sm:block text-gray-600 select-none">|</span>
        <PageTitle />
      </div>

      {/* Right — Search, bell, avatar (desktop) / bell + hamburger (mobile) */}
      <div className="flex items-center gap-2 sm:gap-3">
        <HeaderSearch />

        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          aria-label="Notifications"
        >
          <BellIcon size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-400" />
        </button>

        {/* Avatar — desktop only */}
        <div className="hidden sm:block">
          <Avatar name={userName} size="sm" />
        </div>

        {/* Hamburger + drawer — mobile only */}
        <MobileMenu userName={userName} />
      </div>
    </header>
  );
}
