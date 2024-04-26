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
    <div className="flex justify-center items-center w-full h-screen p-2">
      <Form {...form}>
        <form
          action={submitForm}
          className="h-fit w-fit p-4 py-6 rounded-lg border-2 border-zinc-800 flex flex-wrap max-w-xl justify-between gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-5/12">
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
              <FormItem className="w-5/12">
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
    <div className="">
      <InputForm />
    </div>
  );
};

export default logPage;
