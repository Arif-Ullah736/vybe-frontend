import axios from "axios";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({});

  const handleStep1 = async () => {
    if (!email) {
      setErr({ email: "Email is required" });
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/auth/send-otp`,
        { email },
        { withCredentials: true },
      );

      setLoading(false);
      setStep(2);
      setErr({});
    } catch (error) {
      setLoading(false);
      setErr({ api: error.response?.data?.message });
    }
  };

  const handleStep2 = async () => {
    if (!otp) {
      setErr({ otp: "OTP is required" });
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/auth/verify-otp`,
        { email, otp },
        { withCredentials: true },
      );

      setLoading(false);
      setStep(3);
      setErr({});
    } catch (error) {
      setLoading(false);
      setErr({ api: error.response?.data?.message });
    }
  };

  const handleStep3 = async () => {
    if (!newPassword || !confirmPassword) {
      setErr({ password: "All fields are required" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErr({ password: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/auth/reset-password`,
        {
          email,
          otp,
          password: newPassword,
          confirmPassword,
        },
        { withCredentials: true },
      );

      setLoading(false);
      setErr({});
    } catch (error) {
      setLoading(false);
      setErr({ api: error.response?.data?.message });
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center">
      {/* STEP 1 */}
      {step == 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>

          <div className="relative w-[90%] mt-[30px] ">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr({});
              }}
              className="peer w-full h-[55px] rounded-2xl px-[20px] outline-none border-2 border-black"
            />

            {/* label preserved */}
            <label className="absolute left-[18px] bg-white px-[5px] text-gray-700 duration-200 peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-[15px] peer-focus:-top-[10px] peer-focus:text-[13px] top-[-10px] text-[13px]">
              Enter Your Email
            </label>

            {err.email && (
              <p className="text-red-500 text-sm mt-1">{err.email}</p>
            )}
          </div>

          {err.api && <p className="text-red-500 text-sm mt-2">{err.api}</p>}

          <button
            onClick={handleStep1}
            disabled={loading}
            className="mt-[30px] w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step == 2 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Enter OTP</h2>

          <div className="relative w-[90%] mt-[30px] ">
            <input
              type="text"
              placeholder=" "
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setErr({});
              }}
              className="peer w-full h-[55px] rounded-2xl px-[20px] outline-none border-2 border-black"
            />

            <label className="absolute left-[18px] bg-white px-[5px] text-gray-700 duration-200 peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-[15px] peer-focus:-top-[10px] peer-focus:text-[13px] top-[-10px] text-[13px]">
              Enter OTP
            </label>

            {err.otp && <p className="text-red-500 text-sm mt-1">{err.otp}</p>}
          </div>

          {err.api && <p className="text-red-500 text-sm mt-2">{err.api}</p>}

          <button
            onClick={handleStep2}
            disabled={loading}
            className="mt-[30px] w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit OTP"}
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step == 3 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Reset Password</h2>

          <div className="relative w-[90%] mt-[30px]">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder=" "
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErr({});
              }}
              className="peer w-full h-[55px] rounded-2xl px-[20px] pr-[55px] outline-none border-2 border-black"
            />

            <label className="absolute left-[18px] bg-white px-[5px] text-gray-700 duration-200 peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-[15px] peer-focus:-top-[10px] peer-focus:text-[13px] top-[-10px] text-[13px]">
              New Password
            </label>
          </div>

          <div className="relative w-[90%] mt-[30px]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErr({});
              }}
              className="peer w-full h-[55px] rounded-2xl px-[20px] pr-[55px] outline-none border-2 border-black"
            />

            <label className="absolute left-[18px] bg-white px-[5px] text-gray-700 duration-200 peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-[15px] peer-focus:-top-[10px] peer-focus:text-[13px] top-[-10px] text-[13px]">
              Confirm New Password
            </label>
          </div>

          {err.password && (
            <p className="text-red-500 text-sm mt-2">{err.password}</p>
          )}

          {err.api && <p className="text-red-500 text-sm mt-2">{err.api}</p>}

          <button
            onClick={handleStep3}
            disabled={loading}
            className="mt-[30px] w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl"
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
