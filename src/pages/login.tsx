import { ChartCircle } from "iconsax-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/services/auth";
import { setForgotEmail } from "@/store/slices/global";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [login, { isLoading }] = useLoginMutation();
  const [password, setPassword] = useState<string>("");
  const allowedEmails = ["digimark.dev1@gmail.com", "testagent@scintia.ai"];

  const handleLogin = async () => {
    // if (email !== "digimark.dev1@gmail.com") {
    //   toast.error("Please use the Testing Account to Login!");
    //   return;
    // }

    if (!allowedEmails.includes(email)) {
      toast.error("Please use the Testing Account to Login!");
      return;
    }

    const response = await login({
      email,
      password,
      role: "test",
    });

    if (response.data) {
      dispatch(setForgotEmail(email));
      toast.success("Please Verify OTP to Proceed!");
      void navigate("/verify-otp");
    } else {
      toast.error("Something went wrong, Please try again!");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleLogin();
      }}
      className="mx-auto flex h-screen w-[90%] flex-col items-center justify-center lg:w-2/3 xl:w-1/2"
    >
      <span className="mt-auto w-full text-center font-bold text-[32px] leading-[32px] md:text-[48px] md:leading-[48px]">
        Login to your Account
      </span>
      <span className="mt-2.5 mb-5 w-full text-center text-[#71717A] text-[14px] leading-[14px]">
        Enter your email below to create your account
      </span>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-5 mb-2.5 w-full p-5"
        placeholder="Enter your email"
        required={true}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-5"
        placeholder="Enter your password"
        required={true}
      />
      <Link
        to="/forgot-password"
        className="mt-2.5 mb-10 w-full text-right font-medium text-[12px] text-primary leading-[12px]"
      >
        Forgot Password?
      </Link>
      <Button
        disabled={isLoading}
        className="mb-10 w-full"
        variant="default"
        size="lg"
        type="submit"
      >
        {isLoading ? (
          <ChartCircle size={20} color="#FFFFFF" className="animate-spin" />
        ) : (
          "Sign In with Email"
        )}
      </Button>
      <span className="mt-2.5 mb-10 w-full text-center font-medium text-[#71717A] text-[12px] leading-[16px]">
        By clicking continue, you agree to our&nbsp;
        <Link to="/terms-of-service" className="underline">
          Terms
          <br />
          of Service
        </Link>
        &nbsp; and&nbsp;
        <Link to="/privacy-policy" className="underline">
          Privacy Policy
        </Link>
        .
      </span>
      <span className="mt-auto mb-10 w-full text-center font-medium text-[12px] text-primary leading-[16px]">
        <Link to="/legal-notice" className="underline">
          Legal Notice
        </Link>
        &nbsp;•&nbsp;
        <Link to="/terms-and-conditions" className="underline">
          Terms and Conditions
        </Link>
        .
      </span>
    </form>
  );
};

export default Login;
