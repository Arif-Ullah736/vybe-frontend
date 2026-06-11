import React, { useState } from "react";
import dp from "../assets/dp.jpg";
import VideoPlayer from "./VideoPlayer";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineInsertComment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";
import axios from "axios";
import { serverUrl } from "../App";
import { setPostData } from "../redux/postSlice";

const Post = ({ post }) => {
  const { userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.post);
  const [showComment, setShowComment] = useState(true);
  const [showComment, setShowComment] = useState(true);
  const [message, setMessage] = useState(true);
  const dispatch = useDispatch();

  //  handle like
  const handleLike = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/post/like/${post._id}`,
        { withCredentials: true },
      );
      const updatedPost = result.data.data;
      const updatedPosts = postData.map((p) =>
        p._id === post._id ? updatedPost : p,
      );
      dispatch(setPostData(updatedPosts));
    } catch (error) {
      console.log(error);
    }
  };

  // handle comment
  const handleComment = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/post/comment/${post._id}`,
        { message },
        { withCredentials: true },
      );
      const updatedPost = result.data.data;
      const updatedPosts = postData.map((p) =>
        p._id === post._id ? updatedPost : p,
      );
      dispatch(setPostData(updatedPosts));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[90%]  flex flex-col gap-[10px] bg-white items-center   shadow-2xl shadow-[#00000058]  rounded-2xl pb-[20px]">
      <div className="w-full h-[80px] flex justify-between items-center px-[10px]">
        <div className="flex items-center justify-center gap-[20px]">
          <div className="w-[60px] h-[60px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
            <img
              src={post.author?.profileImage || dp}
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div className="font-semibold truncate w-[200px]">
            {post.author?.userName}
          </div>
        </div>
        <button className="px-[10px] w-[60px]  md:w-[80px] py-[5px] h-[30px] md:h-[40px] bg-black text-white rounded-2xl  text-[14px]  md:text-[16px]">
          Follow
        </button>
      </div>

      <div className="w-[80%]   flex    items-center justify-center ">
        {post.mediaType === "image" && (
          <div className="w-[80%]] flex  items-center justify-center ">
            <img
              src={post.media}
              alt=""
              className="  w-[80%] rounded-2xl max-w-full object-cover"
            />
          </div>
        )}

        {post.mediaType === "video" && (
          <div className="w-[80%]  flex flex-col items-center justify-center ">
            <VideoPlayer media={post.media} />
          </div>
        )}
      </div>

      {/*  likes and comments section */}
      <div className="w-full h-[60px] flex items-center justify-between px-[20px] mt-[10px] ">
        {/* likes and comments */}
        <div className="flex items-center justify-center gap-[10px]">
          {/* likes */}
          <div
            className="flex items-center justify-center gap-[5px]"
            onClick={handleLike}
          >
            {!post.likes?.includes(userData._id) && (
              <GoHeart className="w-[25px] h-[25px] cursor-pointer" />
            )}
            {post.likes?.includes(userData._id) && (
              <GoHeartFill className="w-[25px] h-[25px] cursor-pointer text-red-600" />
            )}
            <span className="">{post.likes?.length || 0}</span>
          </div>
          {/* comments */}
          <div className="flex items-center justify-center gap-[5px]">
            <MdOutlineInsertComment className="w-[25px] h-[25px] cursor-pointer " />
            <span className="">{post.comments?.length || 0}</span>
          </div>
        </div>
        {/*save  icon */}
        <div className="flex items-center justify-center gap-[5px]">
          {!userData?.saved?.includes(post._id) && (
            <IoBookmarkOutline className="w-[25px] h-[25px] cursor-pointer " />
          )}
          {userData?.saved?.includes(post._id) && (
            <IoBookmark className="w-[25px] h-[25px] cursor-pointer " />
          )}
        </div>
      </div>

      {/* post caption */}
      {post.caption && (
        <div className="w-full px-[20px] gap-[10px] flex justify-start items-center">
          <h1>{post.author?.userName}</h1>
          <div>{post.caption}</div>
        </div>
      )}

      {/* show comment section */}
      {showComment && (
        <div className="w-full flex flex-col  gap-[30px] pb-[20px] ">
          <div className="w-full h-[80px] flex items-center justify-between  px-[20px] relative">
            <div className="w-[60px] h-[60px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
              <img
                src={post.author?.profileImage || dp}
                alt=""
                className="w-full object-cover"
              />
            </div>
            <input
              type="text"
              placeholder="write comment..."
              className="px-[10px] border-b-2 border-b-gray-500 w-[90%]  outline-none h-[40px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="absolute right-[20px] cursor-pointer"
              onClick={handleComment}
            >
              <BiSolidSend className="w-[25px] h-[25px]" />
            </button>
          </div>
          <div className="w-full max-h-[300px] overflow-auto"></div>
        </div>
      )}
    </div>
  );
};

export default Post;
