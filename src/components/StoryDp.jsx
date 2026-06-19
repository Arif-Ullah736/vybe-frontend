import React from "react";
import dp from "../assets/dp.jpg";
import { LuCirclePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";

const StoryDp = ({ userName, profileImage, story }) => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const handleViewers = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/story/view/${story._id}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (!story && userName === "Your Story") {
      navigate("/upload");
    } else if (story && userName === "Your Story") {
      handleViewers();
      navigate(`/story/${userData.userName}`);
    } else {
      handleViewers();
      navigate(`/story/${userName}`);
    }
  };
  return (
    <div className="w-[80px] flex flex-col">
      <div
        className={` relative  flex items-center justify-center rounded-full w-[80px] h-[80px] ${story ? " bg-gradient-to-b from-blue-500 to-blue-950" : ""}`}
      >
        <div
          className="w-[70px] h-[70px] rounded-full border-2 border-black cursor-pointer overflow-hidden rounded-full flex items-center justify-center"
          onClick={handleClick}
        >
          <img
            src={profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
        </div>
        {!story && userName === "Your Story" && (
          <LuCirclePlus className=" bg-white w-[22px] h-[22px] rounded-full   absolute bottom-[8px] right-[10px]" />
        )}
      </div>

      <div className="text-[14px] text-center truncate text-white">
        {userName}
      </div>
    </div>
  );
};

export default StoryDp;
