import React from "react";

interface ChevronLeftIconProps {
  className?: string;
  size?: number;
}

export default function ChevronLeftIcon({
  className = "",
  size = 20,
}: ChevronLeftIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
