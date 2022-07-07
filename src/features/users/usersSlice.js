import {
  createSelector
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
/*
const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

 */


//we can extend the main apiSlice via injectEndpoints so that we can keep users endpoints here
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints : builder => ({
    getUsers: builder.query({
      query: () => '/users', // '/fakeApi/users'
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

export const selectAllUsers = createSelector(
  selectUserResults,
  userResults => userResults?.data ?? emptyUsers //provide a fallback data set
)

export const selectUserById = createSelector(
    selectAllUsers,
    (state, userId) => userId,
    (users, userId) => users.find(user => user.id === userId)
)

/*
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state) => state.users);
*/
