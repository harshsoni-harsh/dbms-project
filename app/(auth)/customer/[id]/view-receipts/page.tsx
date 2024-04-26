import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const receipts = [{
  receiptId: "R123456",
  premiumPaymentId: "P789012",
  policyNumber: "POL-001",
  premiumPaymentSchedule: "Monthly",
  premiumPaymentAmount: 100,
  cost: 80,
  time: "2024-04-12T08:00:00Z",
}, {
  receiptId: "R123457",
  premiumPaymentId: "P789013",
  policyNumber: "POL-002",
  premiumPaymentSchedule: "Quarterly",
  premiumPaymentAmount: 200,
  cost: 160,
  time: "2024-04-11T15:30:00Z",
}, {
  receiptId: "R123458",
  premiumPaymentId: "P789014",
  policyNumber: "POL-003",
  premiumPaymentSchedule: "Annual",
  premiumPaymentAmount: 500,
  cost: 400,
  time: "2024-04-10T10:45:00Z",
}];


export default function Page() {
  return (
    <div className="p-4 flex flex-col gap-6 overflow-auto w-full">
      <p className="text-2xl">Receipts</p>
      <div className="flex max-md:flex-col flex-wrap gap-4">
        {
          receipts.map(receipt => (
            <Card key={receipt.receiptId} className="max-w shrink">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <p>{receipt.policyNumber}</p>
                  <p className="text-lg">Rs {receipt.premiumPaymentAmount}</p>
                </CardTitle>
                <CardDescription>Receipt Id: {receipt.receiptId}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-md:flex justify-between flex-wrap">
                  <div>
                    <p>Payment Id: {receipt.premiumPaymentId}</p>
                    <p>Payment Schedule: {receipt.premiumPaymentSchedule}</p>
                  </div>
                  <div>
                    <p>Cost: {receipt.cost}</p>
                    <p>Time: {receipt.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  )
}