import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-100 h-full py-8 px-16">
      <ul className="flex flex-col gap-5">
        <li className="inline">
          {pathname === '/dashboard' ? (
            <strong>Dashboard</strong>
          ) : (
            <Link href="/dashboard">Dashboard</Link>
          )}
        </li>
        <li className="inline">
          {pathname === '/dashboard/users' ? (
            <strong>Users</strong>
          ) : (
            <Link href="/dashboard/users">Users</Link>
          )}
        </li>
        <li className="inline">
          {pathname === '/dashboard/tags' ? (
            <strong>Tags</strong>
          ) : (
            <Link href="/dashboard/tags">Tags</Link>
          )}
        </li>
        <li className="inline">
          {pathname === '/dashboard/tips' ? (
            <strong>Tips</strong>
          ) : (
            <Link href="/dashboard/tips">Tips</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
