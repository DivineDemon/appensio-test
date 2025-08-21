import { setToken } from "../slices/global";
import { api } from "./core";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: PostLogin) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as PostLoginResponse;
        dispatch(setToken(result.data.access_token));
      },
    }),
    resetPassword: build.mutation({
      query: ({ current_password, new_password }: { current_password: string; new_password: string }) => ({
        url: "/auth/business/reset-password",
        method: "POST",
        body: { current_password, new_password },
      }),
    }),
    forgotPassword: build.mutation({
      query: (email: string) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetCorePassword: build.mutation({
      query: ({ email, new_password }: { email: string; new_password: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { email, new_password },
      }),
    }),
    verifyOTP: build.mutation({
      query: (data: { otp: string; email: string; new_password: string }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { otp: data.otp, email: data.email },
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(
          authApi.endpoints.resetCorePassword.initiate({
            email: data.email,
            new_password: data.new_password,
          }),
        );
      },
    }),
    verifyBusinessOTP: build.mutation({
      query: (data: { otp: string; email: string }) => ({
        url: "/auth/verify-otp-business",
        method: "POST",
        body: { otp: data.otp, email: data.email },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as VerifyOTPResponse;
        dispatch(setToken(result.data.access_token));
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useResetCorePasswordMutation,
  useVerifyBusinessOTPMutation,
} = authApi;
