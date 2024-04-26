"use client";

import Coverage from "@/components/forms/Coverage";
import Vehicle from "@/components/forms/Vehicle";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";

const NewPolicy = () => {
  const [pageNum, setPageNum] = useState(1);

  switch (pageNum) {
    case 1:
      return (
        <Card className="max-lg:w-full max-w-4xl h-fit max-h-full overflow-auto">
          <CardHeader className="font-bold text-4xl text-center">
            Vehicle Details
          </CardHeader>
          <CardContent>
            <Vehicle onClick={() => setPageNum(2)} />
          </CardContent>
        </Card>
      );

    case 2:
      return (
        <Card className="max-w-4xl h-fit max-h-full overflow-auto">
          <CardHeader className="font-bold text-4xl text-center">
            Coverage Details
          </CardHeader>
          <CardContent>
            <Coverage onClick={() => setPageNum(1)} />
          </CardContent>
        </Card>
      );
    default:
      break;
  }
};

const Page = () => {
  return (
    <div className="overflow-auto flex flex-col items-center justify-center w-full h-full p-4">
      <NewPolicy />
    </div>
  );
};
export default Page;
