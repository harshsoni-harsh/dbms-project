"use client";
import { getToken } from "next-auth/jwt";

import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

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
import { useRouter } from "next/navigation";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: string().email(),
  password: string().min(3),
});

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="w-full mt-6 bg-zinc-300"
      type="submit"
    >
      Login
    </Button>
  );
};

function InputForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Loading...",
      description: "",
      variant: "default",
    });

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.ok) {
      await signIn("credentials", {
        callbackUrl: `/redirect`,
        email: data.email,
        password: data.password,
      });
    } else {
      toast({
        title: "Uh oh! Invalid Credentials.",
        description: "Not Registered?",
        variant: "destructive",
        action: (
          <ToastAction altText="Try again">
            <button onClick={() => router.push("/register")}>Register</button>
          </ToastAction>
        ),
      });
    }
  }
  const submitForm = async () => {
    await form.handleSubmit(onSubmit)();
  };

  return (
    <div className="w-full flex justify-center max-w-sm">
      <Form {...form}>
        <form
          action={submitForm}
          className="h-fit w-full p-4 py-6 rounded-lg border-2 border-zinc-800 max-w-3xl flex flex-col justify-between gap-4"
        >
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
                <FormDescription>Enter your registered Email</FormDescription>
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
                  Password<span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
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

const logPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-4 gap-6">
      <p className="font-bold text-xl md:hidden text-center">Login Form</p>
      <InputForm />
    </div>
  );
};

export default logPage;
