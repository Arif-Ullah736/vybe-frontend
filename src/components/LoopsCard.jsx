import React, { useRef } from "react";

const LoopsCard = ({ loop }) => {
  const videoRef = useRef();
  return (
    <div className="w-full lg:w-[480px] h-screen flex items-center justify-center border-l-2  border-r-2  border-gray-800 relative  ">
      <video src={loop.media} ref={videoRef} loop></video>
    </div>
  );
};

export default LoopsCard;
