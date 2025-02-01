import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product",
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
