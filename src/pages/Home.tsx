// Home.tsx
import React, { useState } from 'react'
import { useAppContext } from '../components/Context'
import PostCard from '../components/PostCard'
import AddPost from '../components/AddPost'
import '../styles/Home.css'

const Home: React.FC = () => {
  const { userPosts, loading, error, createPost } = useAppContext()
  const [isAddPostOpen, setIsAddPostOpen] = useState(false)

  const handleAddPostClick = () => {
    setIsAddPostOpen(true)
  }

  const handleCloseAddPost = () => {
    setIsAddPostOpen(false)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="home">
      <h2 className="heading">Home Page</h2>
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

export default Home
