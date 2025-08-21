import { ChartCircle, Send } from "iconsax-react";
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAiPromptGenerateMutation } from "@/store/services/knowledge";

interface PromptChatProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PromptChat = ({ open, setOpen }: PromptChatProps) => {
  const [messages, setMessages] = useState<
    | {
        id: number;
        content: string;
        type: "user" | "bot";
      }[]
    | null
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userMessage, setUserMessage] = useState<string>("");

  const [talk, { isLoading }] = useAiPromptGenerateMutation();

  const handleSubmit = async () => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...(prev ?? []), { id: (prev?.length ?? 0) + 1, content: userMessage, type: "user" }]);

    try {
      const response = await talk(userMessage).unwrap();
      setMessages((prev) => [...(prev ?? []), { id: (prev?.length ?? 0) + 1, content: response.prompt, type: "bot" }]);
    } catch (error) {
      toast.error(`Failed to get response from the bot. ${(error as Error).message}`);
    } finally {
      setUserMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle className="p-1.5 font-bold text-[28px] text-primary leading-[28px] md:text-[36px] md:leading-[36px]">
            Prompt Chat
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full w-full flex-col items-start justify-start gap-5 border p-5">
          <div className="flex h-[804px] w-full flex-col items-start justify-start gap-2.5 overflow-y-auto rounded-lg bg-muted p-5">
            {messages?.map((message, idx) => {
              const isLast = idx === (messages?.length ?? 1) - 1;
              const isAssistant = message.type === "bot";

              return (
                <div
                  key={message.id}
                  className={cn("rounded-md px-3 py-1.5 text-xs", {
                    "flex items-center gap-2": isAssistant && isLast && isLoading,
                    "ml-auto w-2/3 bg-primary text-white": !isAssistant,
                    "bg-secondary text-black": isAssistant,
                  })}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                  {isAssistant && isLast && isLoading && <ChartCircle size={16} className="h-4 w-4 animate-spin" />}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit();
            }}
            className="flex w-full items-center justify-center gap-2.5"
          >
            <Input
              type="text"
              className="flex-1"
              value={userMessage}
              disabled={isLoading}
              placeholder="How can I help?"
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <Button disabled={isLoading} type="submit" size="icon" variant="default">
              <Send size={20} color="#FFFFFF" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PromptChat;
