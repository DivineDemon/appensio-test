import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Lock from "@/assets/icons/lock.svg";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/store/services/auth";

const passwordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])/, {
        message: "Password must contain a lowercase letter",
      })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain an uppercase letter",
      })
      .regex(/^(?=.*\d)/, { message: "Password must contain a number" })
      .regex(/^(?=.*[^A-Za-z0-9])/, {
        message: "Password must contain a special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const EditPasswordForm = () => {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    const response = await resetPassword({
      current_password: values.currentPassword,
      new_password: values.newPassword,
    });

    if ("data" in response) {
      toast.success("Updated Password Successfully!");
    } else {
      toast.error("Failed to Update Password");
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full flex-col items-start justify-start md:overflow-hidden">
      <span className="w-full text-left font-bold text-[32px] leading-[32px] md:text-[36px] md:leading-[36px]">
        Manage Password
      </span>
      <div className="mt-14 mb-5 flex w-full items-center justify-center gap-5 border-[#D9D9D9] border-b pb-5">
        <img src={Lock} alt="lock-icon" className="size-5" />
        <span className="flex-1 text-left font-bold text-[24px] leading-[24px]">Password Set-up</span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="col-span-1 flex w-full items-center justify-center gap-2 rounded-md bg-[#F4F4F5] p-2.5">
                <img src={Lock} alt="lock-icon" className="size-5" />
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Current Password"
                    className="flex-1 border-none text-left font-semibold text-base shadow-none placeholder:text-base placeholder:text-black focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="col-span-1 flex w-full items-center justify-center gap-2 rounded-md bg-[#F4F4F5] p-2.5">
                <img src={Lock} alt="lock-icon" className="size-5" />
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="New Password"
                    className="flex-1 border-none text-left font-semibold text-base shadow-none placeholder:text-base placeholder:text-black focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="col-span-1 flex w-full items-center justify-center gap-2 rounded-md bg-[#F4F4F5] p-2.5">
                <img src={Lock} alt="lock-icon" className="size-5" />
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm Password"
                    className="flex-1 border-none text-left font-semibold text-base shadow-none placeholder:text-base placeholder:text-black focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 mt-5 flex justify-end">
            <Button disabled={isLoading} type="submit">
              {isLoading ? <ChartCircle size={20} color="#FFFFFF" className="animate-spin" /> : "Update Password"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditPasswordForm;
