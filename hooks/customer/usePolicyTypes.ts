"use client";

import { useQuery } from "@tanstack/react-query";

import type * as Db from '@/types/dbSchema';

export function usePolicyTypes() {
    const policyTypes = useQuery({
        queryKey: ['customer/policyType'],
        queryFn: async () => {
            const res = await fetch('/api/util/policyType');
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            return json.data as Db.PolicyType[];
        },
        refetchInterval: 5 * 60 * 1000
    });

    return policyTypes;
}
