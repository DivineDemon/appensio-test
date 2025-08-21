import type { ChartConfig } from "@/components/ui/chart";

export const callVolumeData = [
  {
    month: "Jan",
    totalCalls: 245000,
    successCalls: 165000,
    failedCalls: 80000,
  },
  {
    month: "Feb",
    totalCalls: 375000,
    successCalls: 220000,
    failedCalls: 155000,
  },
  {
    month: "Mar",
    totalCalls: 690000,
    successCalls: 320000,
    failedCalls: 370000,
  },
  {
    month: "Apr",
    totalCalls: 820000,
    successCalls: 480000,
    failedCalls: 340000,
  },
  {
    month: "May",
    totalCalls: 910000,
    successCalls: 610000,
    failedCalls: 300000,
  },
  {
    month: "Jun",
    totalCalls: 780000,
    successCalls: 500000,
    failedCalls: 280000,
  },
  {
    month: "Jul",
    totalCalls: 1564205,
    successCalls: 1120000,
    failedCalls: 444205,
  },
  {
    month: "Aug",
    totalCalls: 1020000,
    successCalls: 740000,
    failedCalls: 280000,
  },
  {
    month: "Sep",
    totalCalls: 1340000,
    successCalls: 950000,
    failedCalls: 390000,
  },
  {
    month: "Oct",
    totalCalls: 1220000,
    successCalls: 890000,
    failedCalls: 330000,
  },
  {
    month: "Nov",
    totalCalls: 1080000,
    successCalls: 860000,
    failedCalls: 220000,
  },
  {
    month: "Dec",
    totalCalls: 1190000,
    successCalls: 930000,
    failedCalls: 260000,
  },
];

export const callVolumeConfig = {
  totalCalls: {
    label: "Total Calls",
    color: "var(--chart-1)",
  },
  successCalls: {
    label: "Success Calls",
    color: "var(--chart-5)",
  },
  failedCalls: {
    label: "Failed Calls",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export const usageData = [
  { month: "Jan", total_minutes: 5 },
  { month: "Feb", total_minutes: 5 },
  { month: "Mar", total_minutes: 7 },
  { month: "Apr", total_minutes: 10 },
  { month: "May", total_minutes: 8 },
  { month: "Jun", total_minutes: 10 },
  { month: "Jul", total_minutes: 5 },
  { month: "Aug", total_minutes: 5 },
  { month: "Sep", total_minutes: 7 },
  { month: "Oct", total_minutes: 3 },
  { month: "Nov", total_minutes: 4 },
  { month: "Dec", total_minutes: 5 },
];

export const usageConfig = {
  total_minutes: {
    label: "Total Minutes",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export const callDistributionData = [
  { business: "retail", calls: 275, fill: "var(--color-retail)" },
  { business: "service", calls: 200, fill: "var(--color-service)" },
  { business: "food", calls: 287, fill: "var(--color-food)" },
  { business: "product", calls: 173, fill: "var(--color-product)" },
  { business: "other", calls: 190, fill: "var(--color-other)" },
];

export const callDistributionConfig = {
  calls: {
    label: "Calls",
  },
  retail: {
    label: "Retail",
    color: "var(--chart-1)",
  },
  service: {
    label: "Service",
    color: "var(--chart-2)",
  },
  food: {
    label: "Food",
    color: "var(--chart-3)",
  },
  product: {
    label: "Product",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;
