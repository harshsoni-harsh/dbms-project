import Sidenav from "@/components/Sidenav";
import Image from "next/image";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  return (
    <div className="min-h-screen flex">
      <Sidenav linksList={[]} params={params} />
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
    </div>
  );
}
