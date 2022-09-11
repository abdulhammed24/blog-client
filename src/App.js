import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navigation/Navbar.js";
import Home from "./screens/Home.js";
import Login from "./screens/Login.js";
import Register from "./screens/Register.js";
import { useSelector } from "react-redux";
// import NotFound from "./screens/NotFound.js";
import AddNewCategory from "./screens/categories/AddNewCategory.js";
import CategoryList from "./screens/categories/CategoryList.js";
import UpdateCategory from "./screens/categories/UpdateCategory.js";
import CreatePost from "./screens/posts/CreatePost.js";
import PostsList from "./screens/posts/PostsList.js";
import PostDetails from "./screens/posts/PostDetails.js";
import UpdatePost from "./screens/posts/UpdatePost.js";
import UpdateComment from "./screens/UpdateComment.js";
import Profile from "./screens/profile/Profile.js";
import UploadProfilePhoto from "./screens/profile/UploadProfilePhoto.js";
import UpdateProfileForm from "./screens/profile/UpdateProfileForm.js";
import SendEmail from "./screens/SendEmail.js";
import AccountVerified from "./screens/AccountVerified.js";
import UsersList from "./screens/users/UsersList.js";
import ResetPasswordForm from "./screens/password/ResetPasswordForm.js";
import UpdatePassword from "./screens/password/UpdatePassword.js";
import ResetPassword from "./screens/password/ResetPassword.js";

function App() {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/password-reset-token" element={<ResetPasswordForm />} />
        <Route
          exact
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
        {/* protectedRoutes for admin only */}
        <Route
          path="/add-category"
          element={
            userAuth?.isAdmin ? <AddNewCategory /> : <Navigate to="/login" />
          }
        />
        {/* protectedRoutes for admin only */}
        <Route
          path="/category-list"
          element={
            userAuth?.isAdmin ? <CategoryList /> : <Navigate to="/login" />
          }
        />

        {/* protectedRoutes for admin only */}
        <Route
          path="/update-category/:id"
          element={
            userAuth?.isAdmin ? <UpdateCategory /> : <Navigate to="/login" />
          }
        />

        {/* protectedRoutes for admin only */}
        <Route
          path="/users"
          element={userAuth?.isAdmin ? <UsersList /> : <Navigate to="/login" />}
        />

        {/* protectedRoutes for logged in users only */}
        <Route
          path="/update-comment/:id"
          element={userAuth ? <UpdateComment /> : <Navigate to="/login" />}
        />

        {/* protectedRoutes for logged in users only */}
        <Route
          path="/create-post"
          element={userAuth ? <CreatePost /> : <Navigate to="/login" />}
        />
        {/* protectedRoutes for logged in users only */}
        <Route
          path="/update-post/:id"
          element={userAuth ? <UpdatePost /> : <Navigate to="/login" />}
        />
        {/* protectedRoutes for logged in users only */}
        <Route
          path="/profile/:id"
          element={userAuth ? <Profile /> : <Navigate to="/login" />}
        />
        {/* protectedRoutes for logged in users only */}
        <Route
          path="/upload-profile-photo"
          element={userAuth ? <UploadProfilePhoto /> : <Navigate to="/login" />}
        />
        {/* protectedRoutes for logged in users only */}
        <Route
          path="/update-profile/:id"
          element={userAuth ? <UpdateProfileForm /> : <Navigate to="/login" />}
        />
        {/* protectedRoutes for logged in users only */}
        <Route
          path="/send-mail"
          element={userAuth ? <SendEmail /> : <Navigate to="/login" />}
        />
        {/* protectedRoutes for logged in users only */}
        <Route
          path="/verify-account/:token"
          element={userAuth ? <AccountVerified /> : <Navigate to="/login" />}
        />
        {/* protectedRoutes for logged in users only */}
        <Route
          path="/update-password"
          element={userAuth ? <UpdatePassword /> : <Navigate to="/login" />}
        />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
