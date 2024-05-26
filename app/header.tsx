import Link from 'next/link';

export default function PublicHeader() {
  return (
    <header>
      <nav className="container py-2">
        <ul className="flex gap-3">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/tips">Tips</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
