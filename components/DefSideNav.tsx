"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LogOut,
  Home,
  ChevronRight,
  UserRound,
  CirclePlus,
  BookText,
  FileText,
  IndianRupee,
  BookOpenText,
  Menu,
  UserPlus,
  LogIn,
  MessageCircleQuestion,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function defSideNav({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/")[3];
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
        <Link href={`/`} className="flex items-center">
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              !path && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <Home className="h-4" />
            <p>Home</p>
          </div>
        </Link>
        <Link href={`/auth/login`} className="flex items-center">
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              path === "new-policy" && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <LogIn className="h-4" />

            <p>Login</p>
          </div>
        </Link>
        <Link href={`/auth/register`}>
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              path === "all-policies" && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <UserPlus className="h-4" />

            <p>Register</p>
          </div>
        </Link>
        <Link href={`/about`}>
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              path === "claims" && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <FileText className="h-4" />
            <p>About</p>
          </div>
        </Link>
        <Link href={`/privacy`}>
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              path === "pay-premium" && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <IndianRupee className="h-4" />
            <p>Products</p>
          </div>
        </Link>
        <Link href={`/policies`}>
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              path === "view-receipts" && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <MessageCircleQuestion className="h-4" />

            <p>Support</p>
          </div>
        </Link>
      </div>
    </div>
  );
  return (
    <>
      <div
        className={(open
          ? "ease-in duration-200 translate-x-0"
          : "ease-out duration-200 -translate-x-64 "
        ).concat(" flex z-10 fixed md:hidden")}
      >
        {content()}
        <Button
          className="md:hidden mt-4 rounded-r-full p-2 bg-zinc-800 border-none"
          onClick={() => openSidebar(!open)}
        >
          <Menu />
        </Button>
      </div>
      <div className="hidden md:flex fixed">{content()}</div>
    </>
  );
}
