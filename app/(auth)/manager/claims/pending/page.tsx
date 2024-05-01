'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type * as Db from '@/types/dbSchema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { z } from 'zod';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Separator } from '@radix-ui/react-select';
import { useCallback, useState } from 'react';

const receiptFormSchema = z.object({
    created: z.coerce.date(),
    amount: z.coerce.number().int().positive(),
    txnId: z.coerce.number().int().positive()
});

export default function ManagerPendingClaimsPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const receiptForm = useForm<z.infer<typeof receiptFormSchema>>({
        resolver: zodResolver(receiptFormSchema),
        defaultValues: {
            created: new Date(),
            // @ts-expect-error it needs to be invalid
            amount: '',
            // @ts-expect-error it needs to be invalid
            txnId: ''
        }
    });

    const queryClient = useQueryClient();
    const claimsQuery = useQuery({
        queryKey: ['manager/claims/pending'],
        queryFn: async () => {
            const res = await fetch('/api/manager/claims/pending');
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            return json.data as Db.Claim[];
        },
        refetchInterval: 5 * 60 * 1000
    });

    const updateClaim = useMutation({
        mutationFn: async ({ claimId, status, receipt }: { claimId: number, status: string, receipt?: z.infer<typeof receiptFormSchema> }) => {
            toast('Updating');
            console.log(claimId, status, receipt);
            if(status === 'accepted') {
                const res = await fetch('/api/manager/claims', {
                    method: 'POST',
                    body: JSON.stringify({ status, claimId, receipt })
                });
                if (!res.ok) throw res.statusText;
            } else {
                const res = await fetch('/api/manager/claims', {
                    method: 'POST',
                    body: JSON.stringify({ status, claimId })
                });
                if (!res.ok) throw res.statusText;
            }
        },
        onSuccess: () => {
            toast('Success');
            queryClient.invalidateQueries({ queryKey: ['manager/claims'] });
            queryClient.invalidateQueries({ queryKey: ['manager/claims/pending'] });
        },
        onError: (err) => toast('Error ' + err)
    });

    const handleSubmit = useCallback((claim: Db.Claim, values: z.infer<typeof receiptFormSchema>) => {
        setDialogOpen(false);
        updateClaim.mutate({
            claimId: claim.claim_id,
            status: 'accepted',
            receipt: values
        })
    }, [updateClaim]);

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
                        <TableHead className='flex items-center justify-center'>Status</TableHead>
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
                            <TableCell className='flex gap-2 items-center justify-center'>
                                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button size='sm' variant='outline'>
                                            Approve
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Receipt Details</DialogTitle>
                                            <DialogDescription>Enter externally generated receipt details</DialogDescription>
                                        </DialogHeader>
                                        <Separator />
                                        <Form {...receiptForm}>
                                            <form
                                                onSubmit={receiptForm.handleSubmit((v) => handleSubmit(claim, v))}
                                                className='flex flex-col gap-2'
                                            >
                                                <FormField
                                                    name='amount'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Amount</FormLabel>
                                                            <Input {...field} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name='txnId'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Transaction Id</FormLabel>
                                                            <Input {...field} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button
                                                    type='submit'
                                                    className='mt-6 place-self-center'
                                                >
                                                    Submit
                                                </Button>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    onClick={() => updateClaim.mutate({ status: 'rejected', claimId: claim.claim_id })}
                                    variant='destructive'
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
