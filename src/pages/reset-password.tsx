import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ChartCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import type { RootState } from "@/store";
import { useForgotPasswordMutation, useVerifyOTPMutation } from "@/store/services/auth";

const resetPasswordSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits." })
    .regex(/^[0-9]+$/, { message: "OTP must contain only numbers." }),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const [verify, { isLoading: verifying }] = useVerifyOTPMutation();
  const [forgot, { isLoading: resending }] = useForgotPasswordMutation();
  const { forgotEmail, newPassword } = useSelector((state: RootState) => state.global);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    const response = await verify({
      otp: values.otp,
      email: forgotEmail,
      new_password: newPassword,
    });

    if (response.data) {
      void navigate("/");
      toast.success("Password Reset Successfully, Please Login again to Continue.");
    } else {
      toast.error("Something went wrong, please try again!");
    }
  };

  const resendOTP = async () => {
    const response = await forgot(forgotEmail);

    if (response.data) {
      toast.success("Resent the OTP, please check your email.");
    } else {
      toast.error("Something went wrong, please try again!");
    }
  };

  return (
    <Form {...form}>
      <form
        className="mx-auto flex w-[90%] flex-col items-center justify-center lg:w-2/3 xl:w-1/2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <span className="w-full text-center font-bold text-[32px] leading-[32px] md:text-[48px] md:leading-[48px]">
          Password Reset
        </span>
        <span className="mt-5 mb-10 w-full text-center text-[#71717A] text-[14px] leading-[14px]">
          We sent a code to&nbsp;{forgotEmail}
        </span>

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter OTP</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" size="lg" disabled={verifying || resending} className="mt-10 w-full">
          {verifying ? <ChartCircle size={20} color="#FFFFFF" className="animate-spin" /> : "Continue"}
        </Button>
        <div className="mt-5 mb-10 flex w-full items-center justify-center gap-2 text-center text-[#71717A] text-[12px] leading-[12px]">
          Didn't receive the email?&nbsp;
          <button
            type="button"
            disabled={verifying || resending}
            className="text-primary underline"
            onClick={resendOTP}
          >
            {resending ? <ChartCircle size={14} color="#000000" className="animate-spin" /> : "Click to resend"}
          </button>
        </div>
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

export default ResetPassword;
