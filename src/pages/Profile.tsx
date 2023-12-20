// Profile.tsx
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../components/Context'
import { useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import AddPost from '../components/AddPost'
import axios from 'axios'

interface User {
  id: number
  name: string
  username: string
  email: string
}

interface Post {
  id: number
  userId: number
  title: string
  body: string
}

const Profile: React.FC = () => {
  const { user, fetchUser, userPosts, fetchPosts, loading, error, createPost } =
    useAppContext()
  const { id } = useParams<{ id?: string }>()
  const userId = id ? parseInt(id, 10) : null
  const [isAddPostOpen, setIsAddPostOpen] = useState(false)

  const handleAddPostClick = () => {
    setIsAddPostOpen(true)
  }

  const handleCloseAddPost = () => {
    setIsAddPostOpen(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        // Fetch user
        await fetchUser(userId)

        // Fetch posts if posts haven't been fetched yet
        if (userPosts.length === 0) {
          await fetchPosts()
        }
      }
    }

    fetchData()
  }, [userId, fetchUser, fetchPosts, userPosts.length])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!user) return <p>User not found.</p>

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>

      <h3>Posts:</h3>
      {userPosts.map((post) => (
        <PostCard
          key={post.id}
          postId={post.id}
          title={post.title}
          body={post.body}
        />
      ))}
      {isAddPostOpen && <AddPost onClose={handleCloseAddPost} />}
      <button className="add-post-button" onClick={handleAddPostClick}>
        +
      </button>
    </div>
  )
}

export default Profile
