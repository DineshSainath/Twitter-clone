import React from 'react'
import '../styles/CommentCard.css'
interface Comment {
  id: number
  name: string
  email: string
  body: string
}

interface CommentCardProps {
  comment: Comment
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="comment-card">
      <strong>{comment.name}</strong> ({comment.email}): {comment.body}
    </div>
  )
}

export default CommentCard
