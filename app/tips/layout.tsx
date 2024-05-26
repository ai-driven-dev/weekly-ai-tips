import PublicHeader from '../header';

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <>
      <PublicHeader />
      <div className="container">{children}</div>
    </>
  );
}
