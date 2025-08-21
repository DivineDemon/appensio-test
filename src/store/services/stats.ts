import { api } from "./core";

export const statsApi = api.injectEndpoints({
  endpoints: (build) => ({
    callVolumeData: build.query({
      query: ({ start_date, end_date }: { start_date: string; end_date: string }) => ({
        url: `/business/vapi/get-call-volumes?start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
      }),
      transformResponse: (response: CallVolume[]) => response,
    }),
    usageGraph: build.query({
      query: ({ start_date, end_date }: { start_date: string; end_date: string }) => ({
        url: `/business/vapi/get-usage-analysis?start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
      }),
      transformResponse: (response: Usage[]) => response,
    }),
    dashboardStats: build.query({
      query: ({ start_date, end_date }: { start_date: string; end_date: string }) => ({
        url: `/business/vapi/get-dashboard-details?start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
      }),
      transformResponse: (response: DashboardStats) => response,
    }),
    packageStats: build.query({
      query: (business_id: string) => ({
        url: `/business/vapi/get-business-plan-summary?business_id=${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: PackageStats) => response,
    }),
  }),
});

export const { useUsageGraphQuery, useDashboardStatsQuery, useCallVolumeDataQuery, usePackageStatsQuery } = statsApi;
