import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

const CustomLink = ({
  href,
  children,
  prefetch = false,
}: {
  href: string;
  children: React.ReactNode;
  prefetch?: boolean;
}) => {
  const headersList = headers();
  const pathname = headersList.get('x-path') || '';

  if (pathname === href) {
    return (
      <span className="text-sm text-gray-700 font-bold border-b border-b-1 dark:text-gray-400">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
    >
      {children}
    </Link>
  );
};

export default function PublicHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm dark:bg-gray-900">
      <div className="container flex justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image
            src={'/images/logo.png'}
            alt={'AIDDC'}
            width="32"
            height="32"
          />
          <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
            AI-Driven-Dev
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <CustomLink href="/dashboard">Dashboard</CustomLink>
          <CustomLink href="/tips" prefetch={true}>
            Weekly AI Tips
          </CustomLink>
        </nav>
      </div>
    </header>
  );
}
