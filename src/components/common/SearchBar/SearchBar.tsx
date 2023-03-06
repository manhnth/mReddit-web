import { Reddit } from '@/components/icons';
import { Search } from '@/components/icons/Search';
import React from 'react';

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = ({}) => {
  return (
    <form className="flex items-center max-w-xl">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search />
        </div>
        <input
          type="text"
          className="bg-accent-8 border border-accent-7 text-accent-1 text-sm rounded-lg block w-full pl-10 p-2.5 focus:border-secondary outline-secondary"
          placeholder="Search"
          required
        />
      </div>
    </form>
  );
};
