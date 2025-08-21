import { activeBusinesses } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ActiveBusinessTable = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-full max-h-[474px] w-full flex-col items-start justify-start rounded-2xl border p-3.5 shadow md:p-7",
        className,
      )}
    >
      <span className="w-full text-left font-semibold text-[16px] leading-[16px] md:text-[20px] md:leading-[20px]">
        Top 5 Most Active Agents
      </span>
      <div className="mt-3.5 grid w-full grid-cols-2 rounded-lg bg-[#F4F4F5] p-5 md:mt-7">
        <span className="col-span-1 w-full text-left font-medium text-[16px] leading-[16px]">Agent Name</span>
        <span className="col-span-1 w-full text-right font-medium text-[16px] leading-[16px] md:text-left">Calls</span>
      </div>
      <div className="flex h-[358px] w-full flex-col items-start justify-start overflow-y-auto">
        {activeBusinesses.map((business) => (
          <div key={business.id} className="grid w-full grid-cols-2 py-2.5 pr-5 pl-2.5">
            <div className="col-span-1 flex w-full items-center justify-start gap-5">
              <img
                src={business.logo}
                alt={business.name}
                className="size-7 rounded-full border border-gray-300 md:size-10"
              />
              <span className="flex-1 text-left font-medium text-[12px] leading-[12px] md:text-[16px] md:leading-[16px]">
                {business.name}
              </span>
            </div>
            <div className="col-span-1 flex h-full w-full items-center justify-end font-medium text-[12px] leading-[12px] md:justify-start md:text-[16px] md:leading-[16px]">
              {business.calls}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveBusinessTable;
