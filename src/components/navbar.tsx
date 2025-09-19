import dayjs from "dayjs";
import {
  Briefcase,
  ChartCircle,
  Lock,
  LogoutCurve,
  Notification,
  TickCircle,
  Ticket,
  User,
  Warning2,
} from "iconsax-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  useGetUnreadBusinessNotficationsQuery,
  useGetUnreadTicketNotficationsQuery,
  useMarkAllBusinessNotificationsAsReadMutation,
  useMarkBusinessNotificationAsReadMutation,
} from "@/store/services/notification";
import { setSelectedTicket } from "@/store/slices/global";
import MaxWidthWrapper from "./max-width-wrapper";
import { Avatar } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import WarningModal from "./warning-modal";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [logout, setLogout] = useState<boolean>(false);
  const { data: ticketNotifications } = useGetUnreadTicketNotficationsQuery({});
  const { data: businessNotifications } = useGetUnreadBusinessNotficationsQuery({});
  const [readBusinessNotification, { isLoading: reading }] = useMarkBusinessNotificationAsReadMutation();
  const [readAllBusinessNotifications, { isLoading: allReading }] = useMarkAllBusinessNotificationsAsReadMutation();

  const handleReadBusinessNotification = async (id: string) => {
    const response = await readBusinessNotification(id);

    if (response.data) {
      toast.success("Notification Read Successfully!");
    } else {
      toast.error("Failed to Read Notification!");
    }
  };

  const handleReadAllBusinessNotifications = async () => {
    const response = await readAllBusinessNotifications({});

    if (response.data) {
      toast.success("All Notifications Read Successfully!");
    } else {
      toast.error("Failed to Read All Notifications!");
    }
  };

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
          <div className="flex w-full items-center justify-end gap-2.5">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="relative flex size-8 items-center justify-center rounded-full bg-gray-200 hover:bg-white">
                  {ticketNotifications &&
                    businessNotifications &&
                    (ticketNotifications?.length > 0 || businessNotifications?.length > 0) && (
                      <div className="-top-1.5 -right-1.5 absolute flex size-4 items-center justify-center rounded-full bg-primary text-white">
                        <span className="text-[10px] leading-[10px]">
                          {ticketNotifications?.length + businessNotifications?.length}
                        </span>
                      </div>
                    )}
                  <Notification size={20} color="#000000" className="size-5 text-black" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-[400px] w-96 divide-y overflow-y-auto p-0">
                <DropdownMenuLabel>Ticket Notifications</DropdownMenuLabel>
                {!ticketNotifications || ticketNotifications?.length === 0 ? (
                  <div className="flex w-full flex-col items-center justify-center gap-2.5 py-5 text-center text-muted-foreground text-xs">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted p-2">
                      <Warning2 size={20} color="#71717A" className="size-full" />
                    </div>
                    <span className="w-full text-center font-medium text-[14px] leading-[14px]">No Notifications.</span>
                  </div>
                ) : (
                  ticketNotifications?.map((notification, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        dispatch(setSelectedTicket(notification.ticket_id));
                        navigate("/support");
                      }}
                      className="flex w-full cursor-pointer items-center justify-center gap-2.5 p-2 hover:bg-muted"
                    >
                      <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Ticket size={20} color="#FFFFFF" />
                      </div>
                      <div className="flex flex-1 flex-col items-center justify-center gap-1">
                        <span className="w-full text-left text-[16px] leading-[16px]">{notification.content}</span>
                        <div className="flex w-full items-center justify-center">
                          <span className="w-full text-left text-[12px] leading-[12px]">
                            Ticket Status:&nbsp;
                            <span
                              className={cn("font-semibold uppercase", {
                                "text-red-600": notification.status === "open",
                                "text-yellow-500": notification.status === "in_progress",
                                "text-green-600": notification.status === "resolved",
                              })}
                            >
                              {notification.status}
                            </span>
                          </span>
                          <span className="w-full text-right text-[12px] text-muted-foreground leading-[12px]">
                            {dayjs(notification.created_at).format("DD MMM, YYYY")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <DropdownMenuLabel>
                  <div className="flex w-full items-center justify-center">
                    <span className="w-full text-left">Business Notifications</span>
                    {businessNotifications && businessNotifications?.length > 0 && (
                      <div
                        className="flex w-full cursor-pointer items-center justify-end gap-1.5"
                        onClick={handleReadAllBusinessNotifications}
                      >
                        {allReading ? (
                          <ChartCircle size={16} color="#000000" className="animate-spin" />
                        ) : (
                          <TickCircle size={16} color="#000000" />
                        )}
                        Mark all as read
                      </div>
                    )}
                  </div>
                </DropdownMenuLabel>
                {!businessNotifications || businessNotifications?.length === 0 ? (
                  <div className="flex w-full flex-col items-center justify-center gap-2.5 py-5 text-center text-muted-foreground text-xs">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted p-2">
                      <Warning2 size={20} color="#71717A" className="size-full" />
                    </div>
                    <span className="w-full text-center font-medium text-[14px] leading-[14px]">No Notifications.</span>
                  </div>
                ) : (
                  businessNotifications?.map((notification, idx) => (
                    <div key={idx} className="flex w-full items-center justify-center gap-2.5 p-2 hover:bg-muted">
                      <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Briefcase size={20} color="#FFFFFF" />
                      </div>
                      <div className="flex flex-1 flex-col items-center justify-center gap-1">
                        <div className="flex w-full items-center justify-center">
                          <span className="w-full text-left text-[16px] leading-[16px]">
                            {notification.business_name}
                          </span>
                          <div
                            className="flex w-full cursor-pointer items-center justify-end gap-1.5 text-[12px] leading-[12px]"
                            onClick={() => handleReadBusinessNotification(notification.n_id)}
                          >
                            {reading ? (
                              <ChartCircle size={16} color="#000000" className="animate-spin" />
                            ) : (
                              <TickCircle size={16} color="#000000" />
                            )}
                            Mark as read
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-center">
                          <span className="w-full text-left font-medium text-[12px] text-green-500 capitalize leading-[12px]">
                            {notification.content.split("_").join(" ")}
                          </span>
                          <span className="w-full text-right text-[12px] text-muted-foreground leading-[12px]">
                            {dayjs(notification.created_at).format("DD MMM, YYYY")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
