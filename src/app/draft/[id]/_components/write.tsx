"use client";

import * as React from "react";

export const Write: React.FC = () => {
  const [value, setValue] = React.useState("");

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div>
      <input
        type="text"
        className="w-full bg-transparent text-6xl font-bold outline-none ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Article Title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
