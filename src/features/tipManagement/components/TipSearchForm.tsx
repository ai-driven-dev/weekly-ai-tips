'use client';

import { useQueryState } from 'nuqs';

export default function TipSearchForm() {
  const [name, setName] = useQueryState('name');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search for tips"
      />
      <button type="submit">Search</button>
    </form>
  );
}
