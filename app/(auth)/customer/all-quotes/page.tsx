import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const quotes = [
  {
    quoteId: "de45thjklp09uh",
    applicationId: "98765498787",
    custName: "Rahul",
    issueDate: "22-12-2022",
    validFrom: "22-12-2022",
    validTill: "22-3-2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quos?",
    productId: "",
    coverageLevel: "comprehensive with 3rd party",
  },
  {
    quoteId: "asdfghjklpoiuyt",
    applicationId: "76543210987",
    custName: "James",
    issueDate: "20-3-2024",
    validFrom: "20-3-2024",
    validTill: "20-6-2024",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, perspiciatis.",
    productId: "",
    coverageLevel: "third party fire and theft",
  },
  {
    quoteId: "qwertyuioplkjhgf",
    custName: "Isabella",
    applicationId: "87654321098",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, libero.",
    issueDate: "10-11-2024",
    validFrom: "10-11-2024",
    validTill: "10-2-2025",
    productId: "",
    coverageLevel: "comprehensive",
  },
];

export default function Page({ params }: any) {
  return (
    <div className="p-4 flex flex-col gap-6 overflow-auto w-full">
      <p className="text-2xl">Quotes</p>
      <div className="flex gap-4 flex-wrap w-full">
        {quotes.map((quote) => (
          <Link
            key={quote.quoteId}
            href={`/customer/quote/${quote.quoteId}`}
            className="w-96 max-sm:w-full"
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle>
                  <p>{quote.quoteId}</p>
                </CardTitle>
                <CardDescription>{quote.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-2">
                  <div className="flex flex-col justify-between gap-2">
                    <p>Issue Date: {quote.issueDate}</p>
                    <p>Valid From: {quote.validFrom}</p>
                    <p>Valid Till: {quote.validTill}</p>
                    <p>Coverage Level: {quote.coverageLevel}</p>
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
