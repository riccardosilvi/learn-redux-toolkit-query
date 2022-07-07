//remember to import from '/react' to take advantage of specific integration implementation
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath : 'api', //default,
    // '/fakeApi' as all requests prefix
    baseQuery : fetchBaseQuery({ baseUrl : '/fakeApi' }),
    // an array of data types involved in this slice as strings
    tagTypes: ['Post'],
    // operations and requests
    endpoints: builder => ({
        getPosts: builder.query({
            query:  () => '/posts', // '/fakeApi/posts'
            providesTags : ['Post'] // data the query provides by tags
        }),
        getPost : builder.query({
            query: (postId) => `/posts/${postId}`// '/fakeApi/posts/{postId}'
        }),
        addNewPost : builder.mutation({
            query : (updatedPost) => ({
                method: "POST",
                url : '/posts', // '/fakeApi/posts'
                body: updatedPost
            }),
            invalidatesTags : ['Post'] // data types which cache gets outdated on mutation usage as strings
        }),
        editPost : builder.mutation({
            query: post => ({
                method: "PATCH",
                url: `/posts/${post.id}`,// '/fakeApi/posts'
                body: post
            })
        })
    })
})

//export auto-generated hooks for endpoints
//hooks follow this schema : use{query/mutation name}{Query/Mutation}
export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddNewPostMutation,
    useEditPostMutation
} = apiSlice
