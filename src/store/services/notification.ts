import { api } from "./core";

export const notificationApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUnreadBusinessNotfications: build.query({
      query: () => ({
        url: "/notification/business/unread",
        method: "GET",
      }),
      providesTags: ["Notifications"],
      transformResponse: (response: UnreadBusinesses[]) => response,
    }),
    getUnreadTicketNotfications: build.query({
      query: () => ({
        url: "/notification/ticket/unread",
        method: "GET",
      }),
      providesTags: ["Notifications"],
      transformResponse: (response: UnreadTickets[]) => response,
    }),
    markAllBusinessNotificationsAsRead: build.mutation({
      query: () => ({
        url: "/notification/business/mark-all-as-read",
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
    markBusinessNotificationAsRead: build.mutation({
      query: (n_id: string) => ({
        url: `/notification/business/mark-as-read/${n_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
    markAllTicketNotificationsAsRead: build.mutation({
      query: () => ({
        url: "/notification/ticket/mark-all-as-read",
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
    markTicketNotificationAsRead: build.mutation({
      query: (n_id: string) => ({
        url: `/notification/ticket/mark-as-read/${n_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetUnreadBusinessNotficationsQuery,
  useGetUnreadTicketNotficationsQuery,
  useMarkAllBusinessNotificationsAsReadMutation,
  useMarkBusinessNotificationAsReadMutation,
  useMarkAllTicketNotificationsAsReadMutation,
  useMarkTicketNotificationAsReadMutation,
} = notificationApi;
