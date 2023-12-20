// App.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Post from './pages/Post'
import Sidebar from './components/Sidebar'
import { AppProvider } from './components/Context'
import './styles/App.css'

const App: React.FC = () => {
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
