import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Signin from './pages/Signin'
import Signup from './pages/signup'
import Editpost from './pages/Editpost'
import { Navigate } from 'react-router-dom'
import PostList from './pages/PostList'
import CreatePost from './pages/CreatePost'
import BlogPost from './pages/BlogPost'
function App() {
const CurrenUser= false;
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/blogs/:id' element={<BlogPost/>}/>
         <Route
    path='/signin'
    element={CurrenUser ? <Navigate to="/dashboard" /> : <Signin />}
  />

  <Route
    path='/signup'
    element={CurrenUser ? <Navigate to="/dashboard" /> : <Signup />}
  />    

  <Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Navigate to="posts" replace />} />
  <Route path="posts" element={<PostList />} />
  <Route path="create-post" element={<CreatePost />} />
  <Route path="edit-post/:id" element={<Editpost />} />
</Route>

</Routes>
    </div>
  )
}

export default App