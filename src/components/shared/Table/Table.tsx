import React from "react";

export type ColumnType = "text" | "highlight" | "badge" | "currency";

export interface Column<T> {
  key: string;
  header: string;
  type?: ColumnType;
  badgeStyles?: Record<string, string>;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField?: string;
  keyExtractor?: (row: T, index: number) => string | number;
  activeRowKey?: string | number;
  emptyMessage?: string;
  isLoading?: boolean;
  className?: string;
}

function renderCell<T>(col: Column<T>, row: T): React.ReactNode {
  const raw = (row as Record<string, unknown>)[col.key];
  const value = raw ?? "";

  if (col.render) return col.render(row, 0);

  switch (col.type) {
    case "highlight":
      return <span className="font-medium text-white">{String(value)}</span>;

    case "badge": {
      const str = String(value);
      const style = col.badgeStyles?.[str] ?? "bg-gray-500/15 text-gray-400";
      const label = str.charAt(0) + str.slice(1).toLowerCase();
      return (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${style}`}>
          {label}
        </span>
      );
    }

    case "currency": {
      const num = typeof value === "number" ? value : Number(value);
      return (
        <span className="font-semibold text-white">
          ₹{Math.round(num).toLocaleString("en-IN")}
        </span>
      );
    }

    default:
      return <span className="text-gray-300">{String(value)}</span>;
  }
}

export default function Table<T>({
  columns,
  data,
  keyExtractor,
  activeRowKey,
  emptyMessage = "No data available",
  isLoading = false,
  className = "",
  keyField,
}: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto rounded-lg border border-gray-700 ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 bg-gray-700/40">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 ${col.headerClassName || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-400">
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading...
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const rowKey = keyExtractor
                ? keyExtractor(row, rowIndex)
                : String((row as Record<string, unknown>)[keyField ?? "id"] ?? rowIndex);
              const isActive = activeRowKey !== undefined && activeRowKey === rowKey;
              return (
                <tr
                  key={rowKey}
                  className={`bg-gray-800 transition-colors ${isActive ? "bg-purple-900/10 ring-1 ring-purple-800" : ""}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-4 ${col.className || ""}`}>
                      {renderCell(col, row)}
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
