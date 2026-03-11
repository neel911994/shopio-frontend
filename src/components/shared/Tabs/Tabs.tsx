"use client";

import React from "react";

interface TabItem {
  label: string;
  value: string;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onChange: (value: string) => void;
  variant?: "underline" | "pill";
  className?: string;
}

export default function Tabs({
  items,
  activeTab,
  onChange,
  variant = "pill",
  className = "",
}: TabsProps) {
  if (variant === "underline") {
    return (
      <div
        className={`flex border-b border-gray-200 dark:border-gray-700 ${className}`}
      >
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`
              px-4 py-2.5 text-sm font-medium transition-colors relative
              ${
                activeTab === item.value
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }
            `}
          >
            <span className="flex items-center gap-2">
              {item.label}
              {item.count !== undefined && (
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </span>
            {activeTab === item.value && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-t" />
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1 ${className}`}
    >
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-colors
            ${
              activeTab === item.value
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }
          `}
        >
          <span className="flex items-center gap-2">
            {item.label}
            {item.count !== undefined && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === item.value
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {item.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
