import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SignInResponse,
  SignUpResponse,
  UserSignInData,
  UserSignUpData,
} from "../vite-env";
import { authBaseUrl } from "../api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: authBaseUrl }),
  tagTypes: ["Authentication"],
  endpoints: (builder) => ({
    signUpUser: builder.mutation<SignUpResponse, UserSignUpData>({
      query: (formData) => ({
        url: "/signup",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Authentication"],
    }),
    signInUser: builder.mutation<SignInResponse, UserSignInData>({
      query: (formData) => ({
        url: "/signin",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Authentication"],
    }),
  }),
});

export const { useSignUpUserMutation, useSignInUserMutation } = authApi;

export default authApi;

export const authApiMiddleware = authApi.middleware;
