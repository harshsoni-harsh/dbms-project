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

const formSchema = z.object({
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
  price: z
    .string()
    .refine((x) => Number.isFinite(Number(x)), "Invalid number")
    .refine((x) => Number(x) > 0, "Price should be > 0")
    .transform((x) => Number(x)),
  numberOfSeat: z
    .string()
    .refine((x) => Number.isFinite(Number(x)), "Invalid number")
    .refine((x) => Number(x) > 0, "Price should be > 0")
    .transform((x) => Number(x)),
  manufacturer: z.string(),
  vehicleNumber: z.string().length(17),
  engineNumber: z.string(),
  chasisNumber: z.string(),
  modelNumber: z.string(),
});

interface Props {
  onClick: () => void;
}

/*
VEHICLE_NUMBER = GET INPUT
VEHICLE_REGISTRATION_NUMBER = GET INPUT //
VEHICLE_VALUE = GET INPUT 
VEHICLE_NUMBER_OF_SEAT = GET INPUT
VEHICLE_MANUFACTURER = GET INPUT
VEHICLE_ENGINE_NUMBER = GET INPUT
VEHICLE_CHASIS_NUMBER = GET INPUT
VEHICLE_MODEL_NUMBER = GET INPUT
*/
const Vehicle = ({ onClick }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registrationNumber: "",
      numberOfSeat: 2,
      price: 1,
      modelNumber: "",
      manufacturer: "",
      vehicleNumber: "",
      engineNumber: "",
      chasisNumber: "",
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(1);
    console.log(value);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 p-2"
      >
        {/* Registration Number */}
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

        {/* Model Number */}
        <FormField
          control={form.control}
          name="modelNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Make Variant</FormLabel>
              <FormControl>
                <Input
                  className="input w-64 sm:w-72 md:w-80"
                  placeholder="Enter The data"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter Your Vehicle Model Number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  className="input w-64 sm:w-72 md:w-80"
                  placeholder="Input Here"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter The Price</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Number Of Seat */}
        <FormField
          control={form.control}
          name="numberOfSeat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number Of Seats</FormLabel>
              <FormControl>
                <Input
                  className="input w-64 sm:w-72 md:w-80"
                  placeholder="descriptive Destroyer"
                  {...field}
                />
              </FormControl>
              <FormDescription>Number Of Seats in Your Vehicle</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VEHICLE_MANUFACTURER */}
        <FormField
          control={form.control}
          name="manufacturer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Manucfacturer</FormLabel>
              <FormControl>
                <Input
                  className="input w-64 sm:w-72 md:w-80"
                  placeholder="descriptive Destroyer"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter Your Vehicle Manufacturer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* vehicleNumber */}
        <FormField
          control={form.control}
          name="vehicleNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Number</FormLabel>
              <FormControl>
                <Input
                  className="input w-64 sm:w-72 md:w-80"
                  placeholder="descriptive Destroyer"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter VIN</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Chasis Number */}
        <FormField
          control={form.control}
          name="chasisNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chasis Number</FormLabel>
              <FormControl>
                <Input
                  className="input w-64 sm:w-72 md:w-80"
                  placeholder="descriptive Destroyer"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter Your Chasis Number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Engine Number */}
        <FormField
          control={form.control}
          name="engineNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engine Number</FormLabel>
              <FormControl>
                <Input
                  className="input w-64 sm:w-72 md:w-80"
                  placeholder="descriptive Destroyer"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter Your Engine Number</FormDescription>
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
        <Button
          onClick={onClick}
          className="primary mt-6 min-w-20 place-self-center"
        >
          Next
        </Button>
      </form>
    </Form>
  );
};
export default Vehicle;

/*
VEHICLE_ID = GENERATE
CUST_ID = GET FROM CUSTOMER
POLICY_ID = DEPENDS ON POLICY CHOSEN
DEPENDENT_NOK_ID = FROM CUTOMER
VEHICLE_TYPE = (CAR)
VEHICLE_SIZE =  ---DEPENDS



VEHICLE_REGISTRATION_NUMBER = GET INPUT //
VEHICLE_VALUE = GET INPUT 
VEHICLE_NUMBER_OF_SEAT = GET INPUT
VEHICLE_MANUFACTURER = GET INPUT
VEHICLE_ENGINE_NUMBER = GET INPUT
VEHICLE_CHASIS_NUMBER = GET INPUT
VEHICLE_MODEL_NUMBER = GET INPUT
*/
