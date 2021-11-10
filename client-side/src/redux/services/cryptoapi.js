import {fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'
//Headers   
const cryptoheader = {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': 'b5143b76dfmshdf9866dbee9bf98p1c34eajsn631b3255ff5e' 
}
const baseUrl=  'https://coinranking1.p.rapidapi.com'
// const baseUrl = 'http://localhost:5000'
//create a query instance
const createRequest =(url)=>({url, headers:cryptoheader})
// const createRequest =(url)=>({url})


export const cryptoApi = createApi({
    reducerPath : 'cryptoApi',
    
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getData : builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
            // query: ()=> createRequest(`/data`)
        }),
        getExchangeData : builder.query({
            query: ()=> createRequest(`/exchanges`)
            // query: ()=> createRequest(`/data/exchanges`)
        }),
        getCryptoDetails: builder.query({
            // query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`),
            query: (coinId) => createRequest(`/coin/${coinId}`),
          }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`),
            // query: (coinId) => createRequest(`/data/cryptocurrencies/${coinId}`),
          }),
    })  
})

export const {useGetDataQuery,useGetExchangeDataQuery, useGetCryptoHistoryQuery, useGetCryptoDetailsQuery} = cryptoApi 