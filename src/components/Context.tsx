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
  userPosts: Post[]
  loading: boolean
  error: string | null
  fetchUser: (userId: number) => void
  fetchPosts: () => void
  createPost: (post: Post) => void
}

interface User {
  id: number
  name: string
  username: string
  email: string
}

interface Post {
  id: number
  userId: number
  title: string
  body: string
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [userPosts, setUserPosts] = useState<Post[]>([])
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
        setUserPosts(res.data)
      })
      .catch((err) => {
        setError(err.response?.data.message || 'Error fetching posts.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const createPost = (post: Post) => {
    setPosts([post, ...posts])
    setUserPosts([post, ...userPosts])
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const contextValue: AppContextProps = {
    user,
    posts,
    userPosts,
    loading,
    error,
    fetchUser,
    fetchPosts,
    createPost,
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
