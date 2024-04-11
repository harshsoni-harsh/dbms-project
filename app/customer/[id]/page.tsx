import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  policies: [{
    aggrementId: "1qaxcvhi8765r",
    applicationId: "1234567890",
    custName: "Some",
    vehicleType: "Two wheeler",
    policyNum: "1234-5678-3456",
    vehicleMake: "Nothing",
    vehicleModel: "Google",
    vehicleNum: "UI 98 Y 8765",
    endDate: "2-Jul-2023"
  },
  {
    aggrementId: "9876rdcvbjko9",
    applicationId: "1234567890",
    custName: "Person",
    vehicleType: "Four wheeler",
    policyNum: "2452-5678-3456",
    vehicleMake: "Micromax",
    vehicleModel: "GOOD",
    vehicleNum: "QA 14 E 8765",
    endDate: "4-May-2026"
  },
  {
    aggrementId: "fghjk8765rtyu",
    applicationId: "2345678901",
    custName: "Another",
    vehicleType: "Two wheeler",
    policyNum: "5678-1234-9012",
    vehicleMake: "Something",
    vehicleModel: "Apple",
    vehicleNum: "ZX 12 R 3456",
    endDate: "10-Oct-2024"
  }
  ],
  quotes: [{
    quoteId: "de45thjklp09uh",
    applicationId: "98765498787",
    custName: "Rahul",
    issueDate: "22-12-2022",
    validFrom: "22-12-2022",
    validTill: "22-3-2023",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quos?",
    productId: "",
    coverageLevel: "comprehensive with 3rd party"
  },
  {
    quoteId: "asdfghjklpoiuyt",
    applicationId: "76543210987",
    custName: "James",
    issueDate: "20-3-2024",
    validFrom: "20-3-2024",
    validTill: "20-6-2024",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, perspiciatis.",
    productId: "",
    coverageLevel: "third party fire and theft"
  },
  {
    quoteId: "qwertyuioplkjhgf",
    applicationId: "87654321098",
    custName: "Isabella",
    issueDate: "10-11-2024",
    validFrom: "10-11-2024",
    validTill: "10-2-2025",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, libero.",
    productId: "",
    coverageLevel: "comprehensive"
  }
  ]
};

export default function Page({ params }: any) {
  const { policies, quotes } = data
  const topPolicies = policies.splice(0, 2)
  let topQuotes = quotes.splice(0, 2)
  return (
    <div className="p-4 flex flex-col gap-6 overflow-auto">
      <div className="w-fit flex flex-col gap-3">
        {
          policies.length !== 0 && <p className="text-2xl">Policies</p>
        }
        <div className="flex gap-4 flex-wrap">
          {
            topPolicies.map(policy => (
              <Link key={policy.aggrementId} href={`customer/${params.id}/policy/${policy.policyNum}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <>
                        <p>{policy.custName}</p>
                      </>
                    </CardTitle>
                    <CardDescription>{policy.vehicleType} insurance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-80 text-xs space-y-2">
                      <div>
                        <p>Policy Number: {policy.policyNum}</p>
                      </div>
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
            ))
          }
        </div>
        {
          topPolicies.length !== policies.length ?
            <Link href={`${params.id}/all-policies`} className="w-fit bg-zinc-800 rounded-md px-4 p-2">View more</Link>
            : ""
        }
      </div>
      <div className="w-fit flex flex-col gap-3">
        {
          quotes.length !== 0 && <p className="text-2xl">Quotes</p>
        }
        <div className="flex gap-4 flex-wrap">
          {
            topQuotes.map(quote => (
              <Link key={quote.quoteId} href={`customer/${params.id}/quote/${quote.quoteId}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{quote.custName}</CardTitle>
                    <CardDescription>Application Id: {quote.applicationId}</CardDescription>
                  </CardHeader>
                  <CardContent className="max-w-80 space-y-4">
                    <p className="truncate">{quote.description}</p>
                    <div className="flex text-xs space-x-4">
                      <div>
                        Issued date: {quote.issueDate}
                      </div>
                      <div>
                        Valid Till: {quote.validTill}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          }
        </div>
        {
          topQuotes.length !== quotes.length ?
            <Link href={`${params.id}/all-quotes`} className="w-fit bg-zinc-800 rounded-md p-2 px-4">View more</Link>
            : ""
        }
      </div>
    </div>
  )
}