import Image from "next/image";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  
  return (
    <>
      <div className="shrink-0 w-64 max-md:hidden max-h-96"></div>
      <div className="max-md:pt-4 w-full max-h-screen flex flex-col overflow-auto">
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