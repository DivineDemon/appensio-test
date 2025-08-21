import { ChartCircle } from "iconsax-react";
import { useEffect, useState } from "react";

import { columns } from "@/components/call-logs/call-logs-columns";
import DataTable from "@/components/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetMyBusinessesQuery } from "@/store/services/business";
import { useCallLogsQuery } from "@/store/services/call";

const CallLogs = () => {
  const { data: agents } = useGetMyBusinessesQuery({});
  const [selected, setSelected] = useState<string>("all");

  const { data, isLoading: fetching } = useCallLogsQuery(selected, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (agents && agents.length > 0) {
      setSelected(agents[0].assistant_id);
    } else {
      setSelected("all");
    }
  }, [agents]);

  return (
    <div className="flex h-[calc(100vh-84px)] w-full flex-col items-start justify-start gap-5">
      <div className="flex w-full items-center justify-end gap-5">
        <span className="font-semibold text-[#71717A] text-sm">Select your Agent:</span>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-[180px]">
            <SelectValue className="truncate" placeholder="Select an Agent" />
          </SelectTrigger>
          <SelectContent>
            {agents?.map((agent) => (
              <SelectItem key={agent.id} value={agent.assistant_id}>
                {agent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-[820px] w-full">
        {fetching ? (
          <div className="flex h-full w-full items-center justify-center">
            <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
          </div>
        ) : (
          <DataTable
            data={selected === "all" ? data! : data!.filter((log) => log.assistant_id === selected)}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default CallLogs;
