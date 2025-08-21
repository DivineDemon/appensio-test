import { api } from "./core";

export const ticketApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTickets: build.query({
      query: () => ({
        url: "/testing/support-ticket/",
        method: "GET",
      }),
      providesTags: ["Tickets"],
      transformResponse: (response: Ticket[]) => response,
    }),
    getTicket: build.query({
      query: (ticket_id: string) => ({
        url: `/testing/support-ticket/ticket/${ticket_id}`,
        method: "GET",
      }),
      providesTags: ["Ticket"],
      transformResponse: (response: GetTicket) => response,
    }),
    postTicket: build.mutation({
      query: ({ business_id, problem }: { business_id: string; problem: string }) => ({
        url: `/testing/support-ticket/${business_id}`,
        method: "POST",
        body: {
          problem,
        },
      }),
      invalidatesTags: ["Tickets"],
    }),
    deleteTicket: build.mutation({
      query: (ticket_id: string) => ({
        url: `/testing/support-ticket/${ticket_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tickets"],
    }),
    postComment: build.mutation({
      query: ({ ticket_id, body }: { ticket_id: string; body: { message: string; status: string } }) => ({
        url: `/testing/support-ticket/${ticket_id}/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Ticket", "Tickets"],
    }),
  }),
});

export const {
  useGetTicketQuery,
  useGetTicketsQuery,
  usePostTicketMutation,
  useDeleteTicketMutation,
  usePostCommentMutation,
} = ticketApi;
