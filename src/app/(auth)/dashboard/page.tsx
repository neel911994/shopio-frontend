"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <p className="text-gray-600">Welcome to Shopio Dashboard!</p>
    </div>
  );
}
