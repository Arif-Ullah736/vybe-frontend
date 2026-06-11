import React from "react";
import { FaRegHeart } from "react-icons/fa";
import logo5 from "../assets/logo5.png";
import StoryDp from "./StoryDp";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Post from "./Post";

const Feed = () => {
  const { postData } = useSelector((state) => state.post);
  console.log("post data =====", postData);
  return (
    <div className="w-full lg:w-[50%]  min-h-[100vh] lg:h-[100vh] bg-black relative lg:overflow-y-auto overflow-hidden ">
      {/* users profile */}
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
        <img src={logo5} alt="" className="w-[80px] " />
        <div>
          <FaRegHeart className="text-white w-[25px] h-[25px]" />
        </div>
      </div>

      {/* story cards */}
      <div className="w-full flex overflow-x-auto scrollbar-none gap-[20px] items-center  p-[20px]">
        <StoryDp userName="Arifasfsfsdfdsafds" />
        <StoryDp userName="Arif" />
        <StoryDp userName="Arif" />
        <StoryDp userName="Arif" />
        <StoryDp userName="Arif" />
        <StoryDp userName="Arif" />
        <StoryDp userName="Arif" />
        <StoryDp userName="Arif" />
        <StoryDp userName="Arif" />
      </div>

      {/* posts  */}
      <div className="w-full min-h-screen flex flex-col  items-center  gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]  ">
        <Navbar />
        {/* post data */}
        {postData?.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
