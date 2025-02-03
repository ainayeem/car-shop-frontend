import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderItems) => ({
        url: "/order/create-order",
        method: "POST",
        body: orderItems,
      }),
      invalidatesTags: ["order"],
    }),

    getOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/order",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getMyOrders: builder.query({
      query: () => {
        // const params = new URLSearchParams();

        // if (args) {
        //   args.forEach((item: TQueryParam) => {
        //     params.append(item.name, item.value as string);
        //   });
        // }

        return {
          url: "/order/my-order",
          method: "GET",
          // params: params,
        };
      },
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<any[]>) => {
        return response;
      },
    }),

    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/order/verify-payment",
        params: { order_id },
        method: "GET",
      }),
    }),

    updateOrder: builder.mutation({
      query: (args) => ({
        url: `/order/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["order"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useVerifyOrderQuery,

  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
