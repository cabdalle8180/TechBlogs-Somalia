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
import Footer from './components/footer'
import {ToastContainer} from "react-toastify"
import { useSelector } from 'react-redux'

function App() {
  const currentUser = useSelector((state)=> state.currentUser);
  console.log(currentUser);
  

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/blogs/:id' element={<BlogPost/>}/>

          <Route
            path='/signin'
            element={currentUser ? <Navigate to="/dashboard" /> : <Signin />}
          />

          <Route
            path='/signup'
            element={currentUser ? <Navigate to="/dashboard" /> : <Signup />}
          />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="posts" replace />} />
            <Route path="posts" element={<PostList />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="edit-post/:id" element={<Editpost />} />
          </Route>
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
      <ToastContainer />
    </div>
  );
}


export default App;