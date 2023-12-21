import React, { useEffect, useState } from 'react'
import { useAppContext } from '../components/Context'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CommentCard from '../components/CommentCard' // Import the CommentCard component
import '../styles/Post.css'

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
      <div className="post-card">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>

      <h3 className="C-heading">Comments:</h3>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default Post
