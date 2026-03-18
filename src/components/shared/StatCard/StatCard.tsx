import React from "react";

interface StatCardProps {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
  subtitle?: string;
  trend?: {
    value: string | number;
    direction: "up" | "down" | "neutral";
  };
  alert?: string;
  className?: string;
}

const trendColors = {
  up: "text-emerald-500",
  down: "text-red-500",
  neutral: "text-gray-500",
};

const trendArrows = {
  up: "\u2197",
  down: "\u2198",
  neutral: "\u2192",
};

export default function StatCard({
  icon,
  value,
  label,
  subtitle,
  trend,
  alert,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`
        bg-gray-800 rounded-xl border border-gray-700 p-6
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className="p-2.5 rounded-lg bg-gray-700">
            {icon}
          </div>
        )}
        {trend && (
          <span
            className={`inline-flex items-center gap-1 text-sm font-medium ${trendColors[trend.direction]}`}
          >
            <span>{trendArrows[trend.direction]}</span>
            {trend.value}
          </span>
        )}
        {alert && (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-400 bg-red-900/20 rounded-md">
            {alert}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white">
        {value}
      </p>
      <p className="text-sm text-gray-300 mt-1">{label}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}