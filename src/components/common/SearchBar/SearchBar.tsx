import { Search } from '@/components/icons/Search';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = ({}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(() => e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex items-center max-w-xl"
    >
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search />
        </div>
        <input
          name="search"
          type="text"
          className="bg-accent-8 border border-accent-7 text-accent-1 text-sm rounded-lg block w-full pl-10 p-2.5 focus:border-secondary outline-secondary"
          placeholder="Search"
          onChange={(e) => handleOnChange(e)}
          required
        />
      </div>
    </form>
  );
};
