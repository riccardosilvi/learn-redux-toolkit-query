//remember to import from '/react' to take advantage of specific integration implementation
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath : 'api', //default,
    // '/fakeApi' as all requests prefix
    baseQuery : fetchBaseQuery({ baseUrl : '/fakeApi' }),
    // operations and requests
    endpoints: builder => ({
        getPosts: builder.query({
            query:  () => '/posts'// '/fakeApi/posts'
        })
    })
})

//export auto-generated hooks for endpoints
export const { useGetPostsQuery } = apiSlice
