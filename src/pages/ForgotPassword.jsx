import React, { useState } from "react";
import { CgClipboard } from "react-icons/cg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [step, setStep] = useState(3);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center">
      {/* step 1 enter email to send otp */}
      {step == 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px]  bg-white rounded-2xl  flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          {/* email field */}
          <div className="relative w-[90%] mt-[30px] ">
            <input
              type="email"
              id="email"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </div>

          {/*  send OTP button */}
          <button
            // onClick={handleSignIn}
            disabled={loading}
            className="mt-[30px] w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl   "
          >
            {loading ? <CgClipboard size={30} color="white" /> : "Send OTP"}
          </button>
        </div>
      )}

      {/* step 2  submite otp*/}
      {step == 2 && (
        <div className="w-[90%] max-w-[500px] h-[500px]  bg-white rounded-2xl  flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Enter OTP</h2>
          {/* email field */}
          <div className="relative w-[90%] mt-[30px] ">
            <input
              type="email"
              id="otp"
              placeholder=" "
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="peer w-full h-[55px] rounded-2xl px-[20px] outline-none border-2 border-black"
            />

            <label
              htmlFor="otp"
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
              Enter OTP
            </label>
          </div>

          {/*  send OTP button */}
          <button
            // onClick={handleSignIn}
            disabled={loading}
            className="mt-[30px] w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl   "
          >
            {loading ? <CgClipboard size={30} color="white" /> : "Submite OTP"}
          </button>
        </div>
      )}

      {/* step 3  submite otp*/}
      {step == 3 && (
        <div className="w-[90%] max-w-[500px] h-[500px]  bg-white rounded-2xl  flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Reset Password</h2>
          {/* new password field */}
          <div className="relative w-[90%]  mt-[30px]">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder=" "
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="peer w-full h-[55px] rounded-2xl px-[20px] pr-[55px] outline-none border-2 border-black"
            />

            {/* Eye Icon */}
            <div
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute top-[15px] right-[20px] cursor-pointer text-[22px]"
            >
              {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>

            <label
              htmlFor="newPassword"
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
              New Password
            </label>
          </div>

          {/* confirm password field */}
          <div className="relative w-[90%]  mt-[30px]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder=" "
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer w-full h-[55px] rounded-2xl px-[20px] pr-[55px] outline-none border-2 border-black"
            />

            {/* Eye Icon */}
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-[15px] right-[20px] cursor-pointer text-[22px]"
            >
              {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>

            <label
              htmlFor="confirmPassword"
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
              Confirm New Password
            </label>
          </div>

          {/*  send OTP button */}
          <button
            // onClick={handleSignIn}
            disabled={loading}
            className="mt-[30px] w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl   "
          >
            {loading ? (
              <CgClipboard size={30} color="white" />
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
