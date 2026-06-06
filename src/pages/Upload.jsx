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

      <div className="w-[80%] max-w-[600px] h-[80px] bg-white  rounded-full flex justify-around items-center gap-[10px]">
        <div className="w-[28%] h-[80%]  flex justify-center items-center text-[19px]">
          Post
        </div>
        <div className="w-[28%] h-[80%]  flex justify-center items-center text-[19px]">
          Story
        </div>
        <div className="w-[28%] h-[80%]  flex justify-center items-center text-[19px]">
          Loop
        </div>
      </div>
    </div>
  );
};

export default Upload;
