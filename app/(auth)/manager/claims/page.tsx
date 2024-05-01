'use client';

import { useQuery } from '@tanstack/react-query';
import type * as Db from '@/types/dbSchema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ManagerClaimsPage() {
    const claimsQuery = useQuery({
        queryKey: ['manager/claims'],
        queryFn: async () => {
            const res = await fetch('/api/manager/claims');
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            return json.data as Db.Claim[];
        },
        refetchInterval: 5 * 60 * 1000
    });

    if (!claimsQuery.isSuccess || !claimsQuery.data) return <div></div>;

    return (
        <div className='p-4'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Claim Id</TableHead>
                        <TableHead>Customer Id</TableHead>
                        <TableHead>Policy Id</TableHead>
                        <TableHead>Claim Amount</TableHead>
                        <TableHead>Incident Id</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {claimsQuery.data.map(claim => (
                        <TableRow key={claim.claim_id}>
                            <TableCell className="font-medium">{claim.claim_id}</TableCell>
                            <TableCell>{claim.customer_id}</TableCell>
                            <TableCell>{claim.policy_id}</TableCell>
                            <TableCell>{claim.claim_amount}</TableCell>
                            <TableCell>{claim.incident_id}</TableCell>
                            <TableCell>{claim.created_at}</TableCell>
                            <TableCell>{claim.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
