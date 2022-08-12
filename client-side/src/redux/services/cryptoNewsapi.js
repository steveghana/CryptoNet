import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";
const headers = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": process.env.CRYPTO_NEWS_API_KEY,
};
const baseUrl = "https://bing-news-search1.p.rapidapi.com";
// const baseUrl = 'http://localhost:5000'

const createRequest = (url) => ({ url, headers });
export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      // query: () => createRequest(`/data/news`),
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
