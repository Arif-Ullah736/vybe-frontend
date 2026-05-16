import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px]">
      <div
        className="absolute left-0 p-4 text-white  cursor-pointer"
        onClick={() => navigate(`/profile/${userData?.userName}`)}
      >
        <FaArrowLeft className="w-[25px] h-[25px]   " />
      </div>
    </div>
  );
};

export default EditProfile;
