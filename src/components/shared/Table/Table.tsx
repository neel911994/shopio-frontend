"use client";

import React from "react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  onRowClick?: (row: T, index: number) => void;
  activeRowKey?: string | number;
  emptyMessage?: string;
  isLoading?: boolean;
  className?: string;
}

export default function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  activeRowKey,
  emptyMessage = "No data available",
  isLoading = false,
  className = "",
}: TableProps<T>) {
  return (
    <div
      className={`w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${col.headerClassName || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-gray-500 dark:text-gray-400"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Loading...
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-gray-500 dark:text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const rowKey = keyExtractor(row, rowIndex);
              const isActive =
                activeRowKey !== undefined && activeRowKey === rowKey;
              return (
                <tr
                  key={rowKey}
                  onClick={() => onRowClick?.(row, rowIndex)}
                  className={`
                    bg-white dark:bg-gray-800 transition-colors
                    ${onRowClick ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50" : ""}
                    ${isActive ? "bg-purple-50 dark:bg-purple-900/10 ring-1 ring-purple-200 dark:ring-purple-800" : ""}
                  `}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-4 text-gray-700 dark:text-gray-300 ${col.className || ""}`}
                    >
                      {col.render
                        ? col.render(row, rowIndex)
                        : String(
                            (row as Record<string, unknown>)[col.key] ?? ""
                          )}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
