import React from "react";

interface AvatarProps {
  name?: string;
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeStyles = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const colors = [
  "bg-purple-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-teal-500",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function Avatar({
  name,
  src,
  alt,
  size = "md",
  className = "",
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || "Avatar"}
        className={`${sizeStyles[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  const initials = name ? getInitials(name) : "?";
  const bgColor = name ? getColorFromName(name) : "bg-gray-400";

  return (
    <div
      className={`
        ${sizeStyles[size]} ${bgColor} rounded-full
        inline-flex items-center justify-center
        font-semibold text-white select-none
        ${className}
      `}
      title={name}
    >
      {initials}
    </div>
  );
}
