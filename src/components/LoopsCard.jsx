import React, { useEffect, useRef, useState } from "react";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdVolumeOff } from "react-icons/io";
import dp from "../assets/dp.jpg";
import FollowButton from "./FollowButton";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineInsertComment } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setLoopData } from "../redux/loopSlice";

const LoopsCard = ({ loop }) => {
  const videoRef = useRef();
  const [mute, setMute] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const { userData } = useSelector((state) => state.user);
  const { loopData } = useSelector((state) => state.loop);
  const [showComment, setShowComment] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  //  handle like
  const handleLike = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/loop/like/${loop._id}`,
        { withCredentials: true },
      );

      if (result.data.success) {
        // Update the specific loop's likes in Redux
        const updatedLoops = loopData.map((p) =>
          p._id === loop._id
            ? {
                ...p,
                likes: p.likes?.includes(userData._id)
                  ? p.likes.filter((id) => id !== userData._id)
                  : [...(p.likes || []), userData._id],
              }
            : p,
        );
        dispatch(setLoopData(updatedLoops));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeOnDoubleClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 600);
    //  agar loop k likes array k andar current user k id nahy hai tho usi like kero
    !loop?.likes?.includes(userData?._id) ? handleLike() : null;
  };
  // handle comment
  const handleComment = async () => {
    if (!message.trim()) return;

    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/loop/comment/${loop._id}`,
        { message },
        { withCredentials: true },
      );

      if (result.data.success) {
        const updatedLoops = loopData.map((p) =>
          p._id === loop._id
            ? {
                ...p,
                comments: result.data.comments,
              }
            : p,
        );

        dispatch(setLoopData(updatedLoops));

        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    }
  };

  // handle video play and pause on click
  const handleClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 },
    );
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  return (
    <div className="w-full lg:w-[480px] lg:mx-auto h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {showHeart && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 heart-animation z-50 pointer-events-none">
          <GoHeartFill className="w-[120px] h-[120px] text-red-500 drop-shadow-2xl filter" />
        </div>
      )}
      <video
        src={loop.media}
        ref={videoRef}
        loop
        autoPlay
        muted={mute}
        playsInline
        className="w-full h-full object-cover"
        onClick={handleClick}
        onTimeUpdate={handleTimeUpdate}
        onDoubleClick={handleLikeOnDoubleClick}
      />

      {/* mute icon */}
      <div
        className="absolute bottom-[10px] right-[10px]"
        onClick={() => setMute((prev) => !prev)}
      >
        {mute ? (
          <IoMdVolumeOff className="text-white w-[20px] h-[20px] font-semibold " />
        ) : (
          <IoVolumeHigh className="text-white w-[20px] h-[20px] font-semibold " />
        )}
      </div>

      {/* prgess bar */}
      <div className=" absolute  bottom-0 left-0 w-full h-[5px] bg-gray-900">
        <div
          className="w-[200px] h-full  bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* user information */}
      <div className="w-full h-[100px]  absolute bottom-[10px]  ">
        <div className="flex items-center pl-[10px]    gap-[10px]">
          <div className="w-[40px] h-[40px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
            <img
              src={loop.author?.profileImage || dp}
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div className="font-semibold truncate w-[100px] text-white">
            {loop.author?.userName}
          </div>
          <FollowButton
            targetUserId={loop?.autho?.id}
            tailwind={
              "px-[10px] py-[5px] text-white border-2 border-white rounded-2xl  text-[14p]"
            }
          />
        </div>
        <div className="text-white pl-[10px]">{loop.caption}</div>

        {/* like and comment section */}
        <div className="absolute right-0 bottom-[150px]  flex flex-col justify-center px-[10px] gap-[20px] text-white">
          {/* like ... */}
          <div
            onClick={handleLike}
            className="flex flex-col items-center cursor-pointer"
          >
            <div>
              {!loop.likes?.includes(userData._id) && (
                <GoHeart className="w-[25px] h-[25px] cursor-pointer" />
              )}
              {loop.likes?.includes(userData._id) && (
                <GoHeartFill className="w-[25px] h-[25px] cursor-pointer text-red-600" />
              )}
            </div>
            <div>
              <span className="">{loop.likes?.length || 0}</span>
            </div>
          </div>

          {/* comment ... */}
          <div className="flex items-center justify-center flex-col cursor-pointer">
            <div>
              <MdOutlineInsertComment
                onClick={() => setShowComment((prev) => !prev)}
                className="w-[25px] h-[25px] cursor-pointer "
              />
            </div>
            <div>
              <span className="">{loop.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Panel */}
      {showComment && (
        <div className="absolute inset-0 bg-black bg-opacity-60 z-40">
          <div className="absolute right-0 top-0 w-full md:w-[400px] h-full bg-black border-l border-gray-700 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold text-lg">Comments</h3>
              <button
                onClick={() => setShowComment(false)}
                className="text-white hover:opacity-70"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
              {loop.comments && loop.comments.length > 0 ? (
                loop.comments.map((comment, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={comment.author?.profileImage || dp}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-900 rounded-lg px-3 py-2">
                        <p className="text-white font-semibold text-sm">
                          {comment.author?.userName}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {comment.message}
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>No comments yet. Be the first!</p>
                </div>
              )}
            </div>

            {/* Comment Input */}
            <div className="border-t border-gray-700 p-4 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleComment();
                  }
                }}
                placeholder="Add a comment..."
                className="flex-1 bg-gray-900 text-white rounded-full px-4 py-2 outline-none focus:border focus:border-gray-600 text-sm"
              />
              <button
                onClick={handleComment}
                disabled={!message.trim()}
                className="text-blue-500 hover:text-blue-400 disabled:text-gray-600 transition"
              >
                <TbSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoopsCard;
