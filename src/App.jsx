import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
export const serverUrl = "http://localhost:4000";
function App() {
  const { userData } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="signup" element={userData ? <Home /> : <SignUp />} />
      <Route path="signin" element={userData ? <Home /> : <SignIn />} />
      <Route path="/" element={userData ? <Home /> : <SignIn />} />
      <Route
        path="forgot-password"
        element={userData ? <Home /> : <ForgotPassword />}
      />
    </Routes>
  );
}

export default App;
