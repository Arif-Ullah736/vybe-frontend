import React, { useState } from "react";
import logo from "../assets/logo4.png";
import whiteLogo from "../assets//logo5.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // ✅ ADDED ERROR STATE
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // ✅ VALIDATION ONLY ADDED
  const validateForm = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ SIGN IN API
  const handleSignIn = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/v1/auth/signin`,
        { email, password },
        { withCredentials: true },
      );

      setLoading(false);
      console.log(result.data);
      dispatch(setUserData(result.data.user));
      navigate("/"); // optional redirect
    } catch (error) {
      setLoading(false);

      setErrors({
        api: error.response?.data?.message || "Something went wrong",
      });

      console.log(error.response?.data);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[550px] bg-white rounded-2xl flex items-center justify-center overflow-hidden border-2 border-[#1a1f23]">
        {/* form div */}
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center justify-center p-[10px] gap-[20px]">
          <div className="flex items-center justify-center text-[20px] gap-[10px] font-semibold mt-[40px]">
            <span>Sign in to</span>
            <img src={logo} alt="" className="w-[70px]" />
          </div>

          {/* email field */}
          <div className="relative w-[90%] ">
            <input
              type="email"
              id="email"
              placeholder=" "
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
              className="peer w-full h-[55px] rounded-2xl px-[20px] outline-none border-2 border-black"
            />

            <label
              htmlFor="email"
              className="
                absolute left-[18px] bg-white px-[5px]
                text-gray-700 duration-200
                peer-placeholder-shown:top-[16px]
                peer-placeholder-shown:text-[15px]
                peer-focus:-top-[10px]
                peer-focus:text-[13px]
                top-[-10px] text-[13px]
              "
            >
              Enter Your Email
            </label>

            {/* ERROR */}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* password field */}
          <div className="relative w-[90%] ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder=" "
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              className="peer w-full h-[55px] rounded-2xl px-[20px] pr-[55px] outline-none border-2 border-black"
            />

            {/* Eye Icon */}
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[15px] right-[20px] cursor-pointer text-[22px]"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>

            <label
              htmlFor="password"
              className="
      absolute left-[18px] bg-white px-[5px]
      text-gray-700 duration-200
      peer-placeholder-shown:top-[16px]
      peer-placeholder-shown:text-[15px]
      peer-focus:-top-[10px]
      peer-focus:text-[13px]
      top-[-10px] text-[13px]
    "
            >
              Enter Your Password
            </label>

            {/* ERROR */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div
            className="w-[90%] flex justify-start mt-[-10px] "
            onClick={() => navigate("/forgot-password")}
          >
            <span className="text-sm text-gray-800 font-semibold cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* API ERROR */}
          {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}

          {/* signin button */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign In"}
          </button>

          <p
            className="cursor-pointer text-gray-800"
            onClick={() => navigate("/signup")}
          >
            Don,t have an account ?{" "}
            <span className="border-b-2 border-b-black pb-[3px] text-black ">
              Sign Up
            </span>
          </p>
        </div>

        {/* logo div (UNCHANGED) */}
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <img src={whiteLogo} alt="" className="w-[40%]" />
          <p>Not Jsut A Platform, Its A VYBE</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
