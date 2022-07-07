import {
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

//we can extend the main apiSlice via injectEndpoints so that we can keep users endpoints here
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints : builder => ({
    getUsers: builder.query({
      query: () => '/users', // '/fakeApi/users'
      transformResponse : (responseData) => {
        return usersAdapter.setAll(initialState, responseData)
      }
    })
  })
})

//and export its queries/mutation hooks
export const {
  useGetUsersQuery
} = extendedApiSlice

//since we invoke the getUsers query in index js via the initiate function
//we can select its fetched data through the endpoints[queryName].select method

export const selectUserResults = extendedApiSlice.endpoints.getUsers.select()

//we can then build upon that with reselect composed and memoized selectors

const emptyUsers = []

export const selectUsersData = createSelector(
  selectUserResults,
  usersResult => usersResult.data
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);

