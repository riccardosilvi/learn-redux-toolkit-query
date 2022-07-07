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
        }),
        getPost : builder.query({
            query: (postId) => `/posts/${postId}`// '/fakeApi/posts/{postId}'
        }),
        addNewPost : builder.mutation({
            query : (updatedPost) => ({
                method: "POST",
                url : '/posts', // '/fakeApi/posts'
                body: updatedPost
            })
        })
    })
})

//export auto-generated hooks for endpoints
//hooks follow this schema : use{query/mutation name}{Query/Mutation}
export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddNewPostMutation
} = apiSlice
