import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const data = {
  policies: [{
    aggrementId: "1qaxcvhi8765r",
    applicationId: "1234567890",
    custName: "Some",
    vehicleType: "Two wheeler",
    policyNum: "1234/5678/3456",
    vehicleMake: "Nothing",
    vehicleModel: "Google",
    vehicleNum: "UI 98 Y 8765",
    endDate: "2-Jul-2023"
  }, {
    aggrementId: "9876rdcvbjko9",
    applicationId: "1234567890",
    custName: "Person",
    vehicleType: "Four wheeler",
    policyNum: "2452/5678/3456",
    vehicleMake: "Micromax",
    vehicleModel: "GOOD",
    vehicleNum: "QA 14 E 8765",
    endDate: "4-May-2026"
  }],
  quotes: [{
    quoteId: "de45thjklp09uh",
    applicationId: "98765498787",
    custName: "Rahul",
    issueDate: "22/12/2022",
    validFrom: "22/12/2022",
    validTill: "22/3/2023",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quos?",
    productId: "",
    coverageLevel: "comprehensive with 3rd party"
  }]
}

export default function Page() {
  const { policies, quotes } = data
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="w-fit flex flex-col gap-3">
        {
          policies.length !== 0 && <p className="text-2xl">Policies</p>
        }
        <div className="flex gap-4 flex-wrap">
          {
            policies.map(policy => (
              <Card key={policy.aggrementId}>
                <CardHeader>
                  <CardTitle>
                    <>
                      <p>{policy.custName}</p>
                    </>
                  </CardTitle>
                  <CardDescription>{policy.vehicleType} insurance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-72 text-[10px] space-y-2">
                    <div>
                      <p className="text-xs">Policy Number: {policy.policyNum}</p>
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
            ))
          }
        </div>
      </div>
      <div className="w-fit flex flex-col gap-3">
        {
          quotes.length !== 0 && <p className="text-2xl">Quotes</p>
        }
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}