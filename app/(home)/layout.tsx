import Sidenav from '@/components/Sidenav'
import Image from 'next/image';
import {
  Home,
  FileText,
  Cookie,
  UserPlus,
  LogIn,
  MessageCircleQuestion,
} from "lucide-react";
import {v4 as uuid} from "uuid"

export default function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode,
  params: { id: string }
}>) {
  const linksList = [
    {
      link: "/",
      id: uuid(),
      displayText: "Home",
      icon: <Home className="h-4" />,
    },
    {
      link: "/login",
      id: uuid(),
      displayText: "Login",
      icon: <LogIn className="h-4" />,
    },
    {
      link: "/register",
      id: uuid(),
      displayText: "Register",
      icon: <UserPlus className="h-4" />,
    },
    {
      link: "/about",
      id: uuid(),
      displayText: "About",
      icon: <FileText className="h-4" />,
    },
    {
      link: "/privacy",
      id: uuid(),
      displayText: "Privacy Policy",
      icon: <Cookie className="h-4" />,
    },
    {
      link: "/support",
      id: uuid(),
      displayText: "Support",
      icon: <MessageCircleQuestion className="h-4" />,
    },
  ];
  return (
    <div className='min-h-screen flex'>
      <Sidenav linksList={linksList} params={params} />
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
        {children}
      </div>
    </div>
  );
}
