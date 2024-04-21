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
import { Input } from "../ui/input";
import { DatePicker } from "../DatePicker";
import { useCallback, useEffect, useState } from "react";
import { Label } from "../ui/label";

const formSchema = z.object({
  cardNumber: z.string().length(16, { message: "Length must be 16" }),
  expiryDate: z.optional(z.date()),
  cvv: z.string().length(3, { message: "Length must be 3" }),
  cardHolderName: z.string(),
  billingAddress: z.string(),
});

const Payment = ({
  id,
  onSub,
}: {
  id: string;
  onSub: (isValid: boolean) => void;
}) => {
  const [date, setDate] = useState<Date>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: new Date(),
      cvv: "",
      cardHolderName: "",
      billingAddress: "",
    },
  });

  const setDateHelper = useCallback(
    (date: Date | undefined) => {
      form.setValue("expiryDate", date);
      setDate(form.getValues().expiryDate);
    },
    [form]
  );

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
  };

  useEffect(() => {
    onSub(form.formState.isValid);
  }, [form.formState.isValid, onSub]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Card Holder's Name */}
        <FormField
          control={form.control}
          name="cardHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Holder Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Card Number */}
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CVV */}
        <FormField
          control={form.control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expiry Date */}
        <div className="flex flex-col gap-4">
          <Label>Expiry Date</Label>
          <DatePicker date={date} setDate={setDateHelper} />
        </div>

        {/* Billing Address */}
        <FormField
          control={form.control}
          name="billingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button className="hidden" id={id} type="submit">
          Submit2
        </button>
      </form>
    </Form>
  );
};

export default Payment;
