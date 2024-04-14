"use client";
import { getToken } from "next-auth/jwt";

import { signIn } from "next-auth/react";

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
import { useRouter } from "next/navigation";

// import { toast } from "sonner";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: string().email(),
  password: string().min(3),
});

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

  async function onSubmits(data: z.infer<typeof FormSchema>) {
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
      console.log("res: ", res);

      await signIn("credentials", {
        callbackUrl: `/redirect`,
        email: data.email,
        password: data.password,
      });
    } else {
      console.log("res: ", res);
      toast({
        title: "Uh oh! Invalid Credentials.",
        description: "Not Registered?",
        variant: "destructive",
        action: (
          <ToastAction altText="Try again">
            <button onClick={() => router.push("/auth/register")}>Register</button>
          </ToastAction>
        ),
      });

      // toast("Invalid credentials", {
      //   description: "Dont have account?",
      //   action: {
      //     label: "Register",
      //     onClick: () => router.push("/auth/register"),
      //   },
      // })
    }
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
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Login
          </Button>

          <Button
            className="w-full"
            type="button"
            onClick={() => {
              router.push("/auth/register");
            }}
          >
            Register
          </Button>
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
