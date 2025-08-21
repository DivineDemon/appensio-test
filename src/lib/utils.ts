import { type ClassValue, clsx } from "clsx";
import { Briefcase, BrifecaseTick, CallCalling } from "iconsax-react";
import parsePhoneNumberFromString from "libphonenumber-js";
import mammoth from "mammoth";
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from "pdfjs-dist";
import { type Dispatch, type SetStateAction } from "react";
import { type Country } from "react-phone-number-input";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.worker.min.mjs";
const mammothTyped = mammoth as unknown as {
  extractRawText: (options: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
};

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      reader.result ? resolve(reader.result as ArrayBuffer) : reject(new Error("FileReader failed"));
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchCountryFromIP(setter: Dispatch<SetStateAction<string>>) {
  const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_IPGEOLOCATION_KEY}`);

  const data: {
    country_code2: string;
  } = await response.json();

  setter(data.country_code2);
}

export function validatePhoneNumber(phoneNumber: string, countryCode?: string): boolean {
  if (!phoneNumber) return false;

  const parsedNumber = phoneNumber.startsWith("+")
    ? parsePhoneNumberFromString(phoneNumber)
    : parsePhoneNumberFromString(phoneNumber, countryCode as Country);

  return parsedNumber ? parsedNumber.isValid() : false;
}

export function validateAndExtractPhoneNumbers(file: File): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet);

        if (jsonData.length === 0) {
          return reject(new Error("The uploaded file is empty."));
        }

        const fileHeaders = Object.keys(jsonData[0]);

        if (!fileHeaders.includes("Phone Numbers")) {
          return reject(new Error("The 'Phone Numbers' column is required."));
        }

        const phoneNumbers: string[] = [];

        jsonData.forEach((row) => {
          let phoneNumber = row["Phone Numbers"];

          if (typeof phoneNumber !== "string") {
            return reject(new Error("Invalid phone number format. It must be a string."));
          }

          if (!/^\+?[0-9\-\s]+$/.test(phoneNumber)) {
            return reject(new Error("Phone number contains invalid characters."));
          }

          phoneNumber = phoneNumber.replace(/[-\s]/g, "");
          phoneNumbers.push(phoneNumber);
        });

        resolve(phoneNumbers);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
  });
}

export async function handleDownload() {
  const response = await fetch("/random_phone_numbers.xlsx");
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "random_phone_numbers.xlsx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function downloadAudio(audioUrl: string, fileName = "audio.mp3") {
  try {
    const response = await fetch(audioUrl);

    if (!response.ok) {
      return false;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export function formatDashboardStats(data: DashboardStats) {
  return [
    {
      id: 1,
      name: "Total Agents",
      amount: data.total_businesses,
      icon: Briefcase,
    },
    {
      id: 2,
      name: "Active Agents",
      amount: data.active_businesses,
      icon: BrifecaseTick,
    },
    {
      id: 3,
      name: "Total Minutes",
      amount: Math.ceil(data.calls_minutes),
      icon: CallCalling,
    },
  ];
}

export function formatBusinessStats(data: BusinessStats) {
  return [
    {
      id: 1,
      name: "Total Calls Today",
      amount: data.totalCalls,
      icon: Briefcase,
    },
    {
      id: 2,
      name: "Success Calls Today",
      amount: data.successCalls,
      icon: BrifecaseTick,
    },
    {
      id: 3,
      name: "Total Minutes Today",
      amount: Math.ceil(data.calls_minutes),
      icon: CallCalling,
    },
  ];
}

export function extractLogs(data: SingleCallData | null): {
  logType: string;
  timestamp: string;
  logMessage: string;
}[] {
  if (!data) {
    return [];
  }

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  const messages = data.messages || [];

  const logs = messages.map(
    (msg: {
      role: string;
      time: number;
      message?: string;
      source?: string;
      endTime: number;
      duration: number;
      secondsFromStart: number;
    }) => {
      const timestamp = formatTimestamp(msg.time);
      const logType = msg.role === "system" ? "[LOG]" : "[CHECKPOINT]";
      const logMessage = `${msg.message?.trim()}`;

      return {
        logType,
        timestamp,
        logMessage,
      };
    },
  );

  return logs;
}

export function extractTranscript(data: SingleCallData | null): {
  role: string;
  content: string;
}[] {
  if (!data) {
    return [];
  }

  const messages = data.messages || [];
  if (!Array.isArray(messages)) {
    throw new Error("Invalid input: 'messages' array not found.");
  }

  const transcript = messages.map(
    (msg: {
      role: string;
      time: number;
      message?: string;
      source?: string;
      endTime: number;
      duration: number;
      secondsFromStart: number;
    }): {
      role: string;
      content: string;
    } => {
      const roleMap: Record<
        string,
        {
          role: string;
          content: string;
        }["role"]
      > = {
        user: "user",
        bot: "assistant",
        system: "system",
      };

      const role = roleMap[msg.role] || "system";
      const content = `${msg.message?.trim()}`;

      return { role, content };
    },
  );

  return transcript;
}

export function extractCallData(inputObject: SingleCallData | null): {
  analysis: string;
  successEvaluation: boolean | string;
  data: {
    role: string;
    time: number;
    message?: string;
    source?: string;
    endTime: number;
    duration: number;
    secondsFromStart: number;
  }[];
  metadata: string;
} | null {
  if (!inputObject) {
    return null;
  }

  const analysis = inputObject.analysis?.summary || "No analysis available.";
  const successEvaluation = inputObject.analysis?.successEvaluation ?? "No success evaluation available.";

  const messages = inputObject.messages || [];
  const hasSubstantiveContent = messages.some(
    (msg: {
      role: string;
      time: number;
      message?: string;
      source?: string;
      endTime: number;
      duration: number;
      secondsFromStart: number;
    }) =>
      msg.role === "user" &&
      `${msg.message?.trim()}`.length > 0 &&
      !["Checking on", "Hello"].includes(`${msg.message?.trim()}`),
  );
  const data = hasSubstantiveContent ? messages : [];

  const metadata = "No Metadata Available";

  return {
    analysis,
    successEvaluation,
    data,
    metadata,
  };
}

export function truncateString(str: string, num: number) {
  return str.length > num ? `${str.slice(0, num)}...` : str;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) {
    return false;
  }

  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to Clipboard!");
      return true;
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (!successful) {
      toast.error("copyToClipboard: execCommand('copy') returned false");
    }

    toast.success("Copied to Clipboard!");
    return successful;
  } catch (err) {
    toast.error((err as Error).message);
    return false;
  }
}

export function formatPhoneNumber(phoneNumber: string): string {
  const parsedNumber = parsePhoneNumberFromString(phoneNumber);
  return parsedNumber ? parsedNumber.formatInternational() : phoneNumber;
}

export async function extractTextFromFile(file: File): Promise<string> {
  const buffer = await readFileAsArrayBuffer(file);
  const ext = file.name.split(".")?.pop()?.toLowerCase();

  if (ext === "pdf") {
    const pdf: PDFDocumentProxy = await getDocument({ data: buffer }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      fullText += `${content.items.map((item) => item as unknown as string).join(" ")}\n\n`;
    }
    return fullText;
  }

  if (ext === "docx") {
    const result = await mammothTyped.extractRawText({ arrayBuffer: buffer });
    return result.value;
  }

  throw new Error(`Unsupported file type: .${ext}`);
}
