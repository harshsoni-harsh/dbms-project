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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar} from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const fromSchema = z.object({
  registrationNumber: z
    .string({
      invalid_type_error: "Registration Number is Required",
    })
    .regex(
      new RegExp(
        /[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][0-9][0-9][0-9][0-9]/
      ),
      { message: "RegNumber is of Form ABCD-EFGHI-0000" }
    )
    .length(10, {
      message: "Length must be 10",
    }),
  makeVariant: z.string().min(7),
  registrationDate: z.date(),
});

const NewPolicy = () => {
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      registrationNumber: "",
      makeVariant: "",
      registrationDate: new Date(),
    },
  });
  const onSubmit = (value: z.infer<typeof fromSchema>) => {
    console.log(value);
  };
  return (
    <div className="grid justify-content-center place-content-center w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input
                    className="input w-64 sm:w-72 md:w-80"
                    placeholder="descriptive Destroyer"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter Your Vehicle Registration Number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="makeVariant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make Variant</FormLabel>
                <FormControl>
                  <Input
                    className="input w-64 sm:w-72 md:w-80"
                    placeholder="descriptive Destroyer"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter Your Vehicle Variant</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationDate"
            render={({ field }) => {
              return (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}}
          />

          <Button type="submit" className="primary">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default NewPolicy;
