// Home.tsx
import React from 'react'
import { useAppContext } from '../components/Context'
import PostCard from '../components/PostCard'
import '../styles/Home.css'

const Home: React.FC = () => {
  const { posts, loading, error } = useAppContext()

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="home">
      <p className="heading">Home Page</p>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          postId={post.id}
          title={post.title}
          body={post.body}
        />
      ))}
    </div>
  )
}

export default Home
