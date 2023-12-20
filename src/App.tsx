// App.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Post from './pages/Post' // Import the new component
import Sidebar from './components/Sidebar'
import './styles/App.css'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/posts/:postId"
              element={<Post postId={1} title="" body="" />} // You need to provide the correct props
            />
          </Routes>
        </div>
        <div className="right-content">
          <p>Right side</p>
        </div>
      </div>
    </Router>
  )
}

export default App
