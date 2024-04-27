"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = ({ params }: { params: { quoteId: string } }) => {
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

  const currQuote = quotes.find((quote) => quote.quoteId === params.quoteId);

  return (
    <div className="overflow-auto flex flex-col items-center justify-center w-full h-full p-4">
      <Card className="bg-zinc-900 border-2 max-h-full max-w-xl overflow-auto">
        <CardHeader>
          <CardTitle>Quote Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 p-6 w-full">
          <p className="border-2 rounded-lg p-2 w-full">
            Quote ID: {currQuote?.quoteId}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Customer Name: {currQuote?.custName}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Application ID: {currQuote?.applicationId}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Product ID: {currQuote?.productId}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Description: {currQuote?.description}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Issue Date: {currQuote?.issueDate}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Valid From: {currQuote?.validFrom}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Valid Till: {currQuote?.validTill}
          </p>
          <p className="border-2 rounded-lg p-2 w-full">
            Coverage Level: {currQuote?.coverageLevel}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
