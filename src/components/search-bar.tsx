"use client";

import { SearchIcon } from "lucide-react";
import * as React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted px-3 py-1.5">
      <input
        className="bg-transparent outline-none ring-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <SearchIcon className="h-4 w-4" />
    </div>
  );
};
