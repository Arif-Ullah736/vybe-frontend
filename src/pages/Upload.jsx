import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Upload = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center flex-col bg-black ">
      <div className="  w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <FaArrowLeft
          className="w-[25px] h-[25px] cursor-pointer  text-white"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[22px] font-semibold">Upload Media</h1>
      </div>
    </div>
  );
};

export default Upload;
