import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdVolumeOff } from "react-icons/io";

const VideoPlayer = ({ media }) => {
  const videoTag = useRef();
  const [mute, setMute] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // handle video play and pause on click
  const handleClick = () => {
    if (isPlaying) {
      videoTag.current.pause();
      setIsPlaying(false);
    } else {
      videoTag.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoTag.current;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 },
    );
    if (videoTag.current) {
      observer.observe(videoTag.current);
    }
    return () => {
      if (videoTag.current) {
        observer.unobserve(videoTag.current);
      }
    };
  }, []);
  return (
    <div className="h-full  relative cursor-pointer max-w-full rounded-2xl outline-hidden">
      <video
        src={media}
        autoPlay
        loop
        muted={mute}
        ref={videoTag}
        className="h-full cursor-pointer w-full object-cover rounded-2xl"
        onClick={handleClick}
      />
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
    </div>
  );
};

export default VideoPlayer;
