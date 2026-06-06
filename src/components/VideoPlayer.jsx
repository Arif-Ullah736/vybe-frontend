import React from "react";

const VideoPlayer = ({ media }) => {
  return (
    <div className="h-full  relative cursor-pointer max-w-full rounded-2xl outline-hidden">
      <video src={media} autoPlay loop />
    </div>
  );
};

export default VideoPlayer;
