// PostCard.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/PostCard.css'

interface PostCardProps {
  postId: number
  title: string
  body: string
}

const PostCard: React.FC<PostCardProps> = ({ postId, title, body }) => {
  return (
    <div className="post-card">
      <h3>{title}</h3>
      <p>{body}</p>
      <Link to={`/posts/${postId}`}>Comments</Link>
    </div>
  )
}

export default PostCard
