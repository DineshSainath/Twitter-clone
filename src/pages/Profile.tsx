import React, { useEffect } from 'react'
import { useAppContext } from '../components/Context'
import { useParams } from 'react-router-dom'
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
  const { user, fetchUser, posts, fetchPosts, loading, error } = useAppContext()
  const { id } = useParams<{ id?: string }>()
  const userId = id ? parseInt(id, 10) : null

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        // Fetch user
        await fetchUser(userId)

        // Fetch posts if posts haven't been fetched yet
        if (posts.length === 0) {
          await fetchPosts()
        }
      }
    }

    fetchData()
  }, [userId, fetchUser, fetchPosts, posts.length])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!user) return <p>User not found.</p>

  // Filter posts for the current user
  // const userPosts = posts.filter((post) => console.log)

  const userPosts = posts.filter((post) => (post as Post).userId === user.id)

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>

      <h3>Posts:</h3>
      {userPosts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default Profile
