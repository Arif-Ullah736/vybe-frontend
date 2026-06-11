import React from "react";
import dp from "../assets/dp.jpg";
import VideoPlayer from "./VideoPlayer";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineInsertComment } from "react-icons/md";
import { useSelector } from "react-redux";
const Post = ({ postData }) => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-[90%]  flex flex-col gap-[10px] bg-white items-center   shadow-2xl shadow-[#00000058]  rounded-2xl pb-[20px]">
      <div className="w-full h-[80px] flex justify-between items-center px-[10px]">
        <div className="flex items-center justify-center gap-[20px]">
          <div className="w-[60px] h-[60px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
            <img
              src={postData.author?.profileImage || dp}
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div className="font-semibold truncate w-[200px]">
            {postData.author?.userName}
          </div>
        </div>
        <button className="px-[10px] w-[60px]  md:w-[80px] py-[5px] h-[30px] md:h-[40px] bg-black text-white rounded-2xl  text-[14px]  md:text-[16px]">
          Follow
        </button>
      </div>

      <div className="w-[80%]   flex    items-center justify-center ">
        {postData.mediaType === "image" && (
          <div className="w-[80%]] flex  items-center justify-center ">
            <img
              src={postData.media}
              alt=""
              className="  w-[80%] rounded-2xl max-w-full object-cover"
            />
          </div>
        )}

        {postData.mediaType === "video" && (
          <div className="w-[80%]  flex flex-col items-center justify-center ">
            <VideoPlayer media={postData.media} />
          </div>
        )}
      </div>

      {/*  likes and comments section */}
      <div className="w-full h-[60px] flex items-center justify-between px-[20px] mt-[10px] ">
        {/* likes and comments */}
        <div className="flex">
          {/* likes */}
          <div>
            {!postData.likes.includes(userData._id) && <GoHeart />}
            {postData.likes.includes(userData._id) && <GoHeartFill />}
            <span className="">{postData.likes.length}</span>
          </div>
          {/* comments */}
          <div>
            <MdOutlineInsertComment />
            <span className="">{postData.comments.length}</span>
          </div>
        </div>
        {/* icon */}
        <div></div>
      </div>
    </div>
  );
};

export default Post;
