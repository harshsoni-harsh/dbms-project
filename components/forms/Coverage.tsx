"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroupItem, RadioGroup } from "../ui/radio-group";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";


const coverageDetails = [
  {
    type: "Comprehensive Car Insurance",
    description: "It covers damages to your own vehicle as well as third-party liability. Comprehensive insurance protects against various risks including accidents, theft, vandalism, natural disasters, and other perils."
  },
  {
    type: "Third Party Liability Car Insurance",
    description: "It covers damages and injuries caused to a third party by your vehicle. It includes compensation for bodily injury or death of a third party and damage to their property. However, it does not cover damages to your own vehicle."
  },
  {
    type: "Own Damage Car Insurance",
    description: "This cover provides compensation in case of accidental death or permanent disability of the owner-driver of the insured vehicle. It ensures financial protection for the policyholder and their family in the event of a tragic accident."
  }

]


const fromSchema = z.object({
  coverageAmount: z
    .string()
    .refine((x) => Number.isFinite(Number(x)), "Invalid number")
    .refine((x) => Number(x) > 0, "Price should be > 0")
    .transform((x) => Number(x)),
  coverageType: z.string()
});

/*
COVERAGE_ID // GENERATE
COMPANY_NAME // GENERATE
COVERAGE_AMOUNT // INPUT
COVERAGE_TYPE // INPUT  
COVERAGE_LEVEL // DEPEND ON POLICY TYPE = LEVEL
PRODUCT_ID // 
COVERAGE_DESCRIPTION  // DEPEND ON DETAILS
COVERAGE_TERMS // DEPEND ON DETAILS
*/

const Coverage = () => {


  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      coverageAmount: 1,
      coverageType: ""
    }
  });
  const onSubmit = (value: z.infer<typeof fromSchema>) => {
    console.log(value);
  };
  return (

    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid place-items-center gap-2 space-y-2 p-2" >


        {/* Coverage Type */}
        <FormField
          control={form.control}
          name="coverageType"

          render={({ field }) => (
            <FormItem className="text-center content-center justify-center md:col-span-2 space-y-3">
              <FormLabel className="font-bold text-xl p-1 m-1">Select A Type of Insurance</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid lg:grid-cols-3 grid-cols-1 items-center"
                >
                  {coverageDetails.map((cover) => (
                    <FormItem key={cover.type} className="m-2 w-64">
                      <FormLabel >
                        <Card className={field.value == cover.type ? "m-1 p-2 bg-zinc-500" : "m-1 p-2"}>
                          <CardHeader className="flex flex-row items-center text-center space-x-2">
                            <FormControl className="p-0 m-0">
                              <RadioGroupItem value={cover.type} />
                            </FormControl>
                            <p className="font-bold p-0 m-0">
                              {cover.type}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <p className=" text-wrap">
                              {cover.description}
                            </p>
                          </CardContent>
                        </Card>
                      </FormLabel>
                    </FormItem>
                  ))
                  }
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />





        {/* Price */}
        <FormField
          control={form.control}
          name="coverageAmount"
          render={({ field }) => (
            <FormItem className=" col-span-2">
              <FormLabel>Coverage Amount</FormLabel>
              <FormControl>
                <Input
                  className="input w-64 sm:w-72 md:w-80"
                  placeholder="Input Here"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter The Amount
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="primary md:col-span-2 mt-6 w-max place-self-center">
          Submit
        </Button>
      </form>
    </Form >
  );
};
export default Coverage;
