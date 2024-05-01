'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReceipts } from '@/hooks/customer/useReceipts';

export default function Page() {
  const receiptQuery = useReceipts();

  if(!receiptQuery.isSuccess || !receiptQuery.data) return <></>;

  const receipts = receiptQuery.data;

  return (
    <div className="p-4 flex flex-col gap-6 overflow-auto w-full">
      <p className="text-2xl">Receipts</p>
      <div className="flex max-md:flex-col flex-wrap gap-4">
        {receipts.map((receipt) => (
          <Card
            key={receipt.receipt_id}
            className="max-w shrink bg-zinc-900 border-2"
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <p>{receipt.policy_id}</p>
                <p className="text-lg">Rs {receipt.amount}</p>
              </CardTitle>
              <CardDescription>Txn Id: {receipt.txn_id}</CardDescription>
            </CardHeader>
            <CardContent>
              Created At: {receipt.created_at}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
