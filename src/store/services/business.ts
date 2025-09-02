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
    getBusiness: build.query({
      query: (business_id: string) => ({
        url: `/testing/business/${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: BusinessDetails) => response,
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
        url: "/testing/business/testing_agent_status",
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
    updateBusinessVapi: build.mutation({
      query: (business_id: string) => ({
        url: `/testing/business/sync/${business_id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Business"],
    }),
    updateBusiness: build.mutation({
      query: ({ business_id, data }: { business_id: string; data: UpdateBusinessBody }) => ({
        url: `/testing/business/${business_id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        void dispatch(businessApi.endpoints.updateBusinessVapi.initiate(arg.business_id));
      },
      invalidatesTags: ["Business"],
    }),
    startTesting: build.mutation({
      query: (business_id: string) => ({
        url: `/business/move/${business_id}`,
        method: "PUT",
        body: {
          business_id,
          source_panel: "TESTING",
          dev_agent_status: "TESTING_IN_PROGRESS",
        },
      }),
      invalidatesTags: ["Businesses"],
    }),
    moveToBusiness: build.mutation({
      query: ({ business_id, owner_email }: { business_id: string; owner_email: string }) => ({
        url: `/business/move/move_to_business/${business_id}`,
        method: "POST",
        body: {
          business_id,
          owner_email,
          dev_agent_status: "DONE",
          source_panel: "BUSINESS",
        },
      }),
      invalidatesTags: ["Businesses"],
    }),
  }),
});

export const {
  useGetBusinessQuery,
  useGetMyBusinessesQuery,
  useStartTestingMutation,
  useGetBusinessHoursQuery,
  useGetBusinessStatsQuery,
  useGetBusinessUsageQuery,
  useUpdateBusinessMutation,
  useMoveToBusinessMutation,
  useGetPromptTemplatesQuery,
  usePostBusinessHoursMutation,
  useUpdateBusinessVapiMutation,
  useUpdateBusinessAgentMutation,
  useGetBusinessAgentConfigQuery,
  useGetBusinessCallVolumeDataQuery,
} = businessApi;
