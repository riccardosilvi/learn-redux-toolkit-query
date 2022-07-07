import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useEditPostMutation, useGetPostQuery } from "../api/apiSlice";
import { Spinner } from "../../components/Spinner";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const {
      data : post,
      isSuccess, //we have cached data
  } = useGetPostQuery(postId)

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const [editPost, { isLoading }] = useEditPostMutation()
  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSavePostClicked = async () => {
    if (title && content) {
      await editPost({ id: postId, title, content })
      history.push(`/posts/${postId}`)
    }
  }

  let renderedContent

  if(isLoading){
      renderedContent = <Spinner text={"Loading..."} />
  } else if (isSuccess){
      renderedContent = (
        <>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
            </form>
            <button type="button" onClick={onSavePostClicked}>
                Save Post
            </button>
        </>
      )
  }

  return (
    <section>
        {renderedContent}
    </section>
  )
}
