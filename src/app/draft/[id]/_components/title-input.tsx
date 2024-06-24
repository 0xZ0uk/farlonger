"use client";

import * as React from "react";

export const TitleInput: React.FC = () => {
  const [value, setValue] = React.useState("");

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <input
      type="text"
      className="w-full bg-transparent text-5xl font-bold outline-none ring-0"
      placeholder="Article Title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
