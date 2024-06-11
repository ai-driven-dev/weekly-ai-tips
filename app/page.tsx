import PublicHeader from './header';

export default async function Page(): Promise<React.ReactElement> {
  return (
    <>
      <PublicHeader />
      <main>v0 incoming</main>
    </>
  );
}
