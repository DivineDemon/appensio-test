import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle, Copy, Cpu, DocumentText, InfoCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import AddTicket from "@/components/support/add-ticket-sheet";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, copyToClipboard } from "@/lib/utils";
import {
  useGetBusinessAgentConfigQuery,
  useGetPromptTemplatesQuery,
  useUpdateBusinessAgentMutation,
} from "@/store/services/business";

import PromptChat from "./prompt-chat";

const editAgentSchema = z.object({
  firstMessage: z.string().min(1),
  lastMessage: z.string().min(1),
  businessName: z.string().min(1),
  prompt: z.string().min(50, { message: "Min 50 characters." }).max(15000, { message: "Max 15000 characters." }),
});

const EditAgent = () => {
  const { id } = useParams();
  const [add, setAdd] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("1");
  const form = useForm<z.infer<typeof editAgentSchema>>({
    resolver: zodResolver(editAgentSchema),
    defaultValues: {
      firstMessage: "",
      lastMessage: "",
      prompt: "",
    },
  });
  const { data, isLoading: fetching } = useGetPromptTemplatesQuery({});
  const [updateAgent, { isLoading }] = useUpdateBusinessAgentMutation();
  const { data: agentConfig } = useGetBusinessAgentConfigQuery(`${id}`, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const handleSubmit = async (values: z.infer<typeof editAgentSchema>) => {
    const response = await updateAgent({
      business_id: id!,
      body: {
        system_prompt: values.prompt,
        last_message: values.lastMessage,
        first_message: values.firstMessage,
        business_name: values?.businessName || "",
      },
    });

    if (response.data) {
      toast.success("Updated AI Agent Successfully!");
    } else {
      toast.error("Something went wrong, please try again!");
    }
  };

  useEffect(() => {
    if (agentConfig) {
      form.setValue("prompt", agentConfig.system_prompt);
      form.setValue("lastMessage", agentConfig.last_message);
      form.setValue("firstMessage", agentConfig.first_message);
      form.setValue("businessName", agentConfig.business_name);
    }
  }, [agentConfig, form.setValue]);

  return (
    <>
      <AddTicket open={add} setOpen={setAdd} problem="Please configure my AI agent and it's prompt for me." />
      <PromptChat open={open} setOpen={setOpen} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-5 flex h-[calc(100vh-336px)] w-full flex-col items-start justify-start gap-5 overflow-y-auto md:gap-5"
        >
          <div className="flex w-full flex-col items-center justify-start gap-5 rounded-lg border border-[#0B33A44D] bg-[#0B33A41A] p-5 md:flex-row">
            <DocumentText size={40} color="#0B33A4" className="shrink-0" />
            <div className="flex flex-1 flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-bold text-[18px] leading-[18px]">
                {agentConfig?.twilio_number}
              </span>
              <span className="w-full text-left font-normal text-[#71717A] text-[16px] leading-[16px]">
                {agentConfig?.industry}&nbsp;|&nbsp;{agentConfig?.country}
                &nbsp;|&nbsp;{agentConfig?.contact_number}
              </span>
            </div>
            <Button type="button" variant="default" onClick={() => setAdd(true)}>
              Request Configuration
            </Button>
          </div>
          <div className="flex w-full items-center justify-center gap-5 border-[#D9D9D9] border-b pb-5">
            <Cpu size={24} color="#0B33A4" />
            <span className="flex-1 text-left font-bold text-[24px] leading-[24px]">Agent Set-up</span>
          </div>
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2">
              <Label className="w-full text-left">Business Name</Label>
              <Input type="text" disabled={true} value={agentConfig?.business_name} />
            </div>
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2">
              <Label className="w-full text-left">Communication Type</Label>
              <Input type="text" disabled={true} value={agentConfig?.communication_type} />
            </div>
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2">
              <Label className="w-full text-left">Language</Label>
              <Input type="text" disabled={true} value={agentConfig?.transcriber_language} />
            </div>
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2">
              <Label className="w-full text-left">AI Model</Label>
              <Input type="text" disabled={true} value={agentConfig?.ai_model_name} />
            </div>
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2">
              <Label className="w-full text-left">Transcriber</Label>
              <Input type="text" disabled={true} value={agentConfig?.transcriber_provider} />
            </div>
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2">
              <Label className="w-full text-left">Voice Agent Provider</Label>
              <Input type="text" disabled={true} value={agentConfig?.voice_agent_provider} />
            </div>
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2">
              <Label className="w-full text-left">Voice Agent</Label>
              <Input type="text" disabled={true} value={agentConfig?.voice_agent} />
            </div>
            <FormField
              control={form.control}
              name="firstMessage"
              render={({ field }) => (
                <FormItem className="col-span-2 w-full">
                  <Label htmlFor="First Message" className="w-full text-left">
                    First Message
                  </Label>
                  <FormControl className="w-full">
                    <Input disabled={!agentConfig?.edit_privilege} placeholder="Enter the First Message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastMessage"
              render={({ field }) => (
                <FormItem className="col-span-2 w-full">
                  <Label htmlFor="Away Message" className="w-full text-left">
                    Away Message
                  </Label>
                  <FormControl className="w-full">
                    <Input disabled={!agentConfig?.edit_privilege} placeholder="Enter the Away Message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-2 w-full">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-1 items-center justify-start text-left font-semibold text-[14px] leading-[14px]">
                      Edit Prompt&nbsp;
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" type="button" size="icon">
                            <InfoCircle size={20} color="#000000" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white">
                          <div className="mr-auto flex h-full w-full flex-col items-center justify-start gap-5 rounded-lg border border-[#0B33A4] p-5">
                            <span className="w-full text-left font-bold text-[18px] text-black leading-[18px]">
                              Prompt Guidelines
                            </span>
                            <ul className="flex w-full list-inside list-disc flex-col items-center justify-center gap-2 text-[#71717A]">
                              {[
                                "Define the AI's role and purpose",
                                "Specify tone and communication style",
                                "Include key business values",
                                "Provide context for responses",
                              ].map((item, idx) => (
                                <li key={idx} className="w-full text-left text-[14px] leading-[14px]">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Button onClick={() => setOpen(true)} type="button" variant="default" size="sm">
                      AI Prompt Generator
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      className={cn("h-56 w-full resize-none rounded-xl border border-input p-5 shadow", {
                        "border-destructive": prompt.length > 500,
                      })}
                      disabled={!agentConfig?.edit_privilege}
                      placeholder="Write a custom prompt that defines the behaviour and tone of your business."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mr-auto flex w-full flex-col items-center justify-between gap-2.5 rounded-lg border border-[#0B33A44D] bg-[#0B33A41A] p-7">
            <div className="flex w-full items-center justify-center">
              <span className="flex-1 text-left font-bold text-[18px] leading-[18px]">Prompt Templates</span>
              <Button
                type="button"
                onClick={() =>
                  copyToClipboard(`${data?.find((prompt) => prompt.id === Number(selected))?.template.trim()}`)
                }
                variant="default"
                size="sm"
              >
                <Copy size={20} color="#FFFFFF" />
                Copy Template
              </Button>
            </div>
            {fetching ? (
              <div className="flex h-full w-full items-center justify-center">
                <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
              </div>
            ) : (
              <Tabs value={selected} onValueChange={setSelected} className="h-full w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {data?.map((prompt) => (
                    <TabsTrigger
                      title={prompt.name}
                      key={prompt.id}
                      value={`${prompt.id}`}
                      className="w-full text-center"
                    >
                      {prompt.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value={selected}>
                  <div
                    className="h-[115px] w-full overflow-y-auto rounded-lg"
                    dangerouslySetInnerHTML={{
                      __html: `${data?.find((prompt) => prompt.id === Number(selected))?.template}`,
                    }}
                  />
                </TabsContent>
              </Tabs>
            )}
          </div>
          <div className="flex w-full items-center justify-end gap-2.5">
            <Button type="button" variant="secondary" size="sm">
              Cancel
            </Button>
            <Button disabled={isLoading || agentConfig?.edit_privilege} type="submit" variant="default" size="sm">
              {isLoading ? <ChartCircle size={20} color="#FFFFFF" className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditAgent;
