'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type * as Db from '@/types/dbSchema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
    AlertDialog, AlertDialogFooter, AlertDialogHeader,
    AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';

const sampleData: Db.PolicyType[] = [
    {
        policy_type_id: 1,
        maturity_duration: 10,
        renew_duration: 1,
        title: "Life Insurance",
        description: "Life insurance policy provides financial protection and security to the insured's family in case of the insured's death.",
        coverage: 50.00
    },
    {
        policy_type_id: 2,
        maturity_duration: 15,
        renew_duration: 1,
        title: "Health Insurance",
        description: "Health insurance policy covers the medical expenses incurred by the insured individual due to illness or injury.",
        coverage: 65.50
    },
    {
        policy_type_id: 3,
        maturity_duration: 5,
        renew_duration: 1,
        title: "Home Insurance",
        description: "Home insurance policy provides coverage for damage or destruction to the insured's home and belongings.",
        coverage: 85.00
    },
    {
        policy_type_id: 4,
        maturity_duration: 20,
        renew_duration: 1,
        title: "Car Insurance",
        description: "Car insurance policy provides coverage for damage or theft of the insured vehicle, as well as liability coverage for injuries or damage caused to other people or property.",
        coverage: 35.00
    }
];

const policyTypeSchema = z.object({
    title: z.string(),
    description: z.string(),
    maturityDuration: z.coerce.number().int().positive(),
    renewDuration: z.coerce.number().int().positive(),
    coverage: z.coerce.number().min(0).max(100)
});

export default function ManagerPolicyTypesPage() {
    const policyTypeForm = useForm<z.infer<typeof policyTypeSchema>>({
        resolver: zodResolver(policyTypeSchema)
    });

    const onFormSubmit = useCallback((values: z.infer<typeof policyTypeSchema>) => {
        console.log('values:', values);
    }, []);

    const queryClient = useQueryClient();
    const policyTypes = useQuery({
        queryKey: ['manager/policies'],
        queryFn: async () => {
            const res = await fetch('/api/util/policyTypes');
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            return json.data as Db.PolicyType[];
        },
        refetchInterval: 5 * 60 * 1000
    });

    const deleteMutation = useMutation({
        mutationFn: async ({ policyTypeId }: { policyTypeId: number }) => {
            toast('Deleting');
            const res = await fetch('/api/manager/policyType', {
                method: 'DELETE',
                body: JSON.stringify({ policyTypeId })
            });
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            toast('Success');
            queryClient.invalidateQueries({
                queryKey: ['manager/policies']
            });
        }
    });

    const updateMutation = useMutation({
        mutationFn: async ({ policyTypeId, policyType }: { policyTypeId: number, policyType: z.infer<typeof policyTypeSchema> }) => {
            toast('Updating');
            const res = await fetch('/api/manager/policyType', {
                method: 'POST',
                body: JSON.stringify({ policyTypeId, policyType })
            });
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            toast('Success');
            queryClient.invalidateQueries({
                queryKey: ['manager/policies']
            });
        }
    })

    const createMutation = useMutation({
        mutationFn: async ({ policyType }: { policyType: z.infer<typeof policyTypeSchema> }) => {
            toast('Creating');
            const res = await fetch('/api/manager/policyType', {
                method: 'PUT',
                body: JSON.stringify(policyType)
            });
            if (!res.ok) throw res.statusText;
            const json = await res.json();
            if ('error' in json) throw json.error;

            toast('Success');
            queryClient.invalidateQueries({
                queryKey: ['manager/policies']
            });
        }
    })

    if (!policyTypes.isSuccess || !policyTypes.data) return <div></div>;

    return (
        <div className='p-4'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Maturity Duration</TableHead>
                        <TableHead>Renew Duration</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>%Coverage</TableHead>
                        <TableHead className='flex justify-center items-center'>
                            <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size='sm' className='whitespace-pre'>   New  </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <Form {...policyTypeForm}>
                                            <form
                                                onSubmit={policyTypeForm.handleSubmit((values) => createMutation.mutate({ policyType: values }))}
                                                className='flex flex-col gap-2'
                                            >
                                                <FormField
                                                    control={policyTypeForm.control}
                                                    name='title'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Title</FormLabel>
                                                            <Input {...field} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={policyTypeForm.control}
                                                    name='description'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Description</FormLabel>
                                                            <Textarea {...field} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={policyTypeForm.control}
                                                    name='maturityDuration'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Maturity Duration (Months)</FormLabel>
                                                            <Input {...field} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={policyTypeForm.control}
                                                    name='renewDuration'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Renew Duration (Months)</FormLabel>
                                                            <Input {...field} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={policyTypeForm.control}
                                                    name='coverage'
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>% Coverage</FormLabel>
                                                            <Input {...field} />
                                                        </FormItem>
                                                    )}
                                                />

                                                <DialogClose asChild>
                                                    <Button type='submit' className='mt-6 place-self-center'>Submit</Button>
                                                </DialogClose>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* {sampleData.map(type => ( */}
                    {policyTypes.data.map(type => (
                        <TableRow key={type.policy_type_id}>
                            <TableCell className="font-medium">{type.policy_type_id}</TableCell>
                            <TableCell>{type.maturity_duration}</TableCell>
                            <TableCell>{type.renew_duration}</TableCell>
                            <TableCell>{type.title}</TableCell>
                            <TableCell className='max-w-lg'>{type.description}</TableCell>
                            <TableCell>{type.coverage}%</TableCell>
                            <TableCell className='flex justify-center gap-2'>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size='sm' variant='outline'>
                                            Update
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <Form {...policyTypeForm}>
                                            <form
                                                onSubmit={policyTypeForm.handleSubmit((values) => updateMutation.mutate({
                                                    policyTypeId: type.policy_type_id,
                                                    policyType: values
                                                }))}
                                                className='flex flex-col gap-2'
                                            >
                                                <FormField
                                                    name='Id'
                                                    defaultValue={type.policy_type_id}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Id</FormLabel>
                                                            <Input {...field} disabled />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={policyTypeForm.control}
                                                    name='title'
                                                    defaultValue={type.title}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Title</FormLabel>
                                                            <Input {...field} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={policyTypeForm.control}
                                                    name='description'
                                                    defaultValue={type.description}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Description</FormLabel>
                                                            <Textarea {...field} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={policyTypeForm.control}
                                                    name='maturityDuration'
                                                    defaultValue={type.maturity_duration}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Maturity Duration (Months)</FormLabel>
                                                            <Input {...field} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={policyTypeForm.control}
                                                    name='renewDuration'
                                                    defaultValue={type.renew_duration}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Renew Duration (Months)</FormLabel>
                                                            <Input {...field} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={policyTypeForm.control}
                                                    name='coverage'
                                                    defaultValue={type.coverage}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>% Coverage</FormLabel>
                                                            <Input {...field} />
                                                        </FormItem>
                                                    )}
                                                />

                                                <DialogClose asChild>
                                                    <Button type='submit' className='mt-6 place-self-center'>Submit</Button>
                                                </DialogClose>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>


                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size='sm' variant='destructive'>
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete this policy type.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => deleteMutation.mutate({ policyTypeId: type.policy_type_id })}
                                            >
                                                Confirm
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
