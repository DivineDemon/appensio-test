import dayjs from "dayjs";
import { ChartCircle } from "iconsax-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { usageConfig } from "@/lib/graph-specs";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { useGetBusinessUsageQuery } from "@/store/services/business";
import { useUsageGraphQuery } from "@/store/services/stats";

interface UsageGraphProps {
  className?: string;
  type: "business" | "dashboard";
}

const UsageGraph = ({ type, className }: UsageGraphProps) => {
  const { id } = useParams();
  const { start_date, end_date } = useSelector((state: RootState) => state.global);

  const { data: business, isLoading: bLoading } = useGetBusinessUsageQuery(
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

  const { data: dashboard, isLoading: dLoading } = useUsageGraphQuery(
    {
      start_date: dayjs(start_date).format("YYYY-MM-DD"),
      end_date: dayjs(end_date).format("YYYY-MM-DD"),
    },
    {
      skip: !start_date || !end_date || type !== "dashboard",
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div
      title="Usage In Minutes Graph"
      className={cn("h-full w-full rounded-2xl border p-3.5 shadow md:p-7", className)}
    >
      <span className="flex w-full text-left font-semibold text-[16px] leading-[16px] md:hidden md:text-[20px] md:leading-[20px]">
        CSA
      </span>
      <span className="hidden w-full text-left font-semibold text-[20px] leading-[20px] md:flex">Usage In Minutes</span>
      {dLoading || bLoading ? (
        <div className="flex h-[358px] w-full items-center justify-center">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <ChartContainer config={usageConfig} className="my-3.5 h-[90%] w-full">
          <BarChart accessibilityLayer data={type === "business" ? business : dashboard}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="total_minutes" stackId="a" fill="var(--color-total_minutes)" />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
};

export default UsageGraph;
