import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BusinessHoursConfiguration from "@/components/my-businesses/business/business-hours-configuration";
import CallLogs from "@/components/my-businesses/business/call-logs";
import EditAgent from "@/components/my-businesses/business/edit-agent";
import KnowledgeBase from "@/components/my-businesses/knowledge/knowledge-base";
import ProductCatalog from "@/components/my-businesses/product/product-catalog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ViewBusiness = () => {
  const { search } = useLocation();
  const [activeTab, setActiveTab] = useState<string>("Agent Hours");

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
          <TabsList className="grid w-full grid-cols-5">
            {["Agent Hours", "Product Catalog", "Edit Agent", "Knowledge Base", "Call Logs"].map((tab, idx) => (
              <TabsTrigger key={idx} value={tab} className="w-full text-center">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {activeTab === "Agent Hours" && <BusinessHoursConfiguration />}
      {activeTab === "Product Catalog" && <ProductCatalog />}
      {activeTab === "Edit Agent" && <EditAgent />}
      {activeTab === "Knowledge Base" && <KnowledgeBase />}
      {activeTab === "Call Logs" && <CallLogs />}
    </div>
  );
};

export default ViewBusiness;
