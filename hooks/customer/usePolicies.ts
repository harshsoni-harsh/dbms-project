"use client";

import { useQuery } from "@tanstack/react-query";
import type * as db from '@/types/dbSchema';


export function usePolicies() {
  const customerPolicies = useQuery({
    queryKey: ['customer/policies'],
    queryFn: async () => {
      const res = await fetch('/api/customer/policies');
      if (!res.ok)
        throw res.statusText;
      const body = await res.json();
      if (body?.error)
        throw body.error;
      return body.data as [db.Policy];
    },
    refetchInterval: 15 * 60 * 1000
  });

  return customerPolicies;
}
