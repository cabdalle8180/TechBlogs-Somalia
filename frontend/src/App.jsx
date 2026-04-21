import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Editpost from "./pages/Editpost";
import PostList from "./pages/PostList";
import CreatePost from "./pages/CreatePost";
import BlogPost from "./pages/BlogPost";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
function App() {
  const currentUser = useSelector((state) => state.user?.currentUser);

  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route
            path="/signin"
            element={currentUser ? <Navigate to="/dashboard" /> : <Signin />}
          />

          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/dashboard" /> : <Signup />}
          />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              currentUser ? (
                <Dashboard />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          >
            <Route index element={<Navigate to="posts" replace />} />
            <Route path="posts" element={<PostList />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="edit-post/:id" element={<Editpost />} />
            <Route path="profile" element={<Profile/>} />
            <Route path="users" element={<Users/>} />
          </Route>
        </Routes>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;