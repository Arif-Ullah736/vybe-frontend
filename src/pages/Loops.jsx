import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoopsCard from "../components/LoopsCard";
import { useSelector } from "react-redux";

const Loops = () => {
  const navigate = useNavigate();
  const { loopData } = useSelector((state) => state.loop);
  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      <div className="fixed top-[10px] left-[10px] w-full h-[80px] flex items-center gap-[20px] px-[20px] z-50">
        <FaArrowLeft
          className="w-[25px] h-[25px] cursor-pointer text-white"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[22px] font-semibold">Loops</h1>
      </div>
      <div className="w-screen h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-none scroll-smooth">
        {loopData.map((loop, index) => (
          <div key={index} className="h-screen snap-start flex-shrink-0">
            <LoopsCard loop={loop} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loops;
