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
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  claimAmount: z.coerce.number().int().positive(),
  policyId: z.coerce.number().int(),
  damageType: z.string().max(255).min(1),
  damageDescription: z.string().min(1),
});

const policies: Db.Policy[] = [
  {
    policy_id: 1,
    customer_id: 1,
    policy_type_id: 1,
    vehicle_manufacturer: "Honda",
    vehicle_type: "Sedan",
    vehicle_make: "City",
    registration_year: 2023,
    registration_month: 1,
    vehicle_number: "DL1234",
    vehicle_price: 500000,
    premium_amount: 25000,
    status: "active",
  },
  {
    policy_id: 2,
    customer_id: 2,
    policy_type_id: 2,
    vehicle_manufacturer: "Toyota",
    vehicle_type: "SUV",
    vehicle_make: "Fortuner",
    registration_year: 2022,
    registration_month: 5,
    vehicle_number: "MH4567",
    vehicle_price: 1200000,
    premium_amount: 48000,
    status: "pending",
  },
  {
    policy_id: 3,
    customer_id: 3,
    policy_type_id: 1,
    vehicle_manufacturer: "Hyundai",
    vehicle_type: "Hatchback",
    vehicle_make: "Creta",
    registration_year: 2021,
    registration_month: 9,
    vehicle_number: "KA8901",
    vehicle_price: 700000,
    premium_amount: 35000,
    status: "active",
  },
  {
    policy_id: 4,
    customer_id: 4,
    policy_type_id: 2,
    vehicle_manufacturer: "Maruti Suzuki",
    vehicle_type: "MUV",
    vehicle_make: "Swift",
    registration_year: 2023,
    registration_month: 12,
    vehicle_number: "TN2345",
    vehicle_price: 400000,
    premium_amount: 20000,
    status: "expired",
  },
  {
    policy_id: 5,
    customer_id: 5,
    policy_type_id: 1,
    vehicle_manufacturer: "Tata",
    vehicle_type: "Sedan",
    vehicle_make: "Nexon",
    registration_year: 2022,
    registration_month: 4,
    vehicle_number: "AP6789",
    vehicle_price: 600000,
    premium_amount: 30000,
    status: "active",
  },
];

const makeClaimRequest = (...args: any) =>
  new Promise((r) => setTimeout(r, 2000));

const Page = () => {
  const loading = false;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      claimAmount: 0,
      policyId: policies[0]?.policy_id,
      damageType: "",
      damageDescription: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    toast("Creating");
    await makeClaimRequest(form.getValues());
    toast("Success");
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-72 w-96 rounded-xl" />
          <Skeleton className="h-32 w-72" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-center">File A Claim</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
                          defaultValue={policies[0]?.policy_id.toString()}
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
  }
};

export default Page;
