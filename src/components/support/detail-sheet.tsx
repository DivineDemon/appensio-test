import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { ChartCircle, Send, User } from "iconsax-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useGetTicketQuery, usePostCommentMutation } from "@/store/services/ticket";
import { setSelectedTicket } from "@/store/slices/global";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Textarea } from "../ui/textarea";

interface DetailSheetProps {
  id?: string;
  open: boolean;
}

const commentFormSchema = z.object({
  message: z.string().min(1, "Message is required"),
  status: z.enum(["open", "in progress", "resolved"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

const DetailSheet = ({ id, open }: DetailSheetProps) => {
  const dispatch = useDispatch();
  const { data } = useGetTicketQuery(`${id}`, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      message: "",
      status: "open",
    },
  });

  const [postComment, { isLoading }] = usePostCommentMutation();

  const handleSubmit = async (values: z.infer<typeof commentFormSchema>) => {
    const response = await postComment({
      ticket_id: id || "",
      body: {
        message: values.message,
        status: values.status,
      },
    });

    if (response.data) {
      toast.success("Comment posted successfully");
      form.reset();
      dispatch(setSelectedTicket(""));
    } else {
      toast.error("Failed to post comment");
    }
  };

  useEffect(() => {
    if (data) {
      form.setValue("status", data.status as "open" | "in progress" | "resolved");
    }
  }, [data, form.setValue]);

  return (
    <Sheet open={open} onOpenChange={() => dispatch(setSelectedTicket(""))}>
      <SheetContent className="gap-0 rounded-l-3xl sm:min-w-[500px]">
        <SheetHeader>
          <SheetTitle className="p-1.5 font-bold text-[28px] text-primary leading-[28px] md:text-[36px] md:leading-[36px]">
            Ticket Preview
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full w-full flex-col items-start justify-start divide-y">
          <div className="grid w-full grid-cols-2 items-center justify-center gap-5 p-5">
            <span className="flex-1 text-left font-bold text-lg">{data?.business_name}</span>
            <div className="flex items-center justify-center gap-5">
              <span className="text-[#71717A] text-sm">Status:</span>
              <div
                className={cn("w-full rounded-md border-2 p-1.5 text-center font-medium text-sm capitalize", {
                  "border-red-500 text-red-500": data?.status === "open",
                  "border-green-500 text-green-500": data?.status === "resolved",
                  "border-yellow-500 text-yellow-500": data?.status === "in progress",
                })}
              >
                {data?.status}
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 items-center justify-center gap-5 p-5">
            <span className="flex-1 text-left text-[#71717A] text-sm">Business Type/Industry:</span>
            <span className="flex-1 text-right font-semibold">{data?.industry}</span>
          </div>
          <div className="grid w-full grid-cols-2 items-center justify-center gap-5 p-5">
            <div className="col-span-2 flex w-full flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-bold text-lg">Problem</span>
              <span className="w-full text-left text-[#71717A] text-sm">{data?.problem}</span>
            </div>
          </div>
          <div className="flex h-full w-full flex-col items-start justify-start">
            <div className="col-span-2 flex w-full flex-col items-center justify-center gap-2.5 p-5">
              <span className="w-full text-left font-bold text-lg">Resolution</span>
              <div className="flex h-[calc(100vh-495px)] w-full flex-col items-start justify-start gap-2.5 overflow-y-auto">
                {data?.comments.map((item, idx) => {
                  const isDeveloper = item.type === "developer";
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg border p-2.5 shadow",
                        isDeveloper ? "mr-auto flex-row" : "ml-auto flex-row-reverse",
                      )}
                    >
                      <div
                        className={cn("flex size-10 items-center justify-center rounded-full p-2", {
                          "bg-muted": isDeveloper,
                          "bg-primary/15": !isDeveloper,
                        })}
                      >
                        {isDeveloper ? (
                          <User size={24} color="#000000" className="size-full" />
                        ) : (
                          <User size={24} color="#0513bb" className="size-full" />
                        )}
                      </div>
                      <div className={cn("flex w-full flex-col gap-1.5", isDeveloper ? "items-start" : "items-end")}>
                        <div
                          className={cn(
                            "flex w-full items-center gap-2.5",
                            isDeveloper ? "justify-start" : "justify-end",
                          )}
                        >
                          <span
                            className={cn(
                              "font-semibold text-[14px] capitalize leading-[14px]",
                              isDeveloper ? "text-left" : "text-right",
                            )}
                          >
                            {item.type === "developer"
                              ? "Scintia Support"
                              : item.type === "testing"
                                ? "Testing Support"
                                : data?.business_name}
                          </span>
                          <span
                            className={cn(
                              "font-semibold text-[14px] text-muted-foreground leading-[14px]",
                              isDeveloper ? "text-left" : "text-right",
                            )}
                          >
                            {dayjs(item.created_at).format("DD MMM, YYYY")}
                          </span>
                        </div>
                        <span
                          className={cn("w-full font-medium text-[14px] text-gray-400 leading-[14px]", {
                            "text-left": isDeveloper,
                            "text-right": !isDeveloper,
                            "text-green-500 italic": !item.message && data?.status === "resolved",
                            "text-yellow-500 italic": !item.message && data?.status === "in progress",
                            "text-red-500 italic": !item.message && data?.status === "open",
                          })}
                        >
                          {item.message ? item.message : data?.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full ">
                  <div className="flex w-full items-start justify-start gap-2.5 pb-10">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl className="w-full">
                            <Textarea placeholder="Enter Comment" disabled={isLoading} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="icon" variant="default" disabled={isLoading}>
                      {isLoading ? (
                        <ChartCircle size={16} color="#FFFFFF" className="animate-spin" />
                      ) : (
                        <Send size={16} color="#FFFFFF" />
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailSheet;
