import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCurrentUser from "./hooks/GetCurrentUser";
import useGetSuggestedUsers from "./hooks/GetSuggestedUsers";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Upload from "./pages/Upload";
import useGetAllPost from "./hooks/getAllPost";
import Loops from "./pages/Loops";
import useGetAllLoops from "./hooks/getAllLoops";
import Story from "./pages/Story";
import useGetAllStories from "./hooks/getAllStories";
import Messages from "./pages/Messages";

export const serverUrl = "http://localhost:4000";
function App() {
  useGetCurrentUser();
  useGetSuggestedUsers();
  useGetAllPost();
  useGetAllLoops();
  useGetAllStories();
  const { userData } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route
        path="/signup"
        element={userData ? <Navigate to={"/"} /> : <SignUp />}
      />
      <Route
        path="/signin"
        element={userData ? <Navigate to={"/"} /> : <SignIn />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/forgot-password"
        element={userData ? <Navigate to={"/"} /> : <ForgotPassword />}
      />

      <Route
        path="/profile/:userName"
        element={userData ? <Profile /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/editprofile"
        element={userData ? <EditProfile /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/upload"
        element={userData ? <Upload /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/loops"
        element={userData ? <Loops /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/story/:userName"
        element={userData ? <Story /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/messages"
        element={userData ? <Messages /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
}

export default App;
