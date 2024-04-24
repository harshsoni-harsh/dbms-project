import Sidenav from "@/components/Sidenav";
import Image from "next/image";
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
import { v4 as uuid } from "uuid";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const linksList = [
    {
      link: "/customer/" + params.id + "/",
      id: uuid(),
      displayText: "Home",
      icon: <Home className="h-4" />,
    },
    {
      link: "/customer/" + params.id + "/new-policy",
      id: uuid(),
      displayText: "New Policy",
      icon: <CirclePlus className="h-4" />,
    },
    {
      link: "/customer/" + params.id + "/all-policies",
      id: uuid(),
      displayText: "View Policies",
      icon: <BookText className="h-4" />,
    },
    {
      link: "/customer/" + params.id + "/claims",
      id: uuid(),
      displayText: "Claims",
      icon: <FileText className="h-4" />,
    },
    {
      link: "/customer/" + params.id + "/pay-premium",
      id: uuid(),
      displayText: "Pay Premium",
      icon: <IndianRupee className="h-4" />,
    },
    {
      link: "/customer/" + params.id + "/view-receipts",
      id: uuid(),
      displayText: "View Receipts",
      icon: <BookOpenText className="h-4" />,
    },
  ];
  return (
    <div className="h-screen flex overflow-auto">
      <Sidenav linksList={linksList} params={params} />
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
    </div>
  );
}
