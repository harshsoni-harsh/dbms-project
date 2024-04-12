import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

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

export default function Page({ params }: any) {
  return (
    <div className="p-4 flex flex-col gap-6 overflow-auto w-full">
      <p className="text-2xl">Policies</p>
      <div className="flex gap-4 flex-wrap w-full">
        {policies.map((policy) => (
          <Link
            key={policy.aggrementId}
            href={`/customer/${params.id}/policy/${policy.policyNum}`}
            className="w-96 max-sm:w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  <p>{policy.policyNum}</p>
                </CardTitle>
                <CardDescription>
                  {policy.vehicleType} insurance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between gap-4 flex-wrap">
                    <div>
                      <p>Vehicle Make: {policy.vehicleMake}</p>
                      <p>Vehicle Model: {policy.vehicleModel}</p>
                    </div>
                    <div>
                      <p>Vehicle No.: {policy.vehicleNum}</p>
                      <p>Valid Till: {policy.endDate}</p>
                    </div>
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
