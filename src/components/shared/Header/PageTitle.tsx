"use client";

import { useNavigation } from "@/context/NavigationContext";

export default function PageTitle() {
  const { activeItem } = useNavigation();

  return (
    <span className="text-sm font-medium text-gray-300 sm:text-base sm:font-semibold sm:text-white">
      {activeItem?.label ?? ""}
    </span>
  );
}