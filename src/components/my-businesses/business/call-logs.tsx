import { ChartCircle, DocumentDownload } from "iconsax-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { type Country } from "react-phone-number-input";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { columns } from "@/components/call-logs/call-logs-columns";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Switch } from "@/components/ui/switch";
import { fetchCountryFromIP, handleDownload, validateAndExtractPhoneNumbers, validatePhoneNumber } from "@/lib/utils";
import { useCallLogsQuery, useSyncDataWithVapiMutation } from "@/store/services/call";

const CallLogs = () => {
  const { id, a_id } = useParams();
  const [phone, setPhone] = useState<string[]>([]);
  const [countryCode, setCountryCode] = useState<string>("");
  const { data, isLoading: fetching } = useCallLogsQuery(a_id!, {
    skip: !a_id,
    pollingInterval: 10000,
  });
  const [postCall, { isLoading }] = useSyncDataWithVapiMutation({});
  const [selectedTab, setSelectedTab] = useState<"add" | "upload">("add");

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file) {
        if (file.name.endsWith(".xlsx")) {
          const numbers = await validateAndExtractPhoneNumbers(file);
          setPhone(numbers);
        } else toast.error("Please Upload .xlsx File Only!");
      }
    }
  };

  const handleSubmit = async () => {
    if (phone.length === 0) {
      toast.error("Please Provide a Phone Number(s) to Proceed!");
      return;
    }

    const validNumbers = phone.filter((number) => validatePhoneNumber(number));

    if (validNumbers.length === 0) {
      toast.error("Please Enter a Valid Phone Number!");
      return;
    }

    try {
      await Promise.all(validNumbers.map((number) => postCall({ customer_number: number, business_id: id! })));
      toast.success("Call(s) Initialized Successfully!");
    } catch (error) {
      toast.error((error as Error).message);
    }

    setPhone([]);
  };

  useEffect(() => {
    void fetchCountryFromIP(setCountryCode);
  }, []);

  return (
    <div className="mt-5 flex h-full w-full flex-col items-start justify-start gap-5 overflow-y-auto md:gap-5">
      <div className="flex w-full items-center justify-end gap-5">
        <div className="flex items-center justify-center gap-2.5">
          <span className="font-medium text-[12px] text-muted-foreground leading-[12px]">Single</span>
          <Switch
            checked={selectedTab === "upload"}
            onCheckedChange={() => setSelectedTab(selectedTab === "add" ? "upload" : "add")}
          />
          <span className="font-medium text-[12px] text-muted-foreground leading-[12px]">Bulk</span>
        </div>
        {selectedTab === "add" ? (
          <PhoneInput
            className="w-80 lg:w-96"
            defaultCountry={countryCode as Country}
            placeholder="Enter Phone Number"
            value={phone[0]}
            onChange={(e) => setPhone([e])}
            international
          />
        ) : (
          <div className="flex w-80 items-center justify-center lg:w-96">
            <Input
              type="file"
              onChange={handleFileUpload}
              className="mx-auto w-full cursor-pointer rounded-r-none border-none bg-gray-100 shadow-none file:cursor-pointer file:border-gray-100 file:border-r lg:w-96"
            />
            <Button type="button" onClick={handleDownload} className="rounded-l-none" variant="default">
              <DocumentDownload size={20} color="#FFFFFF" /> Download Template
            </Button>
          </div>
        )}
        <Button onClick={handleSubmit} type="button" disabled={isLoading} variant="default">
          {isLoading ? <ChartCircle size={20} color="#FFFFFF" className="animate-spin" /> : "Make Call"}
        </Button>
      </div>
      <div className="h-[calc(100vh-228px)] w-full overflow-y-auto">
        {fetching ? (
          <div className="flex h-full w-full items-center justify-center">
            <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
          </div>
        ) : (
          <DataTable data={data!} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default CallLogs;
