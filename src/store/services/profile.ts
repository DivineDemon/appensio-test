import { api } from "./core";

export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: "/business/profile/my-profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
      transformResponse: (response: { first_name: string; last_name: string; email: string }) => response,
    }),
    updateProfile: build.mutation({
      query: ({
        body,
      }: {
        body: {
          first_name: string;
          last_name: string;
        };
      }) => ({
        url: "/business/profile/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
