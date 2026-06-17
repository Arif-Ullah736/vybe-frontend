import React from "react";
import dp from "../assets/dp.jpg";
const StoryCard = ({ story }) => {
  return (
    <div className="w-full max-w-[500px] h-screen border-x-2 border-gray-800 pt-[10px] relative flex flex-col  justify-center ">
      <div className="flex items-center    gap-[10px]">
        <div className="w-[40px] h-[40px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
          <img
            src={story.author?.profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div className="font-semibold truncate w-[100px] text-white">
          {story.author?.userName}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
