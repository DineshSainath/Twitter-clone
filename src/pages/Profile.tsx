// Profile.tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface User {
  id: number
  name: string
  username: string
  email: string
}

interface Post {
  id: number
  title: string
  body: string
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const userId = id ? parseInt(id, 10) : null

  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const userUrl = `https://jsonplaceholder.typicode.com/users/${userId}`
  const postsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`

  useEffect(() => {
    // Reset states
    setUser(null)
    setPosts([])
    setError(null)

    // Fetch user
    axios
      .get(userUrl)
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError(`User not found with id ${userId}`)
        } else {
          setError(`Error fetching user: ${err.message}`)
        }
      })

    // Fetch posts
    axios
      .get(postsUrl)
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        setError(`Error fetching posts: ${err.message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [userId, userUrl, postsUrl])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!user) return <p>User not found.</p>

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>

      <h3>Posts:</h3>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default Profile
