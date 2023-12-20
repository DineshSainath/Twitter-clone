import React from 'react'
import '../styles/PostCard.css'

interface PostCardProps {
  title: string
  body: string
}

const PostCard: React.FC<PostCardProps> = ({ title, body }) => {
  return (
    <div className="post-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}

export default PostCard
