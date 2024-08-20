import Newsletter from '@/src/features/newsletter/components/Newsletter';
import PublicHeader from './header';

export default async function Page(): Promise<React.ReactElement> {
  return (
    <>
      <PublicHeader />
      <main>
        <Newsletter />
      </main>
    </>
  );
}
