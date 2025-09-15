import dayjs from "dayjs";
import { Lock, LogoutCurve, Notification, User } from "iconsax-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useGetUnreadCommentsQuery } from "@/store/services/ticket";
import { setSelectedTicket } from "@/store/slices/global";
import MaxWidthWrapper from "./max-width-wrapper";
import { Avatar } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import WarningModal from "./warning-modal";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [logout, setLogout] = useState<boolean>(false);
  const { data } = useGetUnreadCommentsQuery({});

  return (
    <>
      <nav className="fixed top-0 z-50 h-16 w-full">
        <MaxWidthWrapper className="flex items-center justify-between border-b bg-white px-5 xl:px-0">
          <div className="flex items-center justify-center gap-5 md:gap-10">
            {navItems.map((item) => (
              <Link
                to={item.link}
                key={item.id}
                className={cn("font-bold text-[16px] leading-[16px]", {
                  "text-primary": pathname === item.link || pathname.startsWith(`${item.link}/`),
                })}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="relative flex size-8 items-center justify-center rounded-full bg-gray-200 hover:bg-white">
                  {data && (
                    <div className="-top-1.5 -right-1.5 absolute flex size-4 items-center justify-center rounded-full bg-primary text-white">
                      <span className="text-[10px] leading-[10px]">
                        {data?.filter((d) => !d.is_read_comment).length}
                      </span>
                    </div>
                  )}
                  <Notification size={20} color="#000000" className="size-5 text-black" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-[400px] w-96 divide-y overflow-y-auto">
                {data?.map((notification, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      dispatch(setSelectedTicket(notification.ticket_id));
                      navigate("/support");
                    }}
                    className="flex w-full items-center justify-center gap-2.5 p-2 hover:bg-muted"
                  >
                    <div className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      {notification.business_name.charAt(0).toUpperCase()}
                      {!notification.is_read_comment && (
                        <div className="absolute top-0.5 right-0.5 size-3 rounded-full bg-green-500" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center gap-1">
                      <span className="w-full text-left text-[16px] leading-[16px]">{notification.message}</span>
                      <span
                        className={cn("w-full text-left font-semibold text-[12px] leading-[12px]", {
                          "text-green-600": notification.dev_agent_status === "DONE",
                          "text-yellow-500": notification.dev_agent_status !== "DONE",
                        })}
                      >
                        {notification.dev_agent_status}
                      </span>
                      <div className="flex w-full items-center justify-center">
                        <span className="w-full text-left text-[12px] leading-[12px]">
                          {notification.business_name}
                        </span>
                        <span className="w-full text-right text-[12px] text-muted-foreground leading-[12px]">
                          {dayjs(notification.created_at).format("DD MMM, YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="flex items-center justify-center bg-gray-200">
                  <User size={20} color="#000000" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/profile" className="flex w-full items-center justify-start gap-2">
                    <User size={20} color="#000000" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/edit-password" className="flex w-full items-center justify-start gap-2">
                    <Lock size={20} color="#000000" />
                    Change Password
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLogout(true)}>
                  <LogoutCurve size={20} color="#000000" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </MaxWidthWrapper>
      </nav>
      <WarningModal
        open={logout}
        title="Are you Sure"
        text={
          <span>
            You want to Logout? <br />
            You can always log back in.
          </span>
        }
        setOpen={setLogout}
        cta={() => navigate("/")}
      />
    </>
  );
};

export default Navbar;
