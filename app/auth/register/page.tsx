"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, string, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";


import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link";
import { json } from "stream/consumers";


const FormSchema = z.object({
  cust_email: string().email(),
  cust_fname: string().min(3), //.max(20),
  cust_lname: string(), //.max(20),
  cust_gender: string().min(1), //.max(2),
  cust_address: string().min(3),
  cust_mob_number: number()
    .refine((x) => Number.isFinite(Number(x)), "Invalid number")
    .refine((x) => Number(x) >= 0, "Price should be > 0")
    .transform((x) => Number(x)),
  cust_passport_number: string().min(6),
  cust_marital_status: string().min(1),
  cust_pps_number: number() .refine((x) => Number.isFinite(Number(x)), "Invalid number")
  .refine((x) => Number(x) >= 0, "Price should be > 0")
  .transform((x) => Number(x)),
  cust_password: string().min(6),
});

function InputForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cust_email: "ash6s@gmail.com",
      cust_fname: "dummy",
      cust_lname: "name",
      cust_gender: "M",
      cust_address: "adksfjkajdsfk",
      cust_mob_number: 987654345678,
      cust_passport_number: "88kjdsf",
      cust_marital_status: "U",
      cust_pps_number: 987654348,
      cust_password: "123456",
    },
  });

 async function onSubmits(data: z.infer<typeof FormSchema>) {
  toast({
    title: "Loading...",
    description: "",
    variant: "default",
    
  });
    const response = await fetch('/api/register',{ 
      method: "POST",
      body: JSON.stringify(data)
    });
    console.log(response.status);
    const body = await response.json();
    console.log(body);
    switch(response.status){
      case 201:
        toast({
          title: "Account successfully created",
          description: "Let's Login",
          action: (
            <ToastAction altText="Login">
              <button onClick={() => router.push("/auth/login")}>Login</button>
            </ToastAction>
          ),
        });
        break;
        case 401:
          toast({
            title: "User Already exist",
            description: "Use another Email or Login",
            variant: "destructive",
            action: (
              <ToastAction altText="Login" className=" border-white">
                <button  onClick={() => router.push("/auth/login")}>Login</button>
              </ToastAction>
            ),
          });
          break;
          case 400:
            toast({
              title: "Invalid Form values",
              description: "Please Enter correct details",
              action: (
                <ToastAction altText="Login">
                  <button onClick={() => router.push("/auth/login")}>Login</button>
                </ToastAction>
              ),
            });
            break;
    }

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     98765
    //   ),
    // });
  }
  

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmits)}
          className="h-fit w-fit p-4 py-6 rounded-lg border-2 border-zinc-800 flex flex-wrap max-w-xl justify-between gap-2"
        >
          <FormField
            control={form.control}
            name="cust_fname"
            render={({ field }) => (
              <FormItem className="w-5/12">
                <FormLabel>First Name<span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cust_lname"
            render={({ field }) => (
              <FormItem className="w-5/12">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormDescription>
                   Enter your Last Name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cust_email"
            render={({ field }) => (
              <FormItem className="w-5/12">
                <FormLabel>Email<span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your login ID after registeration
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cust_password"
            render={({ field }) => (
              <FormItem className="w-5/12">
                <FormLabel>Password<span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a strong, easy to remember password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cust_mob_number"
            render={({ field }) => (
              <FormItem className="w-5/12">
                <FormLabel>Mobile number<span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="mobile number" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
         <FormField
          control={form.control}
          name="cust_marital_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marital Status<span className="text-red-400">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="M">Married</SelectItem>
                  <SelectItem value="U">Unmarried</SelectItem>
                  <SelectItem value="D">Divorced</SelectItem>
                  <SelectItem value="W">Widowed</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select your current Marital status
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="cust_gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender<span className="text-red-400">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                  <SelectItem value="O">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select your Gender
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="cust_pps_number"
            render={({ field }) => (
              <FormItem className="w-5/12">
                <FormLabel>Public Personal Phone<span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Public Telephone" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your Public Telephone Number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cust_passport_number"
            render={({ field }) => (
              <FormItem className="w-5/12">
                <FormLabel>Passport<span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="passport" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your Passport number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

const RegisterPage = () => {
  return (
    <div className="">
      <InputForm />
    </div>
  );
};

export default RegisterPage;
