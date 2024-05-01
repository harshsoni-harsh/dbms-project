'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useClaims } from '@/hooks/customer/useClaims';
import Link from "next/link";


export default function Page({ params }: any) {
  const claimsQuery = useClaims();

  if(!claimsQuery.isSuccess || !claimsQuery.data) return <></>;

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
        {claimsQuery.data.map((claim) => (
          <Link
            key={claim.claim_id}
            href={`/customer/claim/${claim.claim_id}`}
            className="w-72 max-sm:w-full"
          >
            <Card className="border-2 bg-zinc-900">
              <CardHeader>
                <CardTitle>
                  <p>{claim.claim_id}</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-2">
                  <div className="flex flex-col justify-between gap-2 flex-wrap">
                    <p>Claim amount: {claim.claim_amount}</p>
                    <p>Created at: {claim.created_at}</p>
                    <p>Incident Id: {claim.incident_id}</p>
                    <p>Policy Id: {claim.policy_id}</p>
                    <p>Status: {claim.status}</p>
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
