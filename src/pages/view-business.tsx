import dayjs from "dayjs";
import { ChartCircle, I3Dcube } from "iconsax-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CallVolumeGraph from "@/components/call-volume-graph";
import BusinessHoursConfiguration from "@/components/my-businesses/business/business-hours-configuration";
import CallLogs from "@/components/my-businesses/business/call-logs";
import EditAgent from "@/components/my-businesses/business/edit-agent";
import KnowledgeBase from "@/components/my-businesses/knowledge/knowledge-base";
import ProductCatalog from "@/components/my-businesses/product/product-catalog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsageGraph from "@/components/usage-graph";
import { cn, formatBusinessStats } from "@/lib/utils";
import { RootState } from "@/store";
import { useGetBusinessStatsQuery } from "@/store/services/business";
import { usePackageStatsQuery } from "@/store/services/stats";
import { setEndDate, setStartDate } from "@/store/slices/global";

const ViewBusiness = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const { start_date, end_date } = useSelector((state: RootState) => state.global);

  const { data, isLoading } = useGetBusinessStatsQuery(
    {
      start_date: dayjs(start_date).format("YYYY-MM-DD"),
      end_date: dayjs(end_date).format("YYYY-MM-DD"),
      business_id: id || "",
    },
    {
      skip: !start_date || !end_date || !id,
      refetchOnMountOrArgChange: true,
    },
  );

  const { data: packageStats } = usePackageStatsQuery(id || "", {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const query = useMemo(() => {
    const params = new URLSearchParams(search);
    return {
      name: params.get("name"),
    };
  }, [search]);

  return (
    <div className="flex h-full w-full flex-col items-start justify-start md:overflow-hidden">
      <div className="flex w-full items-center justify-between gap-5">
        <span className="flex-1 truncate text-left font-bold text-[32px] leading-[32px] md:text-[36px] md:leading-[36px]">
          {query.name}&nbsp;-&nbsp;{activeTab}
        </span>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[750px]">
          <TabsList className="grid w-full grid-cols-6">
            {["Dashboard", "Agent Hours", "Product Catalog", "Edit Agent", "Knowledge Base", "Call Logs"].map(
              (tab, idx) => (
                <TabsTrigger key={idx} value={tab} className="w-full text-center">
                  {tab}
                </TabsTrigger>
              ),
            )}
          </TabsList>
        </Tabs>
      </div>
      <div className="flex w-full items-center justify-end gap-2.5 py-5">
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
                required={true}
                selected={end_date}
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
      ) : activeTab !== "Knowledge Base" && activeTab !== "Call Logs" ? (
        <div className="grid w-full grid-cols-1 gap-2.5 md:grid-cols-4">
          {/* @ts-expect-error Data Loading */}
          {formatBusinessStats(data).map((card) => (
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
          <div className="col-span-1 flex w-full flex-col items-center justify-center gap-3.5 rounded-[15px] border p-7 shadow">
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex w-full items-center justify-center">
                <span className="flex-1 text-left font-medium text-[16px] capitalize leading-[16px]">
                  {packageStats?.plan}&nbsp;Plan - Usage
                </span>
                <I3Dcube color="#000000" size={24} />
              </div>
              {packageStats?.exceed_minutes === 0 ? (
                <span className="w-full text-left text-muted-foreground text-xs">
                  Remaining Minutes:&nbsp;
                  {((packageStats?.plan_limit_minutes ?? 0) - (packageStats?.total_minutes_used ?? 0)).toFixed(2)}
                </span>
              ) : (
                <span className="w-full text-left text-muted-foreground text-xs">Package Limit Exceeded</span>
              )}
            </div>
            <span className="w-full text-left font-bold text-[48px] leading-[48px]">
              <span
                className={cn("", {
                  "text-red-500": (packageStats?.exceed_minutes ?? 0) > 0,
                  "text-green-500": (packageStats?.exceed_minutes ?? 0) === 0,
                })}
              >
                {packageStats?.total_minutes_used}
              </span>
              &nbsp;
              <span className="text-[24px] leading-[24px]">/&nbsp;&nbsp;{packageStats?.plan_limit_minutes}</span>
            </span>
          </div>
        </div>
      ) : null}
      {activeTab === "Dashboard" && (
        <div className="mt-3.5 grid w-full grid-cols-2 items-start justify-start gap-3.5 md:h-[calc(100vh-382px)] md:overflow-y-auto">
          <CallVolumeGraph className="h-full" type="business" />
          <UsageGraph className="h-full" type="business" />
        </div>
      )}
      {activeTab === "Agent Hours" && <BusinessHoursConfiguration />}
      {activeTab === "Product Catalog" && <ProductCatalog />}
      {activeTab === "Edit Agent" && <EditAgent />}
      {activeTab === "Knowledge Base" && <KnowledgeBase />}
      {activeTab === "Call Logs" && <CallLogs />}
    </div>
  );
};

export default ViewBusiness;
