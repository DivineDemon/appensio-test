import dayjs from "dayjs";
import { ChartCircle } from "iconsax-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { callVolumeConfig } from "@/lib/graph-specs";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { useGetBusinessCallVolumeDataQuery } from "@/store/services/business";
import { useCallVolumeDataQuery } from "@/store/services/stats";

interface CallVolumeGraphProps {
  className?: string;
  type: "business" | "dashboard";
}

const CallVolumeGraph = ({ type, className }: CallVolumeGraphProps) => {
  const { id } = useParams();
  const { start_date, end_date } = useSelector((state: RootState) => state.global);

  const { data: dashboard, isLoading: dLoading } = useCallVolumeDataQuery(
    {
      start_date: dayjs(start_date).format("YYYY-MM-DD"),
      end_date: dayjs(end_date).format("YYYY-MM-DD"),
    },
    {
      skip: !start_date || !end_date || type !== "dashboard",
      refetchOnMountOrArgChange: true,
    },
  );

  const { data: business, isLoading: bLoading } = useGetBusinessCallVolumeDataQuery(
    {
      start_date: dayjs(start_date).format("YYYY-MM-DD"),
      end_date: dayjs(end_date).format("YYYY-MM-DD"),
      business_id: id!,
    },
    {
      skip: !start_date || !end_date || type !== "business",
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div className={cn("h-full w-full rounded-2xl border p-3.5 shadow md:p-7", className)}>
      <span className="w-full text-left font-semibold text-[16px] leading-[16px] md:text-[20px] md:leading-[20px]">
        Call Volume
      </span>
      {dLoading || bLoading ? (
        <div className="flex h-[358px] w-full items-center justify-center">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <ChartContainer config={callVolumeConfig} className="my-3.5 h-[85%] w-full">
          <LineChart
            accessibilityLayer
            data={type === "business" ? business : dashboard}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="totalCalls" type="natural" stroke="var(--color-totalCalls)" strokeWidth={4} dot={false} />
            <Line
              dataKey="successCalls"
              type="natural"
              stroke="var(--color-successCalls)"
              strokeWidth={4}
              dot={false}
            />
            <Line dataKey="failedCalls" type="natural" stroke="var(--color-failedCalls)" strokeWidth={4} dot={false} />
          </LineChart>
        </ChartContainer>
      )}
      <div className="flex w-full items-center justify-between md:justify-start md:gap-10">
        <div className="flex items-center justify-center gap-2">
          <div className="size-3 shrink-0 rounded-[3px] bg-chart-1" />
          <span className="font-medium text-[12px] leading-[12px] md:text-[16px] md:leading-[16px]">Total Calls</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="size-3 shrink-0 rounded-[3px] bg-chart-5" />
          <span className="font-medium text-[12px] leading-[12px] md:text-[16px] md:leading-[16px]">Success Calls</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="size-3 shrink-0 rounded-[3px] bg-chart-4" />
          <span className="font-medium text-[12px] leading-[12px] md:text-[16px] md:leading-[16px]">Failed Calls</span>
        </div>
      </div>
    </div>
  );
};

export default CallVolumeGraph;
