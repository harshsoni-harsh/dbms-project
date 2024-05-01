"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type * as Db from "@/types/dbSchema";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { usePolicies } from '@/hooks/customer/usePolicies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  claimAmount: z.coerce.number().int().positive(),
  policyId: z.coerce.number().int().nonnegative(),
  damageType: z.string().max(255).min(1),
  damageDescription: z.string().min(1),
});

const Page = () => {
  const queryClient = useQueryClient();
  const policiesQuery = usePolicies();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      claimAmount: 0,
      policyId: -1,
      damageType: "",
      damageDescription: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async ({ claimData }: { claimData: z.infer<typeof formSchema> }) => {
      toast('Creating');
      const res = await fetch('/api/customer/claim', {
        method: 'PUT',
        body: JSON.stringify(claimData)
      });
      if (!res.ok) throw res.statusText;
      const json = await res.json();
      if ('error' in json) throw json.error;
    },
    onSuccess: () => {
      toast('Success');
      queryClient.invalidateQueries({ queryKey: ['customer/claim'] });
      router.push('/customer/claims');
      
    },
    onError: (e) => toast(`${e}`),
  });

  if (!policiesQuery.isSuccess || !policiesQuery.data) {
    return <></>;
  }

  const policies = policiesQuery.data;

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-center">File A Claim</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(v => createMutation.mutate({ claimData: v }))}>
              <FormField
                control={form.control}
                name="claimAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Claim Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="input w-64 sm:w-72 md:w-80 border-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="policyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Policy Id</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"-1"}
                      >
                        <SelectTrigger className="w-full border-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {policies.map((policy) => (
                            <SelectItem
                              key={policy.policy_id}
                              value={policy.policy_id.toString()}
                            >
                              {policy.policy_id}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="damageType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Damage Type</FormLabel>
                    <FormControl>
                      <Input
                        className="input w-64 sm:w-72 md:w-80 border-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="damageDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Damage Description</FormLabel>
                    <FormControl>
                      <Input
                        className="input w-64 sm:w-72 md:w-80 border-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="primary mt-6 min-w-20 place-self-center"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
