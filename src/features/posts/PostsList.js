import React from 'react'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { useGetPostsQuery } from "../apiSlice";

let PostExcerpt = ({ post }) => {

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {

    const {
        data: posts,//undefined until the first response is received
        isLoading, //will be true only if the first request is in progress, will be false from next calls
        /* isFetching, */ //enable isFetching to track loading status for any request
        isSuccess, //will be true if first request did succeed and we have cached data
        isError, //is true if the latest request had an error
        error //the error itself, serialized
    } = useGetPostsQuery()

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = posts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (isError) {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
