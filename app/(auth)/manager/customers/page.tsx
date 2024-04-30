'use client';

import { useQuery } from '@tanstack/react-query';

export default function ManagerCustomersPage() {
    const customersQuery = useQuery({
        queryKey: ['manager', 'claims'],
        queryFn: async () => {
            const res = await fetch('/api/manager/customers');
            if(!res.ok) throw res.statusText;
            const json = await res.json();
            if('error' in json) throw json.error;

            return json.data;
        },
        refetchInterval: 5 * 60 * 1000
    });
    if(customersQuery.isSuccess) console.log('customersQuery data:', customersQuery.data);

    return (
        <></>
    );
}
