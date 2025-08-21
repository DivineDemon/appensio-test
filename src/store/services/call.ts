import { api } from "./core";

export const callApi = api.injectEndpoints({
  endpoints: (build) => ({
    callLogs: build.query({
      query: (assistant_id: string) => ({
        url: `/business/vapi_call_logs/by-assistant?assistant_id=${assistant_id}`,
        method: "GET",
      }),
      providesTags: ["Calls"],
      transformResponse: (response: PhoneCallData[]) => response,
    }),
    createCall: build.mutation({
      query: (data: { customer_number: string; bussiness_id: string }) => ({
        url: "/developer/vapi/create_call",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Calls"],
    }),
    syncDataWithVapi: build.mutation({
      query: (data: { customer_number: string; business_id: string }) => ({
        url: `/developer/business/sync/${data.business_id}`,
        method: "PATCH",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          callApi.endpoints.createCall.initiate({
            customer_number: arg.customer_number,
            bussiness_id: arg.business_id,
          }),
        );
      },
    }),
    getCallDetails: build.query({
      query: (vapi_call_id: string) => ({
        url: `/business/vapi_call_logs/call-details/${vapi_call_id}`,
        method: "GET",
      }),
      transformResponse: (response: SingleCallData) => response,
    }),
    deleteCall: build.mutation({
      query: (call_logs_id: string) => ({
        url: `/business/vapi_call_logs/${call_logs_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Calls"],
    }),
  }),
});

export const {
  useCallLogsQuery,
  useCreateCallMutation,
  useGetCallDetailsQuery,
  useSyncDataWithVapiMutation,
  useDeleteCallMutation,
} = callApi;
