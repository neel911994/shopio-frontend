"use client";

import React from "react";

export interface CardConfig<T> {
  title:     (row: T) => React.ReactNode;
  badge?:    (row: T) => React.ReactNode;
  subtitle?: (row: T) => React.ReactNode;
  meta?:     Array<{ label?: string; value: (row: T) => React.ReactNode }>;
  trailing?: (row: T) => React.ReactNode;
}

interface MobileCardListProps<T> {
  data:           T[];
  cardConfig:     CardConfig<T>;
  keyExtractor:   (row: T) => string | number;
  onCardClick?:   (row: T) => void;
  emptyMessage?:  string;
  className?:     string;
}

export default function MobileCardList<T>({
  data,
  cardConfig,
  keyExtractor,
  onCardClick,
  emptyMessage = "No data available",
  className = "",
}: MobileCardListProps<T>) {
  if (data.length === 0) {
    return (
      <div className={`rounded-lg border border-gray-700 px-4 py-12 text-center text-gray-400 ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`rounded-lg border border-l-0 border-r-0 border-gray-700 overflow-hidden ${className}`}>
      {data.map((row) => {
        const hasMeta     = cardConfig.meta && cardConfig.meta.length > 0;
        const hasTrailing = !!cardConfig.trailing;
        const hasBottom   = hasMeta || hasTrailing;

        return (
          <div
            key={keyExtractor(row)}
            onClick={() => onCardClick?.(row)}
            className={`border-bottom border-b-2 border-gray-700 last:border-b-0 px-0 py-3 bg-gray-800 flex flex-col gap-1.5 transition-colors ${
              onCardClick ? "cursor-pointer active:bg-gray-700/50" : ""
            }`}
          >
            {/* Row 1: title + badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 truncate">{cardConfig.title(row)}</div>
              {cardConfig.badge && (
                <div className="shrink-0">{cardConfig.badge(row)}</div>
              )}
            </div>

            {/* Row 2: subtitle */}
            {cardConfig.subtitle && (
              <div className="text-sm text-gray-400 truncate">
                {cardConfig.subtitle(row)}
              </div>
            )}

            {/* Row 3: meta + trailing */}
            {hasBottom && (
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {cardConfig.meta?.map((item, i) => (
                    <span key={i} className="text-xs text-gray-400">
                      {item.label && (
                        <span className="text-gray-500 mr-1">{item.label}</span>
                      )}
                      {item.value(row)}
                    </span>
                  ))}
                </div>
                {cardConfig.trailing && (
                  <div className="shrink-0">{cardConfig.trailing(row)}</div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
