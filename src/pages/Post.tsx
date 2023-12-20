import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface Comment {
  id: number
  name: string
  email: string
  body: string
}

interface PostProps {
  postId: number
  title: string
  body: string
}

const Post: React.FC<PostProps> = ({ postId, title, body }) => {
  const commentsUrl = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`

  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
  }, [postId])

  if (loading) return <p>Loading comments...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>{title}</h2>
      <p>{body}</p>
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
