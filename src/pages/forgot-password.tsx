import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ChartCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/store/services/auth";
import { setForgotEmail, setNewPassword } from "@/store/slices/global";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
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
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgot, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "", newPassword: "" },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    const response = await forgot(values.email);

    if (response.data) {
      dispatch(setForgotEmail(values.email));
      dispatch(setNewPassword(values.newPassword));

      void navigate("/reset-password");
      toast.success("Request Sent Successfully, Please Check your Email for the OTP.");
    } else {
      toast.error("Something went wrong, Please try again!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex h-screen w-[90%] flex-col items-center justify-center lg:w-2/3 xl:w-1/2"
      >
        <span className="w-full text-center font-bold text-[32px] leading-[32px] md:text-[48px] md:leading-[48px]">
          Forgot Password?
        </span>
        <span className="mt-2.5 mb-5 w-full text-center text-[#71717A] text-[14px] leading-[14px]">
          No Worries, We'll send you reset instructions.
        </span>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" className="w-full p-5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="mt-5 w-full">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter new password" className="w-full p-5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" size="lg" disabled={isLoading} className="my-10 w-full">
          {isLoading ? <ChartCircle size={20} color="#FFFFFF" className="animate-spin" /> : "Reset Password"}
        </Button>
        <Link
          to="/"
          className="flex items-center justify-center gap-2.5 font-medium text-[#71717A] text-[12px] leading-[16px] underline"
        >
          <ArrowLeft size={16} color="#71717A" />
          Back to Login
        </Link>
      </form>
    </Form>
  );
};

export default ForgotPassword;
