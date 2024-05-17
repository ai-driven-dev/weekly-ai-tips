import React from "react";
import PublicHeader from "./header";

export default async function Page(): Promise<React.ReactElement> {
  return (
    <>
      <PublicHeader />
      <main>
        <h1>Homepage</h1>
      </main>
    </>
  );
}
