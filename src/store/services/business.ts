import { api } from "./core";

export const businessApi = api.injectEndpoints({
  endpoints: (build) => ({
    postBusinessHours: build.mutation({
      query: ({ business_id, data }: { business_id: string; data: BusinessHoursBody }) => ({
        url: `/business-timing/${business_id}`,
        method: "POST",
        body: data,
      }),
    }),
    getBusinessHours: build.query({
      query: (business_id: string) => ({
        url: `/business-timing/${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: BusinessHours) => response,
    }),
    getMyBusinesses: build.query({
      query: () => ({
        url: "/developer/business/my-businesses",
        method: "GET",
      }),
      providesTags: ["Businesses"],
      transformResponse: (response: Business[]) => response,
    }),
    getBusinessStats: build.query({
      query: ({
        start_date,
        end_date,
        business_id,
      }: {
        start_date: string;
        end_date: string;
        business_id: string;
      }) => ({
        url: `/business/vapi/get-business-call-summary?start_date=${start_date}&end_date=${end_date}&business_id=${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: BusinessStats) => response,
    }),
    getBusinessUsage: build.query({
      query: ({
        start_date,
        end_date,
        business_id,
      }: {
        start_date: string;
        end_date: string;
        business_id: string;
      }) => ({
        url: `/business/vapi/get-usage-analysis-for-business?start_date=${start_date}&end_date=${end_date}&business_id=${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: Usage[]) => response,
    }),
    getBusinessCallVolumeData: build.query({
      query: ({
        end_date,
        start_date,
        business_id,
      }: {
        end_date: string;
        start_date: string;
        business_id: string;
      }) => ({
        url: `/business/vapi/get-call-volumes-for-business?start_date=${start_date}&end_date=${end_date}&business_id=${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: CallVolume[]) => response,
    }),
    getPromptTemplates: build.query({
      query: () => ({
        url: "/developer/vapi/get-prompt-templates",
        method: "GET",
      }),
      transformResponse: (response: PromptTemplate[]) => response,
    }),
    updateBusinessAgent: build.mutation({
      query: ({ business_id, body }: { business_id: string; body: UpdateBusinessAgent }) => ({
        url: `/business/vapi/${business_id}`,
        method: "PATCH",
        body,
      }),
    }),
    getBusinessAgentConfig: build.query({
      query: (business_id: string) => ({
        url: `/business/vapi/${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: BusinessAgentConfig) => response,
    }),
  }),
});

export const {
  useGetMyBusinessesQuery,
  useGetBusinessHoursQuery,
  useGetBusinessStatsQuery,
  useGetBusinessUsageQuery,
  useGetPromptTemplatesQuery,
  usePostBusinessHoursMutation,
  useUpdateBusinessAgentMutation,
  useGetBusinessAgentConfigQuery,
  useGetBusinessCallVolumeDataQuery,
} = businessApi;
