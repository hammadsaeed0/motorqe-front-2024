import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Base_url } from "../../utils/Base_url";

const planService = createApi({
  reducerPath: "plan",
  tagTypes: "plans",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Base_url}/admin/`,
  }),
  endpoints: (builder) => {
    return {
      create: builder.mutation({
        query: (name) => {
          return {
            url: "create-plan",
            method: "POST",
            body: name,
          };
        },
        invalidatesTags: ["plans"],
      }),
      updateplan: builder.mutation({
        query: (data) => {
          return {
            url: `update-plan/${data.id}`,
            method: "PUT",
            body: { name: data.name },
          };
        },
        invalidatesTags: ["plans"],
      }),
      deleteplan: builder.mutation({
        query: (id) => {
          return {
            url: `delete-plan/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["plans"],
      }),

      fetchSinglePlan: builder.query({
        query: (id) => {
          return {
            url: `get-single-plan/${id}`,
            method: "GET",
          };
        },
        invalidatesTags: ["plans"],
      }),
      fetchPlan:builder.query({
        query: () => {
          return {
            url: "plan",
            method: "GET",
          };
        },
    
      }),
    };
  },
});
export const {
  useCreateMutation,
  useFetchSinglePlanQuery,
  useFetchPlanQuery,
  useUpdateplanMutation,
  useDeleteplanMutation,
} = planService;
export default planService;
