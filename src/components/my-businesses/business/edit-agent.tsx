import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArchiveTick,
  Bill,
  Briefcase,
  CallCalling,
  ChartCircle,
  DocumentText,
  Global,
  Layer,
  Message,
  Messages,
  Microphone,
  Note,
  Profile,
  SecurityUser,
  Translate,
} from "iconsax-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { voicesMap } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useGetBusinessQuery, useUpdateBusinessMutation } from "@/store/services/business";

const EditAgentSchema = z.object({
  businessName: z
    .string()
    .min(1, { message: "Business Name is required." })
    .max(100, { message: "Max 100 characters." })
    .regex(/^[A-Za-z0-9 ]+$/, { message: "No special characters." }),
  industry: z.string().nonempty({ message: "Industry is required." }),
  contactNumber: z.string().regex(/^\+\d{1,4}\s?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/, {
    message: "Invalid phone format.",
  }),
  country: z.string().nonempty({ message: "Country is required." }),
  businessLanguage: z.string().nonempty({ message: "Language is required." }),
  communicationType: z.enum(["inbound & outbound", "inbound", "outbound"]),
  voiceLanguage: z.string().nonempty({ message: "Voice language is required." }),
  aiModel: z.string().nonempty({ message: "AI Model is required." }),
  transcriber: z.string().nonempty({ message: "Transcriber is required." }),
  provider: z.string().nonempty({ message: "Provider is required." }),
  agent: z.string().nonempty({ message: "Agent is required." }),
  prompt: z.string().min(50, { message: "Min 50 characters." }).max(15000, { message: "Max 15000 characters." }),
  editPrivilege: z.boolean().optional(),
  firstMessage: z.string().min(50, { message: "Min 50 characters." }).max(500, { message: "Max 500 characters." }),
  awayMessage: z.string().min(50, { message: "Min 50 characters." }).max(500, { message: "Max 500 characters." }),
});

const EditAgent = () => {
  const { id } = useParams();
  const { data } = useGetBusinessQuery(id ?? "", {
    refetchOnMountOrArgChange: true,
  });
  const [updateBusiness, { isLoading: updating }] = useUpdateBusinessMutation();

  const form = useForm<z.infer<typeof EditAgentSchema>>({
    resolver: zodResolver(EditAgentSchema),
    defaultValues: {
      agent: "Andrew",
    },
  });

  const handleSubmit = async (values: z.infer<typeof EditAgentSchema>) => {
    const response = await updateBusiness({
      business_id: id!,
      data: {
        ai_model_name: values.aiModel,
        business_name: values.businessName,
        communication_type: values.communicationType,
        contact_number: values.contactNumber,
        country: values.country,
        industry: values.industry,
        language: values.businessLanguage,
        system_message: values.prompt,
        transcriber_language: values.voiceLanguage,
        voice_agent: values.agent,
        voice_agent_provider: values.provider,
        edit_privilege: values.editPrivilege ?? false,
        first_message: values.firstMessage,
        last_message: values.awayMessage,
      },
    });
    if (response.data) {
      toast.success("Successfully Updated Business!");
    } else {
      toast.error("Failed to Update Business!");
    }
  };

  useEffect(() => {
    if (data) {
      form.setValue("businessName", `${data?.business_name}`);
      form.setValue("industry", data?.industry_type);
      form.setValue("contactNumber", `${data?.contact_number}`);
      form.setValue("country", `${data.country}`);
      form.setValue("businessLanguage", `${data?.language}`);
      form.setValue(
        "communicationType",
        `${data?.communication_type}`.toLowerCase() as "inbound & outbound" | "inbound" | "outbound",
      );
      form.setValue("voiceLanguage", `${data?.transcriber_language}`);
      form.setValue("aiModel", `${data?.ai_model}`);
      form.setValue("transcriber", `${data.transcriber_provider}`);
      form.setValue("provider", `${data.voice_provider}`);
      form.setValue("agent", `${data?.voice?.charAt(0).toUpperCase()}${data?.voice?.slice(1)}`);
      form.setValue("prompt", `${data?.system_prompt}`);
      form.setValue("firstMessage", `${data?.first_message}`);
      form.setValue("awayMessage", `${data?.last_message}`);
    }
  }, [data, form.setValue]);

  type Provider = keyof typeof voicesMap;
  const currentProvider = (form.watch("provider") ?? "vapi") as Provider;
  const voiceList = voicesMap[currentProvider];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-5 flex h-[calc(100vh-172px)] w-full flex-col items-start justify-start gap-5 overflow-y-auto md:gap-5"
      >
        <div className="flex w-full flex-col items-center justify-between gap-5 rounded-lg border border-[#0B33A44D] bg-[#0B33A41A] p-5 md:flex-row md:gap-0">
          <div className="flex items-start justify-center gap-5 md:items-center">
            <DocumentText size={40} color="#0B33A4" />
            <div className="flex flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-bold text-[18px] leading-[18px]">{data?.business_name}</span>
              <span className="w-full text-left font-normal text-[#71717A] text-[16px] leading-[16px]">
                {data?.industry_type}
                &nbsp;|&nbsp;
                {data?.country}
                &nbsp;|&nbsp;
                {data?.contact_number}
              </span>
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-2.5 md:w-auto md:justify-center">
            <Button
              type="submit"
              disabled={updating}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className: "border-primary text-primary",
                }),
              )}
            >
              {updating ? (
                <>
                  <ChartCircle size={20} color="#0B33A4" className="animate-spin" />
                  Please Wait...
                </>
              ) : (
                <>
                  <ArchiveTick size={20} color="#0B33A4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-5 border-[#D9D9D9] border-b pb-5">
          <Note size={24} color="#0B33A4" />
          <span className="flex-1 text-left font-bold text-[24px] leading-[24px]">Business Set-up</span>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <Note size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">Business Name</span>
                </div>
                <FormControl>
                  <Input placeholder="Innovative Tech Solutions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <Briefcase size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">Industry</span>
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Technology" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {["Technology", "Food", "Healthcare", "Real Estate", "Software"].map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <CallCalling size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">Contact Number</span>
                </div>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <Global size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">Country</span>
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["United States of America", "Canada", "United Kingdom", "Australia", "Pakistan"].map(
                      (item, idx) => (
                        <SelectItem key={idx} value={item}>
                          {item}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessLanguage"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <Translate size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">Language</span>
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      {
                        name: "English",
                        value: "en-US",
                      },
                      {
                        name: "French",
                        value: "FR",
                      },
                      {
                        name: "Arabic",
                        value: "AR",
                      },
                      {
                        name: "Japanese",
                        value: "JP",
                      },
                      {
                        name: "Urdu",
                        value: "UR",
                      },
                    ].map((item, idx) => (
                      <SelectItem key={idx} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full items-center justify-center gap-5 border-[#D9D9D9] border-b pb-5">
          <Microphone size={24} color="#0B33A4" />
          <span className="w-full text-left font-bold text-[24px] leading-[24px]">Voice Set-up</span>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="communicationType"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <Messages size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">Communication Type</span>
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Inbound & Outbound" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Inbound & Outbound", "Inbound", "Outbound"].map((item, idx) => (
                      <SelectItem key={idx} value={item.toLowerCase()}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="voiceLanguage"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <Translate size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">Language</span>
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      {
                        name: "English",
                        value: "en-US",
                      },
                      {
                        name: "French",
                        value: "FR",
                      },
                      {
                        name: "Arabic",
                        value: "AR",
                      },
                      {
                        name: "Japanese",
                        value: "JP",
                      },
                      {
                        name: "Urdu",
                        value: "UR",
                      },
                    ].map((item, idx) => (
                      <SelectItem key={idx} value={item.value}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aiModel"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <Layer size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">AI Model</span>
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="gpt-4o-mini" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "gpt-4o-mini",
                      "openai",
                      "togetherai",
                      "deepinfra",
                      "perplexity",
                      "gemini",
                      "openrouter",
                      "groq",
                      "anthropic",
                    ].map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transcriber"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <Note size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">Transcriber</span>
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="azure" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["azure", "deepgram", "gladia", "talkscriber", "google", "assemblyai"].map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <SecurityUser size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">
                    Voice Agent Provider
                  </span>
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="azure" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(voicesMap).map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agent"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center justify-center gap-2">
                  <Profile size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">Voice Agent</span>
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="andrew" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {voiceList?.map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full items-center justify-center gap-5 border-[#D9D9D9] border-b pb-5">
          <Bill size={24} color="#0B33A4" />
          <span className="flex-1 text-left font-bold text-[24px] leading-[24px]">Prompt Set-up</span>
        </div>
        <div className="flex h-fit w-full flex-col items-center justify-center gap-5">
          <FormField
            control={form.control}
            name="firstMessage"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex w-full items-center justify-center gap-2">
                  <Message size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">First Message</span>
                </div>
                <FormControl>
                  <Input placeholder="Enter First Message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="awayMessage"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex w-full items-center justify-center gap-2">
                  <Message size={20} color="#0B33A4" />
                  <span className="flex-1 text-left font-semibold text-[14px] leading-[14px]">Away Message</span>
                </div>
                <FormControl>
                  <Input placeholder="Enter Away Message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="w-full">
                <span className="w-full text-left font-semibold text-[14px] leading-[14px]">Edit Prompt</span>
                <FormControl className="w-full">
                  <Textarea
                    className="h-40 w-full resize-none rounded-xl border border-input p-5 shadow"
                    placeholder="You are a helpful customer support assistant. Listen carefully to customer inquiries and provide accurate, empathetic responses that address their specific needs."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default EditAgent;
