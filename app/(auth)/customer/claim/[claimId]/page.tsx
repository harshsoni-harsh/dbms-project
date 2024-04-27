"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = ({ params }: { params: { claimId: string } }) => {
  const claims = [
    {
      claimId: "CLM-001",
      agreementId: "AGR-123",
      claimAmount: 500,
      damageType: "Vehicle Collision",
      dateOfClaim: "2024-04-05",
      claimStatus: "Pending",
    },
    {
      claimId: "CLM-002",
      agreementId: "AGR-124",
      claimAmount: 1000,
      damageType: "Property Damage",
      dateOfClaim: "2024-04-08",
      claimStatus: "Approved",
    },
    {
      claimId: "CLM-003",
      agreementId: "AGR-125",
      claimAmount: 750,
      damageType: "Theft",
      dateOfClaim: "2024-04-10",
      claimStatus: "Rejected",
    },
  ];

  const currClaim = claims.find((claim) => claim.claimId === params.claimId);

  return (
    <div className="overflow-auto flex flex-col items-center justify-center w-full h-full p-4">
      <Card className="bg-zinc-900 border-2">
        <CardHeader>
          <CardTitle>Claim Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 p-6 w-full">
          <p className="border-2 rounded-lg p-2 w-full">
            claim ID: {currClaim?.claimId}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Agreement ID: {currClaim?.agreementId}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Damage Type: {currClaim?.damageType}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Date Of Claim: {currClaim?.dateOfClaim}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Claim Amount: {currClaim?.claimAmount}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Claim Status: {currClaim?.claimStatus}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
