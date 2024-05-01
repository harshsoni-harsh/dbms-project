"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClaims } from '@/hooks/customer/useClaims';

const Page = ({ params }: { params: { claimId: number } }) => {
  const claimsQuery = useClaims();

  if(!claimsQuery.isSuccess || !claimsQuery.data) return <></>;

  const claim = claimsQuery.data.find(v => v.claim_id === params.claimId)!;

  return (
    <div className="overflow-auto flex flex-col items-center justify-center w-full h-full p-4">
      <Card className="bg-zinc-900 border-2 max-h-full overflow-auto">
        <CardHeader>
          <CardTitle>Claim Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 p-6 w-full">
          <p className="border-2 rounded-lg p-2 w-full">
            Claim Id: {claim.claim_id}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Claim amount: {claim.claim_amount}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Created at: {claim.created_at}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Incident Id: {claim.incident_id}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Policy Id: {claim.policy_id}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Claim Status: {claim.status}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
