import PublicHeader from "../header";

export default function TipsLayou({
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
