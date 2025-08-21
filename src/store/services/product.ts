import { api } from "./core";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    syncDataPWithVapi: build.mutation({
      query: (business_id: string) => ({
        url: `/developer/business/sync/${business_id}`,
        method: "PATCH",
      }),
    }),
    getAllProducts: build.query({
      query: (business_id: string) => ({
        url: `/testing/product/all/${business_id}`,
        method: "GET",
      }),
      transformResponse: (response: Product[]) => response,
      providesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: ({ business_id, product_id }: { product_id: string; business_id: string }) => ({
        url: `/testing/product/${product_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(productApi.endpoints.syncDataPWithVapi.initiate(arg.business_id));
      },
    }),
    postProduct: build.mutation({
      query: ({ business_id, data }: { business_id: string; data: PostProduct }) => ({
        url: `/testing/product/${business_id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(productApi.endpoints.syncDataPWithVapi.initiate(arg.business_id));
      },
    }),
    updateProduct: build.mutation({
      query: ({ business_id, product_id, data }: { business_id: string; product_id: string; data: PostProduct }) => ({
        url: `/testing/product/${product_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products", "Product"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        await dispatch(productApi.endpoints.syncDataPWithVapi.initiate(arg.business_id));
      },
    }),
    getProduct: build.query({
      query: (product_id: string) => ({
        url: `/testing/product/${product_id}`,
        method: "GET",
      }),
      transformResponse: (response: ProductDetails) => response,
    }),
    getProductTypes: build.query({
      query: () => ({
        url: "/testing/product/get-distinct-products",
        method: "GET",
      }),
      transformResponse: (response: ProductTypes[]) => response,
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetAllProductsQuery,
  usePostProductMutation,
  useGetProductTypesQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSyncDataPWithVapiMutation,
} = productApi;
