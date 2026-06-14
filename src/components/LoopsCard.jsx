import React, { useEffect, useRef } from "react";

const LoopsCard = ({ loop }) => {
  const videoRef = useRef();
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
        // autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LoopsCard;
