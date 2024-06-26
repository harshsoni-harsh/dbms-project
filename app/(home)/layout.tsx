import { QueryProvider } from '@/components/QueryProvider';
import Image from 'next/image';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode,
}>) {

  return (
    <>
      <div className='shrink-0 w-64 max-md:hidden'></div>
      <div className='max-md:pt-4 w-full'>
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
        <QueryProvider>
          {children}
        </QueryProvider>
      </div>
    </>
  );
}
