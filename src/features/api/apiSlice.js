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
            // data the query provides by tags
            // as a callback we can receive the query response (result)
            // and compute a series of tags
            providesTags : (result= []) => [
                { type: 'Post', id : 'LIST' }, // full list
                ...result.map(({id}) => ({ type: 'Post', id })) // from posts ids
            ]
        }),
        getPost : builder.query({
            query: (postId) => `/posts/${postId}`,// '/fakeApi/posts/{postId}'
            // a tag is provided based on post id
            // arg is the query argument ( postId )
            providesTags : (_,__, arg) => [{ type: 'Post', id: arg }]
        }),
        addNewPost : builder.mutation({
            query : (updatedPost) => ({
                method: "POST",
                url : '/posts', // '/fakeApi/posts'
                body: updatedPost
            }),
            // data types which cache gets outdated on mutation usage as strings
            // only the list will be refetched
            invalidatesTags : [{ type: 'Post', id : 'LIST' }]
        }),
        editPost : builder.mutation({
            query: post => ({
                method: "PATCH",
                url: `/posts/${post.id}`,// '/fakeApi/posts'
                body: post
            }),
            // invalidates based on post id
            // arg is the query argument ( post )
            // LIST tag gets automatically invalidated
            invalidatesTags : (_, __, arg) => [{ type: 'Post', id : arg.id}]
        })
    })
})

//export auto-generated hooks for endpoints
//hooks follow this schema : use{query/mutation name}{Query/Mutation}
export const {
    useGetPostsQuery,
    useGetPostQuery,
    useGetUsersQuery,
    useAddNewPostMutation,
    useEditPostMutation
} = apiSlice
