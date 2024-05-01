"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { usePolicies } from "@/hooks/customer/usePolicies";


const CustomerPolicies = () => {

  const customerPolicies = usePolicies();

  if (customerPolicies.isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!customerPolicies.isSuccess) {
    return (
      <div>
        Something went wrong
      </div>
    );
  }

  if (!customerPolicies.data) {
    return (
      <div>
        No Policies
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-wrap w-full">
      {customerPolicies.data.map((policy) => (
        <Card className="border-2 bg-zinc-900" key={policy.policy_id}>
          <CardHeader className="w-96 max-sm:w-full">
            <CardTitle>
              {policy.policy_id}
            </CardTitle>
            <CardDescription>
              {policy.vehicle_type} insurance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-2">
              <div className="flex justify-between gap-4 flex-wrap">
                <div>
                  <p>Vehicle Make: {policy.vehicle_make}</p>
                  <p>Vehicle Model: {policy.vehicle_manufacturer}</p>
                </div>
                <div>
                  <p>Vehicle No: {policy.vehicle_number}</p>
                  <p>Status: {policy.status}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomerPolicies;