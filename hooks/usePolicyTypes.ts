"use client";

import { useQuery } from "@tanstack/react-query";
import type * as db from '@/types/dbSchema';


export function usePolicyTypes() {
  const policyTypes = useQuery({
    queryKey: ['policy-types'],
    queryFn: async () => {
      const res = await fetch('/api/util/policyTypes');
      if (!res.ok)
        throw res.statusText;
      const body = await res.json();
      if (body?.error)
        throw body.error;
      return body.data as [db.PolicyType];
    },
    refetchInterval: 15 * 60 * 1000
  });
  return policyTypes;
}
