"use client";

import { TextField } from '@radix-ui/themes';
import React from 'react';

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  className,
  style,
  placeholder = 'Search challenges by name, tag, or difficulty',
}) => {
  return (
    <div
      className={className}
      style={{ width: '100%', marginTop: 20, display: 'flex', justifyContent: 'flex-end', ...style }}
    >
      <TextField.Root
        placeholder={placeholder}
        size="2"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        aria-label="Search challenges"
        style={{ width: 400, marginRight: "5%" }}
      />
    </div>
  );
};

export default SearchBar;