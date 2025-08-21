import { api } from "./core";

export const knowledgeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getKnowledgeBase: build.query({
      query: (business_id: string) => ({
        url: `/business/files/all/${business_id}`,
        method: "GET",
      }),
      providesTags: ["Knowledge"],
      transformResponse: (response: KnowledgeBase[]) => response,
    }),
    syncWithVapi: build.mutation({
      query: (business_id: string) => ({
        url: `/developer/business/sync/${business_id}`,
        method: "PATCH",
      }),
    }),
    uploadDocument: build.mutation({
      query: ({ business_id, body }: { business_id: string; body: FormData }) => ({
        url: `/business/query-tools/${business_id}/upload-file-and-create-tool`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Knowledge"],
      async onQueryStarted({ business_id }, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(knowledgeApi.endpoints.syncWithVapi.initiate(business_id));
      },
    }),
    updateKnowledgeBase: build.mutation({
      query: ({ business_id, body }: { business_id: string; body: FormData }) => ({
        url: `/business/query-tools/query-tool/${business_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Knowledge"],
      async onQueryStarted({ business_id }, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(knowledgeApi.endpoints.syncWithVapi.initiate(business_id));
      },
    }),
    deleteDocument: build.mutation({
      query: (document_id: string) => ({
        url: `/business/files/${document_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Knowledge"],
    }),
    checkExistence: build.query({
      query: (business_id: string) => ({
        url: `/business/query-tools/exists/${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: { has_query_tool: true }) => response,
    }),
    getFile: build.query({
      query: (file_id: string) => ({
        url: `/business/files/content/${file_id}`,
        method: "GET",
      }),
      transformResponse: (response: { file_id: string; file_content: string }) => response,
    }),
    aiPromptGenerate: build.mutation({
      query: (user_input: string) => ({
        url: "/business/prompt/assistant/prompt/generate",
        method: "POST",
        body: { user_input },
      }),
      transformResponse: (response: { prompt: string }) => response,
    }),
  }),
});

export const {
  useGetFileQuery,
  useCheckExistenceQuery,
  useSyncWithVapiMutation,
  useGetKnowledgeBaseQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useAiPromptGenerateMutation,
  useUpdateKnowledgeBaseMutation,
} = knowledgeApi;
