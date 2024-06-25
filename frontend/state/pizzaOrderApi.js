import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaOrderApi = createApi({
reducerPath: 'pizzaOrderApi',
baseQuery: fetchBaseQuery({baseUrl:'http://localhost:9009/api/pizza'}),
endpoints: (builder) => ({
    getPizzaOrders: builder.query({
        query: () => 'history',
    }),
    postPizzaOrder: builder.mutation({
        query: (newOrder) => ({
            url: 'order',
            method: 'POST',
            body: newOrder,
        }),
    }),
}),
});

export const { useGetPizzaOrdersQuery, usePostPizzaOrderMutation} = pizzaOrderApi;