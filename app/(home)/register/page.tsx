"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
    email: string().email(),
    first_name: string().min(3),
    last_name: string(),
    gender: string().min(1).max(1),
    // cust_address: string().min(3),
    phone_no: string()
        .min(10)
        .max(10)
        .refine((x) => Number.isFinite(Number(x)), "Invalid number")
        .refine((x) => Number(x) >= 0, "Price should be > 0")
        .transform((x) => Number(x)),
    pan_no: string().min(10).max(10),
    password: string().min(6),
});

const SubmitBtn = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            className="min-w-full mt-6 bg-zinc-300"
            type="submit"
        >
            Register
        </Button>
    );
};

export default function RegisterPage() {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "john.doe@example.com",
            first_name: "John",
            last_name: "Doe",
            gender: "M",
            phone_no: undefined,
            pan_no: "ABCD123456",
            password: "123456789",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "Loading...",
            description: "",
            variant: "default",
        });

        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                gender: data.gender,
                // cust_address: string().min(3),
                phone_no: data.phone_no.toString(),
                pan_no: data.pan_no,
                password: data.password,
            }),
        });
        const body = await response.json();
        switch (response.status) {
            case 201:
                toast({
                    title: "Account successfully created",
                    description: "Let's Login",
                    action: (
                        <ToastAction altText="Login">
                            <button onClick={() => router.push("/login")}>
                                Login
                            </button>
                        </ToastAction>
                    ),
                });
                break;
            case 401:
                toast({
                    title: "User Already exists",
                    description: "Use another Email or Login",
                    variant: "destructive",
                    action: (
                        <ToastAction altText="Login" className=" border-white">
                            <button onClick={() => router.push("/login")}>
                                Login
                            </button>
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
                            <button onClick={() => router.push("/login")}>
                                Login
                            </button>
                        </ToastAction>
                    ),
                });
                break;
        }
    }
    const submitForm = async () => {
        await form.handleSubmit(onSubmit)();
    };

    return (
        <div className="flex justify-center items-center w-full p-4 h-full">
            <Form {...form}>
                <form
                    action={submitForm}
                    className="h-fit w-fit p-4 py-6 rounded-lg [&>*]:w-5/12 [&>*]:pb-2 border-2 border-zinc-800 flex flex-wrap max-w-xl justify-between gap-2"
                >
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    First Name
                                    <span className="text-red-400">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="First Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Enter your Last Name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email<span className="text-red-400">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    This will be your login ID after
                                    registeration
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Password
                                    <span className="text-red-400">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Enter a strong, easy to remember password
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_no"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Mobile number
                                    <span className="text-red-400">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="mobile number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Gender
                                    <span className="text-red-400">*</span>
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="M">Male</SelectItem>
                                        <SelectItem value="F">
                                            Female
                                        </SelectItem>
                                        <SelectItem value="O">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription className="text-xs">
                                    Select your Gender
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pan_no"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    PanCard
                                    <span className="text-red-400">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="PAN Number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Enter your PAN number
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitBtn />
                </form>
            </Form>
        </div>
    );
}
