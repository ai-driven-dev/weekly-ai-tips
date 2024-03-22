import Link from "next/link";
import React from "react";

export default async function Page(): Promise<React.ReactElement> {
  return (
    <main>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
