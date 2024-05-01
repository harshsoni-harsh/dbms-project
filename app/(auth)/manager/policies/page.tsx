'use client';

import { useQuery } from '@tanstack/react-query';
import type * as Db from '@/types/dbSchema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function ManagerPoliciesPage() {
    const policiesQuery = useQuery({
        queryKey: ['manager/policies'],
        queryFn: async () => {
            const res = await fetch('/api/manager/policies');
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            return json.data as Db.Policy[];
        },
        refetchInterval: 5 * 60 * 1000
    });

    if (!policiesQuery.isSuccess || !policiesQuery.data) return <div></div>;

    return (
        <div className='p-4'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Customer Id</TableHead>
                        <TableHead>Policy Type Id</TableHead>
                        <TableHead>Vehicle Manufacturer</TableHead>
                        <TableHead>Vehicle Type</TableHead>
                        <TableHead>Vehicle Make</TableHead>
                        <TableHead>Registration</TableHead>
                        <TableHead>Vehicle Number</TableHead>
                        <TableHead>Premium</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {policiesQuery.data.map(policy => (
                        <TableRow key={policy.policy_id}>
                            <TableCell className="font-medium">{policy.policy_id}</TableCell>
                            <TableCell>{policy.customer_id}</TableCell>
                            <TableCell>{policy.policy_type_id}</TableCell>
                            <TableCell>{policy.vehicle_manufacturer}</TableCell>
                            <TableCell>{policy.vehicle_type}</TableCell>
                            <TableCell>{policy.vehicle_make}</TableCell>
                            <TableCell>{policy.registration_year}/{policy.registration_month}/--</TableCell>
                            <TableCell>{policy.vehicle_number}</TableCell>
                            <TableCell>{policy.premium_amount}</TableCell>
                            <TableCell>{policy.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
