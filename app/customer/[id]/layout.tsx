import Sidenav from '@/components/Sidenav'
import Image from 'next/image';

export default function RootLayout({
    children, params
}: Readonly<{
    children: React.ReactNode,
    params: { id: string }
}>) {
    return (
        <div className='h-screen flex bg-zinc-950 text-white items-center'>
            <Sidenav params={params} />
            <div className='max-md:pt-4 flex flex-col items-center grow'>
                <div className="md:hidden mb-2 ml-12 flex gap-4 p-2 font-bold text-lg">
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
