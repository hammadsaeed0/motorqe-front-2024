import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authService = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://34.216.84.212/api/auth",
  }),
  endpoints: (builder) => {
    return {
      authLogin: builder.mutation({
        query: (loginData) => {
          return {
            url: "login",
            method: "POST",
            body: loginData,
          };
        },
      }),
      userRegister: builder.mutation({
        query: (data) => {
          return {
            url: "/register",
            method: "POST",
            body: data,
          };
        },
      }),
      userLogin: builder.mutation({
        query: (loginData) => {
          return {
            url: "/login",
            method: "POST",
            body: loginData,
          };
        },
      }),
    };
  },
});
export const {
  useAuthLoginMutation,
  useUserRegisterMutation,
  useUserLoginMutation,
} = authService;
export default authService;
