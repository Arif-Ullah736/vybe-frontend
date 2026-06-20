import React, { useEffect, useState } from "react";
import dp from "../assets/dp.jpg";
import { LuCirclePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { markStoryAsViewed } from "../redux/storySlice";

const StoryDp = ({ userName, profileImage, story }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { viewedStories } = useSelector((state) => state.story);

  const isCurrentUserStory = userName === "Your Story";
  const isStoryViewed = story && viewedStories.includes(story._id);

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
    } else if (story) {
      handleViewers();
      // Mark other users' stories as viewed
      dispatch(markStoryAsViewed(story._id));
      navigate(`/story/${userName}`);
    }
  };

  // Change background based on viewed status
  const getBackgroundClass = () => {
    if (!story) return "";
    if (isCurrentUserStory) {
      return "bg-gradient-to-b from-blue-500 to-blue-950";
    }
    // For other users: blue if unviewed, gray if viewed
    if (isStoryViewed) {
      return "bg-gradient-to-b from-gray-400 to-gray-600";
    }
    return "bg-gradient-to-b from-blue-500 to-blue-950";
  };

  return (
    <div className="w-[80px] flex flex-col">
      <div
        className={` relative  flex items-center justify-center rounded-full w-[80px] h-[80px] ${getBackgroundClass()}`}
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
