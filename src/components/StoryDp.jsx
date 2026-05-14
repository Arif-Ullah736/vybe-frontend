import React from "react";
import dp from "../assets/dp.jpg";
const StoryDp = ({ userName }) => {
  return (
    <div className="w-[80px] flex flex-col">
      <div className=" flex items-center justify-center rounded-full w-[80px] h-[80px] bg-gradient-to-b from-blue-500 to-blue-950">
        <div className="w-[70px] h-[70px] rounded-full border-2 border-black cursor-pointer overflow-hidden rounded-full flex items-center justify-center">
          <img src={dp} alt="" className="w-full object-cover" />
        </div>
      </div>
      <div className="text-[14px] text-center truncate text-white">
        {userName}
      </div>
    </div>
  );
};

export default StoryDp;
