import { CallAdd, ChartCircle, DocumentDownload } from "iconsax-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { type Country } from "react-phone-number-input";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import UploadIcon from "@/assets/icons/upload.svg";
import { columns } from "@/components/call-logs/call-logs-columns";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  cn,
  fetchCountryFromIP,
  handleDownload,
  validateAndExtractPhoneNumbers,
  validatePhoneNumber,
} from "@/lib/utils";
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
      <div className="flex w-full flex-col items-center justify-center gap-5 border border-[#E4E4E7] py-5 md:gap-10 md:py-10">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <div
            onClick={() => setSelectedTab("add")}
            className={cn("flex w-80 cursor-pointer items-center justify-center gap-5 rounded-xl py-5 lg:w-96", {
              "bg-primary text-white": selectedTab === "add",
              "bg-[#F4F4F5] text-black": selectedTab === "upload",
            })}
          >
            <CallAdd size={30} color={selectedTab === "add" ? "#FFFFFF" : "#000000"} />
            <span className="font-bold text-[16px] leading-[16px]">Add a New Contact</span>
          </div>
          <div
            onClick={() => setSelectedTab("upload")}
            className={cn("flex w-80 cursor-pointer items-center justify-center gap-5 rounded-xl py-5 lg:w-96", {
              "bg-primary text-white": selectedTab === "upload",
              "bg-[#F4F4F5] text-black": selectedTab === "add",
            })}
          >
            <img
              src={UploadIcon}
              className={cn("size-[35px]", {
                invert: selectedTab === "upload",
              })}
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="w-full text-center font-bold text-[16px] leading-[16px]">Upload Phone List</span>
              <span className="w-full text-center text-[12px] leading-[12px]">Supported Formats: XLSX</span>
            </div>
          </div>
        </div>
        {selectedTab === "add" ? (
          <PhoneInput
            className="mx-auto w-80 lg:w-96"
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
        <Button onClick={handleSubmit} type="button" disabled={isLoading} variant="default" size="lg">
          {isLoading ? <ChartCircle size={20} color="#FFFFFF" className="animate-spin" /> : "Make Call"}
        </Button>
      </div>
      <div className="h-[calc(100vh-500px)] w-full overflow-y-auto">
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
