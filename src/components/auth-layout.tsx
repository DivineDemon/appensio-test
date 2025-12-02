import { Outlet } from "react-router-dom";
import LoginImage from "@/assets/img/login.svg";
import logo from "@/assets/img/logo.svg";

const AuthLayout = () => {
  return (
    <div className="grid h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="col-span-1 hidden h-full w-full md:flex">
        <img
          src={LoginImage}
          alt="login-image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="col-span-1 flex h-screen w-full flex-col items-center justify-center">
        <img src={logo} alt="logo" className="mx-auto mb-5 w-24" />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;