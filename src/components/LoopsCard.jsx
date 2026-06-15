import React, { useEffect, useRef, useState } from "react";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdVolumeOff } from "react-icons/io";
import dp from "../assets/dp.jpg";
import FollowButton from "./FollowButton";

const LoopsCard = ({ loop }) => {
  const videoRef = useRef();
  const [mute, setMute] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

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
        <div className="absolute right-0 bottom-[100px]  flex flex-col justify-center px-[10px] gap-[20px] text-white"></div>
      </div>
    </div>
  );
};

export default LoopsCard;
