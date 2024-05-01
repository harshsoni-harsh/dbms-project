import { QueryProvider } from '@/components/QueryProvider';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    if(!session || !session.user) return redirect('/login');
    return <QueryProvider>{children}</QueryProvider>;
}
