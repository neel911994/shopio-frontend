"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type FieldType = "text" | "number" | "toggle";

export interface EditField {
  key:        string;
  label:      string;
  type:       FieldType;
  initialValue: string | number | boolean;
  fullWidth?: boolean;
}

interface EditFormProps {
  fields:     EditField[];
  onSave:     (values: Record<string, string | number | boolean>) => Promise<void>;
  closeParam: string;
  saveLabel?: string;
}

export default function EditForm({
  fields,
  onSave,
  closeParam,
  saveLabel = "Save",
}: EditFormProps) {
  const [values, setValues] = useState<Record<string, string | number | boolean>>(
    Object.fromEntries(fields.map((f) => [f.key, f.initialValue]))
  );
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleClose() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(closeParam);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(values);
      router.refresh();
      handleClose();
    } finally {
      setSaving(false);
    }
  }

  function set(key: string, value: string | number | boolean) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-1 px-6 pb-2">
        {fields.map((field) => (
          <div
            key={field.key}
            className={`rounded-lg bg-gray-800 p-4 ${field.fullWidth || fields.length === 1 ? "col-span-2" : ""}`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              {field.label}
            </p>

            {field.type === "toggle" ? (
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => set(field.key, !values[field.key])}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    values[field.key] ? "bg-emerald-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      values[field.key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
                <span className={`text-sm font-semibold ${values[field.key] ? "text-emerald-400" : "text-gray-400"}`}>
                  {values[field.key] ? "Active" : "Inactive"}
                </span>
              </label>
            ) : (
              <input
                type={field.type}
                min={field.type === "number" ? 0 : undefined}
                value={values[field.key] as string | number}
                onChange={(e) =>
                  set(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)
                }
                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white focus:border-indigo-500 focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-gray-700 px-6 py-4 shrink-0">
        <button
          onClick={handleClose}
          className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          Close
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving…" : saveLabel}
        </button>
      </div>
    </>
  );
}
