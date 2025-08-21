import MDEditor from "@uiw/react-md-editor";
import { Bill, Code, Diagram, Like, PresentionChart, Task } from "iconsax-react";
import { type Dispatch, type SetStateAction, useState } from "react";

import BinocularsIcon from "@/assets/icons/binoculars.svg";
import { cn, extractCallData, extractLogs, extractTranscript } from "@/lib/utils";
import { useGetCallDetailsQuery } from "@/store/services/call";

import AudioWave from "../ui/audio-wave";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

interface LogDetailSheetProps {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LogDetailSheet = ({ id, open, setOpen }: LogDetailSheetProps) => {
  const [activeTab, setActiveTab] = useState<string>("logs");

  const { data } = useGetCallDetailsQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full max-w-full flex-col items-start justify-start rounded-l-3xl p-5 lg:max-w-[800px]">
        <SheetHeader className="p-0">
          <SheetTitle className="flex items-center gap-5 font-bold text-[28px] text-primary leading-[28px] md:text-[36px] md:leading-[36px]">
            <img src={BinocularsIcon} alt="binoculars" className="size-7 md:size-10" />
            Call Logs
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full w-full flex-col items-start justify-start gap-5">
          <span className="w-full text-left font-bold text-xl">Recording</span>
          <AudioWave call_id={data?.id} monoUrl={`${data?.recordingUrl}`} stereoUrl={`${data?.stereoRecordingUrl}`} />
          <div className="flex w-full items-center justify-start gap-2.5 rounded-lg bg-gray-100 p-2.5">
            <Button
              type="button"
              onClick={() => setActiveTab("logs")}
              className={cn("shadow-none", {
                "bg-white text-black hover:bg-white": activeTab !== "logs",
                "bg-primary text-white hover:bg-primary": activeTab === "logs",
              })}
            >
              <Task size={20} color={activeTab === "logs" ? "#FFFFFF" : "#000000"} className="size-5" />
              Logs
            </Button>
            <Button
              type="button"
              onClick={() => setActiveTab("transcript")}
              className={cn("shadow-none", {
                "bg-white text-black hover:bg-white": activeTab !== "transcript",
                "bg-primary text-white hover:bg-primary": activeTab === "transcript",
              })}
            >
              <Bill size={20} color={activeTab === "transcript" ? "#FFFFFF" : "#000000"} className="size-5" />
              Transcripts
            </Button>
            <Button
              type="button"
              onClick={() => setActiveTab("analysis")}
              className={cn("shadow-none", {
                "bg-white text-black hover:bg-white": activeTab !== "analysis",
                "bg-primary text-white hover:bg-primary": activeTab === "analysis",
              })}
            >
              <PresentionChart size={20} color={activeTab === "analysis" ? "#FFFFFF" : "#000000"} className="size-5" />
              Analysis
            </Button>
          </div>
          {activeTab === "logs" && (
            <div className="flex h-[calc(100vh-396px)] w-full flex-col items-start justify-start divide-y divide-gray-300 overflow-y-auto rounded-xl border border-gray-300">
              {/* @ts-expect-error Data Loading */}
              {extractLogs(data).map((log, idx) => (
                <div
                  key={idx}
                  className={cn("flex w-full items-start justify-start gap-2 p-2.5 text-black", {
                    "rounded-t-xl": idx === 0,
                    "bg-gray-100": idx % 2 === 0,
                    // @ts-expect-error Data Loading
                    "rounded-b-xl": idx === extractLogs(data)?.length - 1,
                  })}
                >
                  <div className="flex items-start justify-start">
                    <span className="w-24 text-sm">{log.timestamp}</span>
                    <span
                      className={cn("text-base", {
                        "text-cyan-400": log.logType.includes("LOG"),
                        "text-green-400": log.logType.includes("CHECKPOINT"),
                      })}
                    >
                      {log.logType}
                    </span>
                  </div>
                  <span className="w-full text-sm">{log.logMessage}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "transcript" && (
            <div className="flex h-[calc(100vh-396px)] w-full flex-col items-start justify-start divide-y divide-gray-300 overflow-y-auto rounded-xl border border-gray-300">
              {/* @ts-expect-error Data Loading */}
              {extractTranscript(data)
                .filter((item) => item.role !== "system")
                .map((transcript, idx) => (
                  <div key={idx} className="flex w-full flex-col items-center justify-center p-2.5">
                    <span
                      className={cn("w-full text-left font-medium capitalize", {
                        "text-green-500": transcript.role === "user",
                        "text-primary": transcript.role === "assistant",
                      })}
                    >
                      {transcript.role === "assistant" ? "AI" : transcript.role}
                    </span>
                    <span className="w-full text-left text-black text-sm">{transcript.content}</span>
                  </div>
                ))}
            </div>
          )}
          {activeTab === "analysis" && (
            <div className="flex h-[calc(100vh-396px)] w-full flex-col items-start justify-start divide-y divide-gray-300 overflow-y-auto rounded-xl border border-gray-300">
              <div className="flex w-full flex-col items-center justify-center gap-2.5 p-5">
                <div className="flex w-full items-center justify-start gap-2.5">
                  <PresentionChart size={20} color="#000000" className="mt-0.5 inline size-5" />
                  <span className="font-bold text-xl">Analysis</span>
                </div>
                <span className="w-full text-left text-black text-sm">
                  {/* @ts-expect-error Data Loading */}
                  {extractCallData(data)?.analysis}
                </span>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2.5 p-5">
                <div className="flex w-full items-center justify-start gap-2.5">
                  <Like size={20} color="#000000" className="mt-0.5 inline size-5" />
                  <span className="font-bold text-xl">Success Evaluation</span>
                </div>
                <span className="w-full text-left text-black text-sm">
                  {/* @ts-expect-error Data Loading */}
                  {extractCallData(data)?.successEvaluation}
                </span>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2.5 p-5">
                <div className="flex w-full items-center justify-start gap-2.5">
                  <Diagram size={20} color="#000000" className="mt-0.5 inline size-5" />
                  <span className="font-bold text-xl">Data</span>
                </div>
                <div className="w-full text-left text-black text-sm">
                  {/* @ts-expect-error Object is possibly 'undefined'. */}
                  {extractCallData(data)?.data.length > 0 ? (
                    <>
                      <span className="w-full text-left text-black text-sm">Data Extracted from Conversation:</span>
                      <div className="mt-2.5 rounded-xl border border-gray-300 bg-gray-100 p-2.5 text-black">
                        {/* @ts-expect-error Data Loading */}
                        {extractCallData(data)
                          ?.data.filter((item) => item.role !== "system")
                          .map((message, idx) => (
                            <>
                              <p className="my-2.5 w-full text-left font-medium text-lg capitalize underline underline-offset-2">
                                {message.role}
                              </p>
                              <MDEditor.Markdown
                                key={idx}
                                source={message.message}
                                style={{
                                  background: "transparent",
                                  color: "black",
                                }}
                              />
                            </>
                          ))}
                      </div>
                    </>
                  ) : (
                    "N/A"
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2.5 p-5">
                <div className="flex w-full items-center justify-start gap-2.5">
                  <Code size={20} color="#000000" className="mt-0.5 inline size-5" />
                  <span className="font-bold text-xl">Metadata</span>
                </div>
                <span className="w-full text-left text-black text-sm">
                  {/* @ts-expect-error Data Loading */}
                  {extractCallData(data)?.metadata}
                </span>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LogDetailSheet;
