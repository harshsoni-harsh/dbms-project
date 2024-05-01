'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import type * as Db from '@/types/dbSchema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ManagerPendingPoliciesPage() {
    const policiesQuery = useQuery({
        queryKey: ['manager/policies/pending'],
        queryFn: async () => {
            const res = await fetch('/api/manager/policies/pending');
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            return json.data as Db.Policy[];
        },
        refetchInterval: 5 * 60 * 1000
    });

    const updatePolicy = useMutation({
        mutationFn: async ({ policyId, status }: { policyId: number, status: string }) => {
            toast('Updating');
            console.log(policyId, status);
            const res = await fetch('/api/manager/policies', {
                method: 'POST',
                body: JSON.stringify({ status, policyId })
            });
            if (!res.ok) throw res.statusText;
        },
        onSuccess: () => toast('Success'),
        onError: (err) => toast('Error ' + err)
    });

    if (!policiesQuery.isSuccess || !policiesQuery.data) return <div></div>;

    const data: Db.Policy[] = [
        {
            policy_id: 1,
            customer_id: 4,
            policy_type_id: 2,
            premium_amount: 100,
            registration_month: 3,
            registration_year: 2010,
            status: 'pending',
            vehicle_make: 'Diesel',
            vehicle_manufacturer: 'Honda',
            vehicle_number: 'abcd1234',
            vehicle_type: 'Car',
            vehicle_price: 0
        }
    ];

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
                        <TableHead className='flex items-center justify-center'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(policy => (
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
                            <TableCell className='flex gap-2'>
                                <Button
                                    disabled={updatePolicy.isPending}
                                    className='w-1/2' 
                                    onClick={() => updatePolicy.mutate({ status: 'active', policyId: policy.policy_id })}
                                >
                                    Approve
                                </Button>
                                <Button
                                    disabled={updatePolicy.isPending}
                                    variant='destructive' 
                                    className='w-1/2'
                                    onClick={() => updatePolicy.mutate({ status: 'reject', policyId: policy.policy_id })}
                                >
                                    Reject
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
