"use client";

import { useState } from "react";
import { Input } from "@/components/shared";
import { SearchIcon } from "@/components/svg";

export default function HeaderSearch() {
  const [search, setSearch] = useState("");

  return (
    <div className="hidden sm:block w-52">
      <Input
        placeholder="Search..."
        inputSize="sm"
        leftIcon={<SearchIcon size={16} />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}