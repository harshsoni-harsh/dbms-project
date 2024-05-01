'use client';

import { useQuery } from '@tanstack/react-query';
import type * as Db from '@/types/dbSchema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ManagerCustomersPage() {
    const staffQuery = useQuery({
        queryKey: ['manager/staff'],
        queryFn: async () => {
            const res = await fetch('/api/manager/staff');
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            return json.data as Db.Staff[];
        },
        refetchInterval: 5 * 60 * 1000
    });
    if (!staffQuery.isSuccess || !staffQuery.data) return <div></div>;

    return (
        <div className='p-4'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone No.</TableHead>
                        <TableHead>Gender</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {staffQuery.data.map(staff => (
                        <TableRow key={staff.staff_id}>
                            <TableCell className="font-medium">{staff.staff_id}</TableCell>
                            <TableCell>{staff.role}</TableCell>
                            <TableCell>{staff.first_name} {staff.last_name}</TableCell>
                            <TableCell>{staff.email}</TableCell>
                            <TableCell>{staff.phone_no}</TableCell>
                            <TableCell>{staff.gender}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
