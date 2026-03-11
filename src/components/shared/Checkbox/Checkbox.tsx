"use client";

import React from "react";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

export default function Checkbox({
  label,
  description,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <input
        id={checkboxId}
        type="checkbox"
        className="
          mt-0.5 h-4 w-4 rounded border-gray-300 dark:border-gray-600
          text-purple-600 focus:ring-purple-500 focus:ring-2
          bg-white dark:bg-gray-900 cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        {...props}
      />
      {(label || description) && (
        <div>
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
