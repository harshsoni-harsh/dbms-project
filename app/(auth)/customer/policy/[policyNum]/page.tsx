"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = ({ params }: { params: { policyNum: string } }) => {
  const policies = [
    {
      aggrementId: "1qaxcvhi8765r",
      applicationId: "1234567890",
      vehicleType: "Two wheeler",
      policyNum: "1234-5678-3456",
      vehicleMake: "Nothing",
      vehicleModel: "Google",
      vehicleNum: "UI 98 Y 8765",
      endDate: "2-Jul-2023",
    },
    {
      aggrementId: "9876rdcvbjko9",
      applicationId: "1234567890",
      vehicleType: "Four wheeler",
      policyNum: "2452-5678-3456",
      vehicleMake: "Micromax",
      vehicleModel: "GOOD",
      vehicleNum: "QA 14 E 8765",
      endDate: "4-May-2026",
    },
    {
      aggrementId: "fghjk8765rtyu",
      applicationId: "2345678901",
      vehicleType: "Two wheeler",
      policyNum: "5678-1234-9012",
      vehicleMake: "Something",
      vehicleModel: "Apple",
      vehicleNum: "ZX 12 R 3456",
      endDate: "10-Oct-2024",
    },
  ];

  const currPolicy = policies.find(
    (policy) => policy.policyNum === params.policyNum
  );

  return (
    <div className="overflow-auto flex flex-col items-center justify-center w-full h-full p-4">
      <Card className="bg-zinc-900 border-2 max-h-full overflow-auto">
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 p-6 w-full">
          <p className="border-2 rounded-lg p-2 w-full">
            Policy Number: {currPolicy?.policyNum}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Application ID: {currPolicy?.applicationId}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Agreement ID: {currPolicy?.aggrementId}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Vehicle Number: {currPolicy?.vehicleNum}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Vehicle Model: {currPolicy?.vehicleModel}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Vehicle Make: {currPolicy?.vehicleMake}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Vehicle Type: {currPolicy?.vehicleType}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            End Date: {currPolicy?.endDate}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
