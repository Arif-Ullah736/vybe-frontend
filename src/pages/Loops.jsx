import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Loops = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-black overflow-hidden  flex items-center justify-center  ">
      <div className="fixed top-[10px] left-[10px]  w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <FaArrowLeft
          className="w-[25px] h-[25px] cursor-pointer  text-white"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[22px] font-semibold">Loops</h1>
      </div>
    </div>
  );
};

export default Loops;
