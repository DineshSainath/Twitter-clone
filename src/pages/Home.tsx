// Home.tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostCard from '../components/PostCard'
import '../styles/Home.css'

interface Post {
  id: number
  title: string
  body: string
}

const Home: React.FC = () => {
  const postUrl = 'https://jsonplaceholder.typicode.com/posts'
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get(postUrl)
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

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
