'use client';

import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePolicies } from '@/hooks/customer/usePolicies';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PremiumPage() {
    const queryClient = useQueryClient();
    const policies = usePolicies();
    const [policyId, setPolicyId] = useState<string | undefined>();
    const [date, setDate] = useState<Date | undefined>();
    const router = useRouter();

    if (!policies.isSuccess || !policies.data) return <></>;

    const policy = policies.data.find(p => p.policy_id === parseInt(policyId!));

    const pay = async () => {
        if (!policy) return;

        try {
            toast('Processing Payment');
            const res = await fetch('/api/customer/receipt', {
                method: 'PUT',
                body: JSON.stringify({
                    policyId: policyId,
                    amount: policy.premium_amount,
                    txnId: Math.floor(Math.random() * 1e8)
                })
            })
            if(!res.ok) throw res.statusText;
            const json = res.json();
            if('error' in json) throw json.error;

            toast('Success');
            router.push('/customer/view-receipts');
        } catch (err) {
            toast('Something went wrong');
        }
    }

    return (
        <div className='w-full h-full p-4 flex flex-col items-center justify-center gap-4'>
            <div>Select Policy</div>
            <Select onValueChange={setPolicyId}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {policies.data.map((policy) => (
                        <SelectItem key={policy.policy_id} value={policy.policy_id.toString()}>
                            {policy.policy_id}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className='flex flex-row items-center gap-4'>
                <Card className='h-full'>
                    <CardContent className='grid grid-cols-2 gap-x-4 p-6'>
                        <div className='font-bold text-right'>Id:</div> <div>{policy && policy.policy_id}</div>
                        <div className='font-bold text-right'>Policy Type:</div> <div>{policy && policy.policy_type_id}</div>
                        <div className='font-bold text-right'>Premium amount:</div> <div>{policy && policy.premium_amount}</div>
                        <div className='font-bold text-right'>Registration user:</div> <div>{policy && policy.registration_year}</div>
                        <div className='font-bold text-right'>Registration month</div> <div>{policy && policy.registration_month}</div>
                        <div className='font-bold text-right'>Status:</div> <div>{policy && policy.status}</div>
                        <div className='font-bold text-right'>Vehicle Manufacturer:</div> <div>{policy && policy.vehicle_manufacturer}</div>
                        <div className='font-bold text-right'>Vehicle Make:</div> <div>{policy && policy.vehicle_make}</div>
                        <div className='font-bold text-right'>Vehicle number:</div> <div>{policy && policy.vehicle_number}</div>
                        <div className='font-bold text-right'>Vehicle Price:</div> <div>{policy && policy.vehicle_price}</div>
                        <div className='font-bold text-right'>Vehicle type:</div> <div>{policy && policy.vehicle_type}</div>
                    </CardContent>
                </Card>
                <div className='flex flex-col items-center gap-4'>
                    <Card className='flex flex-col gap-4 p-6'>
                        <Input placeholder='Card Number' />
                        <Input placeholder='Card Holder Name' />
                        <Input placeholder='CVV' />
                        <Input placeholder='Billing Address' />
                        <div className='flex flex-col gap-2'>
                            <div>Expiration Date</div>
                            <DatePicker date={date} setDate={setDate} />
                        </div>

                        <Button onClick={pay}>Pay</Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
