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
import { LogOut, ChevronRight, UserRound, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function Sidenav({
  params,
  linksList,
}: {
  params: { id: string };
  linksList: {
    link: string;
    id: string;
    displayText: string;
    icon: React.JSX.Element;
  }[];
}) {
  const pathname = usePathname();
  const splittedPath = pathname.split("/");
  const path = splittedPath[splittedPath.length - 1];
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
                path === obj.link.split("/")[obj.link.split("/").length - 1] &&
                "font-bold text-zinc-800 bg-zinc-400"
              }`}
            >
              {obj.icon}
              <p>{obj.displayText}</p>
            </div>
          </Link>
        ))}
      </div>
      {splittedPath.length > 2 ? (
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
          <PopoverContent asChild side="right" sideOffset={0}>
            <div className="w-full p-0 mb-2 bg-transparent border-0">
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
