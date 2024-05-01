"use client";

import Coverage from "@/components/forms/Coverage";
import Vehicle from "@/components/forms/Vehicle";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";

import type * as db from "@/types/dbSchema";


export interface PolicyForm extends Omit<db.Policy, "policy_id" | "customer_id" | "status" | "premium_amount"> {};

const currentYear = (new Date).getFullYear();
const currentMonth = (new Date).getMonth();


const NewPolicy = () => {
  const [pageNum, setPageNum] = useState(1);
  const [formData, setFormData] = useState<PolicyForm>({
    policy_type_id: 0,
    vehicle_manufacturer: "",
    vehicle_type: "",
    vehicle_make: "",
    registration_year: currentYear,
    registration_month: currentMonth,
    vehicle_number: "",
    vehicle_price: 0,
  });

  switch (pageNum) {
    case 1:
      return (
        <Card className="max-lg:w-full max-w-4xl h-fit max-h-full overflow-auto">
          <CardHeader className="font-bold text-xl lg:text-4xl text-center">
            Vehicle Details
          </CardHeader>
          <CardContent>
            <Vehicle next={() => setPageNum(2)} formData={formData} setFormData={setFormData} />
          </CardContent>
        </Card>
      );

    case 2:
      return (
        <Card className="h-fit max-h-full overflow-auto w-full">
          <CardHeader className="font-bold text-xl lg:text-4xl text-center">
            Coverage Details
          </CardHeader>
          <CardContent className="w-full flex justify-center">
            <Coverage back={() => setPageNum(1)} formData={formData} setFormData={setFormData} />
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
