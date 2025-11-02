"use client";

import { TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import styles from "./search-bar.module.scss";

interface Props {
  searchQuery: string;
  setSearchQuery: ((value: string) => void) | React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  placeholder?: string;
  debounceMs?: number;
}

const SearchBar: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  className,
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
    <div className={`${styles.searchBarWrapper} ${className || ''}`}>
      <TextField.Root
        placeholder={placeholder}
        size="2"
        value={localValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalValue(e.target.value)}
        aria-label="Search challenges"
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
