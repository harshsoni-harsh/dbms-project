'use client';

import { useQuery } from '@tanstack/react-query';

export default function ManagerClaimsPage() {
    const claimsQuery = useQuery({
        queryKey: ['manager', 'claims'],
        queryFn: async () => {
            const res = await fetch('/api/manager/claims');
            if(!res.ok) throw res.statusText;
            const json = await res.json();
            if('error' in json) throw json.error;

            return json.data;
        },
        refetchInterval: 5 * 60 * 1000
    });
    if(claimsQuery.isSuccess) console.log('claimsQuery data:', claimsQuery.data);

    return (
        <></>
    );
}
