"use client";

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
import { Input } from "@/components/ui/input";
import { VehicleSchema } from "@/lib/utils/form-schema/vehicle";
import { PolicyForm } from "@/types/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const currentYear = (new Date()).getFullYear();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

type VehicleProps = {
  next: () => void,
  formData: PolicyForm,
  setFormData: React.Dispatch<React.SetStateAction<PolicyForm>>
};

const Vehicle = ({ next, formData, setFormData } : VehicleProps) => {

  const form = useForm<VehicleSchema>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      vehicle_number: formData.vehicle_number,
      vehicle_type: formData.vehicle_type,
      vehicle_make: formData.vehicle_make,
      vehicle_manufacturer: formData.vehicle_manufacturer,
      vehicle_price: formData.vehicle_price,
      registration_year: formData.registration_year,
      registration_month: formData.registration_month,
    },
    mode: "onSubmit",
  });

  const years: number[] = [];
  for (let i = 2000; i <= currentYear; i++)
      years.push(i);
  
  const onSubmit = (values: VehicleSchema) => {
    setFormData(formData => {return {
      ...formData,
      ...values,
    }});
    next();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 p-2 w-full">
          {/* Registration Number */}
          <FormField
            control={form.control}
            name="vehicle_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Number</FormLabel>
                <FormControl>
                  <Input
                    className="input w-64 sm:w-72 md:w-80"
                    placeholder="Vehicle Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Vehicle Type */}
          <FormField
            control={form.control}
            name="vehicle_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <FormControl>
                  <Input
                    className="input w-64 sm:w-72 md:w-80"
                    placeholder="Vehicle Type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Vehicle Make */}
          <FormField
            control={form.control}
            name="vehicle_make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Make</FormLabel>
                <FormControl>
                  <Input
                    className="input w-64 sm:w-72 md:w-80"
                    placeholder="Vehicle Make"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Vehicle Manufacturer */}
          <FormField
            control={form.control}
            name="vehicle_manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Manufacturer</FormLabel>
                <FormControl>
                  <Input
                    className="input w-64 sm:w-72 md:w-80"
                    placeholder="Vehicle Manufacturer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Vehicle Price */}
          <FormField
            control={form.control}
            name="vehicle_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Price</FormLabel>
                <FormControl>
                  <Input
                    className="input w-64 sm:w-72 md:w-80 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]"
                    type="number"
                    placeholder="Vehicle Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <div className="flex flex-col gap-1">
            {/* Registration Year */}
            <FormField
              control={form.control}
              name="registration_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Year</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Registration Year" />
                      </SelectTrigger>
                    </FormControl>
                      <SelectContent>
                         {
                            years.map(year => 
                              <SelectItem value={year.toString()} key={year}>
                                { year }
                              </SelectItem>
                            )
                          }
                      </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Registration Month */}
            <FormField
              control={form.control}
              name="registration_month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Month</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Registration Month" />
                      </SelectTrigger>
                    </FormControl>
                      <SelectContent>
                         {
                            months.map((month, idx) => 
                              <SelectItem value={(idx + 1).toString()} key={idx}>
                                { month }
                              </SelectItem>
                            )
                          }
                      </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-center lg:justify-end lg:mx-2">
          <Button
            type="submit"
            className="primary w-48 lg:w-auto mt-6 min-w-20"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default Vehicle;
