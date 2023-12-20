// App.tsx
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Post from './pages/Post'
import Sidebar from './components/Sidebar'
import { AppProvider } from './components/Context'
import AddPost from './components/AddPost' // Add this import
import './styles/App.css'

const App: React.FC = () => {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false)

  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/posts/:postId" element={<Post />} />
            </Routes>
            {isAddPostOpen && (
              <AddPost onClose={() => setIsAddPostOpen(false)} />
            )}
            <button
              className="add-post-button"
              onClick={() => setIsAddPostOpen(true)}
            >
              +
            </button>
          </div>
          <div className="right-content">
            <p>Right side</p>
          </div>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
