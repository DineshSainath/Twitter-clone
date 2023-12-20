// AddPost.tsx
import React, { useState } from 'react'
import { useAppContext } from '../components/Context'
import '../styles/AddPost.css'

const AddPost: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, createPost } = useAppContext()
  const [newPost, setNewPost] = useState({ title: '', body: '' })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, title: e.target.value })
  }

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, body: e.target.value })
  }

  const handlePublish = () => {
    // Validate post data before publishing
    if (newPost.title.trim() === '' || newPost.body.trim() === '') {
      alert('Please enter both title and body')
      return
    }

    // Create and publish the post
    createPost({
      id: Date.now(), // You can use a better ID generation mechanism
      userId: user?.id || 0,
      title: newPost.title,
      body: newPost.body,
    })

    // Close the popup
    onClose()
  }

  return (
    <div className="add-post-container">
      <div className="add-post-header">
        <span>Create a New Post</span>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="add-post-form">
        <label>Title:</label>
        <input type="text" value={newPost.title} onChange={handleTitleChange} />
        <label>Body:</label>
        <textarea value={newPost.body} onChange={handleBodyChange} />
        <button onClick={handlePublish}>Publish</button>
      </div>
    </div>
  )
}

export default AddPost
