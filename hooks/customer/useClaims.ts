"use client";

import { useQuery } from "@tanstack/react-query";
import type * as db from '@/types/dbSchema';


export function useClaims() {
  const claimsQuery = useQuery({
    queryKey: ['customer/claim'],
    queryFn: async () => {
      const res = await fetch('/api/customer/claim');
      if (!res.ok)
        throw res.statusText;
      const body = await res.json();
      if (body?.error)
        throw body.error;
      return body.data as db.Claim[];
    },
    refetchInterval: 15 * 60 * 1000
  });

  return claimsQuery;
}
