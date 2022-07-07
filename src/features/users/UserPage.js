import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectUserById } from '../users/usersSlice'
import { createSelector } from "@reduxjs/toolkit";
import { useGetPostsQuery } from "../api/apiSlice";

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))

  //create a memoized selector to be tied to the query
  const selectPostsForUser = useMemo(() => {
      const emptyArray = []

      return createSelector(
          res => res.data,
          (res, userId) => userId,
          (data, userId) => data?.filter(post => post.user === userId) ?? emptyArray
      )
  },[])

  const { postsForUser } = useGetPostsQuery(undefined, {
      selectFromResult : result => ({
          ...result,
          //we can add to the base return fields something custom
          //in this case we can pass 'postsForUser' and use our above selector to
          //obtain posts related to our current user
          postsForUser : selectPostsForUser(result, userId)
      })
  })

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}
