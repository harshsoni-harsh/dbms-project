"use client";

import { useQuery } from "@tanstack/react-query";
import type * as db from '@/types/dbSchema';


export function useReceipts() {
  const claimsQuery = useQuery({
    queryKey: ['customer/receipts'],
    queryFn: async () => {
      const res = await fetch('/api/customer/receipt');
      if (!res.ok)
        throw res.statusText;
      const body = await res.json();
      if (body?.error)
        throw body.error;
      return body.data as db.PremiumReceipt[];
    },
    refetchInterval: 15 * 60 * 1000
  });

  return claimsQuery;
}
