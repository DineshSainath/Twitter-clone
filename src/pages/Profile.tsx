// Profile.tsx
import React, { useEffect } from 'react'
import { useAppContext } from '../components/Context'
import { useParams } from 'react-router-dom'

const Profile: React.FC = () => {
  const { user, fetchUser, posts, loading, error } = useAppContext()
  const { id } = useParams<{ id?: string }>()
  const userId = id ? parseInt(id, 10) : null

  useEffect(() => {
    if (userId) {
      fetchUser(userId)
    }
  }, [userId, fetchUser])

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
