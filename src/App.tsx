// src/App.tsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route // authentication - do later
            path="/profile"
            element={true ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
