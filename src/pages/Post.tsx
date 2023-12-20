import React, { useEffect, useState } from 'react'
import { useAppContext } from '../components/Context'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Comment {
  id: number
  name: string
  email: string
  body: string
}

const Post: React.FC = () => {
  const { posts, loading, error, fetchPosts } = useAppContext()
  const { postId } = useParams<{ postId?: string }>()

  const post = posts.find((p) => p.id.toString() === postId)

  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
          )
          setComments(response.data)
        } catch (error) {
          console.error('Error fetching comments:', error)
        }
      }
    }

    fetchComments()
  }, [postId])

  useEffect(() => {
    if (!post) {
      // Fetch the post if it's not available
      fetchPosts()
    }
  }, [post, fetchPosts])

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
