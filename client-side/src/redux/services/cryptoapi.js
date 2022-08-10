import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import dotenv from "dotenv";
dotenv.config();
//Headers
const baseUrl = "https://coinranking1.p.rapidapi.com/v2";
const cryptoheader = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": process.env.CRYPTO_API_KEY,
  "x-acess-token": process.env.CRYPTO_API_TOKEN,
};
// const baseUrl = 'http://localhost:5000'
//create a query instance
const createRequest = (url) => ({ url, headers: cryptoheader });
// const createRequest =(url)=>({url})

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",

  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (count) => createRequest(`/coins`),
      // query: ()=> createRequest(`/data`)
    }),
    getExchangeData: builder.query({
      query: () => createRequest(`/exchanges`),
      // query: ()=> createRequest(`/data/exchanges`)
    }),
    getCryptoDetails: builder.query({
      // query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`),
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history/${timeperiod}`),
      // query: (coinId) => createRequest(`/data/cryptocurrencies/${coinId}`),
    }),
  }),
});

export const {
  useGetDataQuery,
  useGetExchangeDataQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoDetailsQuery,
} = cryptoApi;
