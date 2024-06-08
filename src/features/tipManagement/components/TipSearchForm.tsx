'use client';

import { SearchIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

export default function TipSearchForm() {
  const [name, setName] = useQueryState('name');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative w-full max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />

        <input
          type="text"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Search for tips"
        />
      </div>
    </form>
  );
}
