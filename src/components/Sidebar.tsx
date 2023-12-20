import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Sidebar.css'
import Header from './Header'

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <Header />
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Sidebar
