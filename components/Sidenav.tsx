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
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function Sidenav({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/")[3];
  const [open, openSidebar] = useState(false);
  const content = () => (
    <div className="h-screen flex flex-col justify-between p-4 w-64 bg-zinc-800 text-zinc-200">
      <div className="w-full flex flex-col gap-4">
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
        <Link href={`/customer/${params.id}/`} className="flex items-center">
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              !path && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <Home className="h-4" />
            <p>Home</p>
          </div>
        </Link>
        <Link
          href={`/customer/${params.id}/new-policy`}
          className="flex items-center"
        >
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              path === "new-policy" && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <CirclePlus className="h-4" />
            <p>New Policy</p>
          </div>
        </Link>
        <Link href={`/customer/${params.id}/all-policies`}>
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              path === "all-policies" && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <BookText className="h-4" />
            <p>View Policies</p>
          </div>
        </Link>
        <Link href={`/customer/${params.id}/claims`}>
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              path === "claims" && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <FileText className="h-4" />
            <p>Claims</p>
          </div>
        </Link>
        <Link href={`/customer/${params.id}/pay-premium`}>
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              path === "pay-premium" && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <IndianRupee className="h-4" />
            <p>Pay Premium</p>
          </div>
        </Link>
        <Link href={`/customer/${params.id}/view-premium-receipts`}>
          <div
            className={`flex items-center gap-2 w-full hover:font-bold hover:text-zinc-800 hover:bg-zinc-400 rounded-md p-2 ${
              path === "view-receipts" && "font-bold text-zinc-800 bg-zinc-400"
            }`}
          >
            <BookOpenText className="h-4" />
            <p>View Receipts</p>
          </div>
        </Link>
      </div>
      <Popover>
        <PopoverTrigger>
          <div className="p-2 flex items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grow px-4 flex justify-between">
              <p className="truncate">Person Name</p>
              <ChevronRight />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent asChild side="right" sideOffset={2}>
          <div className="w-40 p-0 mb-2">
            <Link href={`/customer/${params.id}/profile`}>
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
    </div>
  );
  return (
    <>
      <div className="z-10 flex absolute md:hidden">
        <div
          className={(open
            ? "ease-in duration-200 translate-x-0"
            : "ease-out duration-200 -translate-x-64 "
          ).concat(" flex")}
        >
          {content()}
          <Button
            className="md:hidden mt-4 rounded-r-full p-2 bg-zinc-800 border-none"
            onClick={() => openSidebar(!open)}
          >
            <Menu />
          </Button>
        </div>
      </div>
      <div className="hidden md:flex fixed">{content()}</div>
    </>
  );
}
