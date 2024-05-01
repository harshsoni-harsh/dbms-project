import { getServerSession } from 'next-auth';
import Image from "next/image";
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if(!session || !session.user) redirect('/login');
  // @ts-expect-error wonky code
  session.user = JSON.parse(session.user.name);
  if(session!.user!.role !== 'dbadmin') redirect(`/${session!.user!.role}`);
  return (
    <>
      <div className="shrink-0 w-64 max-md:hidden"></div>
      <div className="max-md:pt-4 w-full overflow-auto">
        <div className="md:hidden mb-2 ml-12 flex gap-4 items-center font-bold text-lg">
          <Image
            src="/images/company-logo.png"
            width="40"
            height="40"
            alt="logo"
            className="invert"
          />
          <p>Motor Insurance</p>
        </div>
        {children}
      </div>
    </>
  );
}
