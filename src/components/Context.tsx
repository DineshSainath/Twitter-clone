// context.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import axios from 'axios'

interface AppContextProps {
  user: User | null
  posts: Post[]
  loading: boolean
  error: string | null
  fetchUser: (userId: number) => void
  fetchPosts: () => void
}

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

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = (userId: number) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        setError(err.response?.data.message || 'Error fetching user.')
      })
  }

  const fetchPosts = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        setError(err.response?.data.message || 'Error fetching posts.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const contextValue: AppContextProps = {
    user,
    posts,
    loading,
    error,
    fetchUser,
    fetchPosts,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
