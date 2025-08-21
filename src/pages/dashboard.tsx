import dayjs from "dayjs";
import { ChartCircle } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import CallVolumeGraph from "@/components/call-volume-graph";
import UpdateProfileForm from "@/components/dashboard/update-profile-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UsageGraph from "@/components/usage-graph";
import { formatDashboardStats } from "@/lib/utils";
import { RootState } from "@/store";
import { useGetProfileQuery } from "@/store/services/profile";
import { useDashboardStatsQuery } from "@/store/services/stats";
import { setEndDate, setStartDate } from "@/store/slices/global";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { start_date, end_date } = useSelector((state: RootState) => state.global);

  const { data, isLoading } = useDashboardStatsQuery(
    {
      start_date: dayjs(start_date).format("YYYY-MM-DD"),
      end_date: dayjs(end_date).format("YYYY-MM-DD"),
    },
    {
      skip: !start_date || !end_date,
      refetchOnMountOrArgChange: true,
    },
  );

  const { data: profile, isLoading: profiling } = useGetProfileQuery({});

  return (
    <>
      {profiling ? (
        <div className="fixed inset-0 z-[51] flex h-screen w-full flex-col items-center justify-center gap-5 overflow-hidden bg-black/20 backdrop-blur-sm">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        (!profile?.first_name || profile.first_name === "") && (
          <div className="fixed inset-0 z-[51] flex h-screen w-full flex-col items-center justify-center gap-5 overflow-hidden bg-black/20 backdrop-blur-sm">
            <UpdateProfileForm />
          </div>
        )
      )}
      <div className="flex h-full w-full flex-col items-start justify-start md:overflow-hidden">
        <div className="flex w-full items-center justify-center gap-2.5">
          <span className="flex-1 text-left font-bold text-[32px] leading-[32px] md:text-[36px] md:leading-[36px]">
            Dashboard
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                {start_date ? `From ${dayjs(start_date).format("MMM DD, YYYY")}` : "Select Starting Date"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit p-0" align="end">
              <DropdownMenuItem className="p-2.5" asChild>
                <Calendar
                  mode="single"
                  required={true}
                  selected={start_date}
                  captionLayout="dropdown"
                  disabled={{ after: new Date() }}
                  className="rounded-md border shadow-sm"
                  onSelect={(date) => dispatch(setStartDate(date))}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                {end_date ? `To ${dayjs(end_date).format("MMM DD, YYYY")}` : "Select Ending Date"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit p-0" align="end">
              <DropdownMenuItem className="p-2.5" asChild>
                <Calendar
                  mode="single"
                  selected={end_date}
                  required={true}
                  captionLayout="dropdown"
                  disabled={{ after: new Date() }}
                  className="rounded-md border shadow-sm"
                  onSelect={(date) => dispatch(setEndDate(date))}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {isLoading ? (
          <div className="flex h-[144px] w-full items-center justify-center">
            <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-2.5 pt-5 md:grid-cols-3 md:pt-5">
            {formatDashboardStats(data!).map((card) => (
              <div
                key={card.id}
                className="col-span-1 flex w-full flex-col items-center justify-center gap-3.5 rounded-[15px] border p-7 shadow"
              >
                <div className="flex w-full items-center justify-center">
                  <span className="flex-1 text-left font-medium text-[16px] leading-[16px]">{card.name}</span>
                  <card.icon color="#000000" size={24} />
                </div>
                <span className="w-full text-left font-bold text-[48px] leading-[48px]">{card.amount}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3.5 grid w-full grid-cols-2 items-start justify-start gap-3.5 md:h-[calc(100vh-318px)] md:overflow-y-auto">
          <CallVolumeGraph className="h-full" type="dashboard" />
          <UsageGraph className="h-full" type="dashboard" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
