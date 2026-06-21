import React from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.jpg";

const MessageArea = () => {
  const { selectedUser } = useSelector((state) => state.message);
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-black relative ">
      <div className="flex items-center  gap-[15px] px-[20px] py-[10px] fixed top-0  z-100 bg-black w-full ">
        <div className="   h-[80px] flex items-center gap-[20px] px-[20px]">
          <FaArrowLeft
            className="w-[25px] h-[25px] cursor-pointer  text-white "
            onClick={() => navigate(`/`)}
          />
        </div>
        <div
          className="w-[40px] h-[40px] rounded-full border-2 border-black cursor-pointer overflow-hidden"
          onClick={() => navigate(`/profile/${selectedUser?.userName}`)}
        >
          <img
            src={selectedUser?.profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
