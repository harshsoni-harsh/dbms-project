'use client';

import { useQuery } from '@tanstack/react-query';
import type * as Db from '@/types/dbSchema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ManagerCustomersPage() {
    const customersQuery = useQuery({
        queryKey: ['manager/customers'],
        queryFn: async () => {
            const res = await fetch('/api/manager/customers');
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            return json.data as Db.Customer[];
        },
        refetchInterval: 5 * 60 * 1000
    });
    if (!customersQuery.isSuccess || !customersQuery.data) return <div></div>;

    return (
        <div className='p-4'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone No.</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>PAN</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customersQuery.data.map(customer => (
                        <TableRow key={customer.customer_id}>
                            <TableCell className="font-medium">{customer.customer_id}</TableCell>
                            <TableCell>{customer.first_name} {customer.last_name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone_no}</TableCell>
                            <TableCell>{customer.gender}</TableCell>
                            <TableCell>{customer.pan_no}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
