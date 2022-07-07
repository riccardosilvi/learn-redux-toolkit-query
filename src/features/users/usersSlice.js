import {
  createSelector
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
/*
const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

 */

//since we invoke the getUsers query in index js via the initiate function
//we can select its fetched data through the endpoints[queryName].select method

export const selectUserResults = apiSlice.endpoints.getUsers.select()

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
