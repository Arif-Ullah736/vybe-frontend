import React, { useEffect, useRef, useState } from "react";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdVolumeOff } from "react-icons/io";

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
    </div>
  );
};

export default LoopsCard;
