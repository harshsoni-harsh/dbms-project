import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

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

export default function Page({ params }: any) {
  return (
    <div className="p-4 flex flex-col gap-6 overflow-auto w-full">
      <div className="flex justify-between items-center">
        <p className="text-2xl">Claims</p>
        <Link
          href={`/customer/claims/new`}
          className="w-fit bg-zinc-800 rounded-md px-4 p-2 hover:bg-zinc-400 hover:text-zinc-950"
        >
          File a claim
        </Link>
      </div>
      <div className="flex gap-4 flex-wrap w-full">
        {claims.map((claim) => (
          <Link
            key={claim.claimId}
            href={`/customer/claim/${claim.claimId}`}
            className="w-72 max-sm:w-full"
          >
            <Card className="border-2 bg-zinc-900">
              <CardHeader>
                <CardTitle>
                  <p>{claim.claimId}</p>
                </CardTitle>
                <CardDescription>
                  Agreement Id: {claim.agreementId}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-2">
                  <div className="flex flex-col justify-between gap-2 flex-wrap">
                    <p>Damage Type: {claim.damageType}</p>
                    <p>Date of claim: {claim.dateOfClaim}</p>
                    <p>Amount: {claim.claimAmount}</p>
                    <p>Claim Status: {claim.claimStatus}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
