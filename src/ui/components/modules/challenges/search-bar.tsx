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
      setSearchQuery(localValue);
    }, debounceMs);

    return () => clearTimeout(handle);
  }, [localValue, debounceMs, setSearchQuery]);

  return (
    <div
      className={`w-full flex justify-end mt-4 md:mt-8 ${className}`}
      style={style}
    >
      <TextField.Root
        placeholder={placeholder}
        size="2"
        value={localValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalValue(e.target.value)}
        aria-label="Search challenges"
        className="w-full mr-0 md:w-[40rem] md:mr-[5%]"
      />
    </div>
  );
};

export default SearchBar;
