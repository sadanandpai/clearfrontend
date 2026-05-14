"use client";

import { TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: ((value: string) => void) | React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  debounceMs?: number;
}

const SearchBar: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  className,
  style,
  placeholder = "Search challenges by name, tag, or difficulty",
  debounceMs = 300,
}) => {
  const [localValue, setLocalValue] = useState(searchQuery);

  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (localValue === searchQuery) return;
      setSearchQuery(localValue);
    }, debounceMs);

    return () => clearTimeout(handle);
  }, [localValue, debounceMs, searchQuery, setSearchQuery]);

  return (
    <div className={`w-full min-w-0 ${className ?? ""}`.trim()} style={style}>
      <TextField.Root
        placeholder={placeholder}
        size="2"
        value={localValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalValue(e.target.value)}
        aria-label="Search challenges"
        className="w-full"
      />
    </div>
  );
};

export default SearchBar;
