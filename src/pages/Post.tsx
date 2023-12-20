// Post.tsx
import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface Comment {
  id: number
  name: string
  email: string
  body: string
}

const Post: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>()

  const postIdNumber = useMemo(
    () => (postId ? parseInt(postId, 10) : NaN),
    [postId]
  )
  const postUrl = useMemo(
    () => `https://jsonplaceholder.typicode.com/posts/${postIdNumber}`,
    [postIdNumber]
  )
  const commentsUrl = useMemo(
    () =>
      `https://jsonplaceholder.typicode.com/comments?postId=${postIdNumber}`,
    [postIdNumber]
  )

  const [post, setPost] = useState<{ title: string; body: string } | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isNaN(postIdNumber)) {
      setError('Invalid Post ID.')
      setLoading(false)
      return
    }

    axios
      .get(postUrl)
      .then((res) => {
        setPost(res.data)
      })
      .catch((err) => {
        setError(err)
      })

    axios
      .get(commentsUrl)
      .then((res) => {
        setComments(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [postIdNumber, postUrl, commentsUrl])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  if (!post) return <p>Post not found.</p>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <h3>Comments:</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <strong>{comment.name}</strong> ({comment.email}): {comment.body}
        </div>
      ))}
    </div>
  )
}

export default Post
