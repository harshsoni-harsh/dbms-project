"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LogOut,
  ChevronRight,
  UserRound,
  Menu,
  Home,
  Cookie,
  FileText,
  LogIn,
  MessageCircleQuestion,
  UserPlus,
  BookOpenText,
  BookText,
  CirclePlus,
  IndianRupee,
  NotebookPen,
  Users,
  NotebookTabs,
  BookType,
  PersonStanding,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { v4 as uuid } from "uuid";

type LinksList = {
  link: string;
  id: string;
  displayText: string;
  icon: React.JSX.Element;
}[];

const homeLinksList: LinksList = [
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

const customerLinksList: LinksList = [
  {
    link: "/customer",
    id: uuid(),
    displayText: "Home",
    icon: <Home className="h-4" />,
  },
  {
    link: "/customer/policy/new",
    id: uuid(),
    displayText: "New Policy",
    icon: <CirclePlus className="h-4" />,
  },
  {
    link: "/customer/policy/all",
    id: uuid(),
    displayText: "View Policies",
    icon: <BookText className="h-4" />,
  },
  {
    link: "/customer/claims",
    id: uuid(),
    displayText: "Claims",
    icon: <FileText className="h-4" />,
  },
  {
    link: "/customer/pay-premium",
    id: uuid(),
    displayText: "Pay Premium",
    icon: <IndianRupee className="h-4" />,
  },
  {
    link: "/customer/view-receipts",
    id: uuid(),
    displayText: "View Receipts",
    icon: <BookOpenText className="h-4" />,
  },
];

const damageInspectorLinksList: LinksList = [
  {
    link: "/damage-inspector",
    id: uuid(),
    displayText: "Home",
    icon: <Home className="h-4" />,
  },
];

const dbAdminLinksList: LinksList = [
  {
    link: "/db-admin",
    id: uuid(),
    displayText: "Home",
    icon: <Home className="h-4" />,
  },
];

const managerLinksList: LinksList = [
  {
    link: '/manager',
    id: uuid(),
    displayText: 'Index',
    icon: <Home className="h-4" />,
  },
  {
    link: '/manager/claims',
    id: uuid(),
    displayText: 'All claims',
    icon: <BookText className="h-4" />,
  },
  {
    link: '/manager/claims/pending',
    id: uuid(),
    displayText: 'Review pending claims',
    icon: <NotebookPen className="h-4" />,
  },
  {
    link: '/manager/customers',
    id: uuid(),
    displayText: 'All customers',
    icon: <Users className="h-4" />,
  },
  {
    link: '/manager/policies',
    id: uuid(),
    displayText: 'All policies',
    icon: <NotebookTabs className="h-4" />,
  },
  {
    link: '/manager/policies/pending',
    id: uuid(),
    displayText: 'Review pending policies',
    icon: <NotebookPen className="h-4" />,
  },
  {
    link: '/manager/policyType',
    id: uuid(),
    displayText: 'All policy types',
    icon: <BookType className="h-4" />,
  },
  {
    link: '/manager/staff',
    id: uuid(),
    displayText: 'View all staff',
    icon: <PersonStanding className="h-4" />,
  },
];

function useLinksList() {
  const pathname = usePathname();
  if (pathname === "/") return homeLinksList;
  if (pathname.startsWith("/customer")) return customerLinksList;
  if (pathname.startsWith("/damage-inspector")) return damageInspectorLinksList;
  if (pathname.startsWith("/db-admin")) return dbAdminLinksList;
  if (pathname.startsWith("/manager")) return managerLinksList;
  return homeLinksList;
}

export default function Sidenav() {
  const linksList = useLinksList();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, openSidebar] = useState(false);
  const content = () => (
    <div className="h-screen flex flex-col justify-between p-4 w-64 bg-zinc-800 text-zinc-200">
      <div className="w-full overflow-auto flex flex-col gap-4">
        <div className="mb-2 flex gap-4 items-center font-bold text-lg">
          <Image
            src="/images/company-logo.png"
            width="40"
            height="40"
            alt="logo"
            className="invert"
          />
          <p>Motor Insurance</p>
        </div>
        {linksList.map((obj) => (
          <Link key={obj.id} href={obj.link} className="flex items-center">
            <div
              onClick={() => openSidebar(false)}
              className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
                pathname === obj.link && "font-bold text-zinc-800 bg-zinc-400"
              }`}
            >
              {obj.icon}
              <p>{obj.displayText}</p>
            </div>
          </Link>
        ))}
      </div>
      {linksList !== homeLinksList ? (
        <Popover>
          <PopoverTrigger>
            <div className="p-2 flex items-center">
                <div className="grow px-4 flex justify-between">
                <p className="truncate">{session?.user?.email}</p>
                <ChevronRight />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent asChild side="right" sideOffset={0}>
            <div className="w-full p-0 mb-2 bg-transparent border-0">
              <Link href={`/${session?.user?.role}/profile`}>
                <Button className="w-full rounded-b-none flex gap-2 items-center justify-start bg-zinc-300 hover:bg-zinc-400 text-zinc-800">
                  <UserRound className="h-4" />
                  <p>Profile</p>
                </Button>
              </Link>
              <Button
                className="w-full rounded-t-none flex gap-2 items-center justify-start bg-zinc-300 hover:bg-zinc-400 text-zinc-800"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                <LogOut className="rotate-180 h-4" />
                <p>Logout</p>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        ""
      )}
    </div>
  );
  return (
    <>
      <div
        className={(open
          ? "ease-in duration-200 translate-x-0"
          : "ease-out duration-200 -translate-x-64 "
        ).concat(" flex z-10 fixed md:hidden")}
        onBlur={() => openSidebar(false)}
        onFocus={() => openSidebar(true)}
      >
        {content()}
        <Button
          className="md:hidden mt-4 rounded-r-full p-2 text-zinc-300 bg-zinc-800 border-none hover:bg-zinc-800 focus:bg-zinc-800"
          onClick={() => openSidebar(!open)}
        >
          <Menu />
        </Button>
      </div>
      <div className="hidden md:flex fixed">{content()}</div>
    </>
  );
}
