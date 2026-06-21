import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen  flex flex-col bg-black gap-[20px] p-[20px] ">
      <div className="  w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <FaArrowLeft
          className="w-[25px] h-[25px] cursor-pointer  text-white"
          onClick={() => navigate(`/profile/${userData?.userName}`)}
        />
        <h1 className="text-white text-[22px] font-semibold">Edit Profile</h1>
      </div>
    </div>
  );
};

export default Messages;
