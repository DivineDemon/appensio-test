import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { ChartCircle, Lock, LogoutCurve, Notification, User, Warning2 } from "iconsax-react";
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
  useMarkAllTicketNotificationsAsReadMutation,
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
  const { data: ticketNotifications } = useGetUnreadTicketNotficationsQuery(
    {},
    {
      pollingInterval: 10000,
    },
  );
  const { data: businessNotifications } = useGetUnreadBusinessNotficationsQuery(
    {},
    {
      pollingInterval: 10000,
    },
  );
  const [readAllBusinessNotifications, { isLoading: allReading }] = useMarkAllBusinessNotificationsAsReadMutation();
  const [readAllTicketNotifications, { isLoading: allTicketsReading }] = useMarkAllTicketNotificationsAsReadMutation();

  const allTickets = () => {
    const tickets: MixTickets[] = [];

    if (ticketNotifications && ticketNotifications.length > 0) {
      ticketNotifications.map((ticket) => {
        tickets.push(ticket);
      });
    }

    if (businessNotifications && businessNotifications.length > 0) {
      businessNotifications.map((business) => {
        tickets.push({
          ticket_id: "",
          source_panel: "",
          n_id: business.n_id,
          is_read: business.is_read,
          created_at: business.created_at,
          status: business.dev_agent_status,
          business_name: business.business_name,
        });
      });
    }

    return tickets;
  };

  const handleReadAllNotifications = async () => {
    const ticketsResponse = await readAllTicketNotifications({});
    const businessResponse = await readAllBusinessNotifications({});

    if (ticketsResponse.data && businessResponse.data) {
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
                  {allTickets()?.length > 0 && (
                    <div className="-top-1.5 -right-1.5 absolute flex size-4 items-center justify-center rounded-full bg-primary text-white">
                      <span className="text-[10px] leading-[10px]">
                        {allTickets()?.filter((t) => !t.is_read)?.length}
                      </span>
                    </div>
                  )}
                  <Notification size={20} color="#000000" className="size-5 text-black" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-[400px] w-96 divide-y overflow-y-auto p-0">
                <DropdownMenuLabel className="p-0">
                  <div className="flex w-full items-center justify-center p-2.5">
                    <span className="w-full text-left">Notifications</span>
                    <span
                      onClick={handleReadAllNotifications}
                      className="w-full cursor-pointer text-right font-normal text-muted-foreground"
                    >
                      {allReading || allTicketsReading ? (
                        <ChartCircle size={16} color="#71717A" className="ml-auto animate-spin text-muted-foreground" />
                      ) : (
                        "Mark all as Read"
                      )}
                    </span>
                  </div>
                </DropdownMenuLabel>
                {allTickets()?.length > 0 ? (
                  allTickets()?.map((notification, idx) => (
                    <div
                      className={cn("flex w-full cursor-pointer items-center justify-center gap-2.5 border-b p-2.5", {
                        "bg-sky-500/10": !notification.is_read,
                      })}
                      key={idx}
                      onClick={() => {
                        if (notification.ticket_id || notification.ticket_id !== "") {
                          dispatch(setSelectedTicket(notification.ticket_id));
                          navigate("/support");
                        }
                      }}
                    >
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary">
                        <div className="flex w-full items-center justify-center text-white">
                          {notification.business_name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col items-center justify-center gap-1.5">
                        <span className="w-full text-left font-medium text-[16px] leading-[16px]">
                          {notification.business_name}
                        </span>
                        <div className="flex w-full items-center justify-center gap-2.5">
                          <span
                            className={cn("flex-1 text-left font-medium text-[14px] leading-[14px]", {
                              " text-red-500": notification.status === "open",
                              " text-green-500": notification.status === "resolved",
                              " text-yellow-500":
                                notification.status === "in progress" || notification.status === "TESTING_IN_PROGRESS",
                            })}
                          >
                            <span className="text-[#A4A4A4]">
                              {notification.ticket_id ? "Ticket Status:" : "Agent Status:"}
                              &nbsp;
                            </span>
                            <span className="capitalize">
                              {notification.status === "TESTING_IN_PROGRESS"
                                ? "Testing In Progress"
                                : notification.status}
                            </span>
                          </span>
                          <span className="text-[12px] text-muted-foreground leading-[12px]">
                            {dayjs(notification.created_at).fromNow()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <DropdownMenuItem className="flex w-full flex-col items-center justify-center gap-2.5 py-5 text-center text-muted-foreground text-xs">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted p-2">
                      <Warning2 size={20} color="#71717A" className="size-full" />
                    </div>
                    <span className="w-full text-center font-medium text-[14px] leading-[14px]">No Notifications.</span>
                  </DropdownMenuItem>
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
