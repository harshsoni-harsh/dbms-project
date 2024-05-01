"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePolicies } from "@/hooks/customer/usePolicies";

const Page = ({ params }: { params: { policyId: string } }) => {
  const policiesQuery = usePolicies();

  if (!policiesQuery.isSuccess || !policiesQuery.data) return <></>;

  const policy = policiesQuery.data.find(
    (v) => v.policy_id === parseInt(params.policyId)
  )!;

  return (
    <div className="overflow-auto flex flex-col items-center justify-center w-full h-full p-4">
      <Card className="bg-zinc-900 border-2 max-h-full overflow-auto">
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 p-6 w-full">
          <p className="border-2 rounded-lg p-2 w-full">
            Policy ID: {policy.policy_id}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Premium amount: {policy.premium_amount}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Vehicle Manufacturer: {policy.vehicle_manufacturer}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Vehicle Make: {policy.vehicle_make}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Vehicle Type: {policy.vehicle_type}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Vehicle Price: {policy.vehicle_price}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Registration Month: {policy.registration_month}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Registration Year: {policy.registration_year}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
