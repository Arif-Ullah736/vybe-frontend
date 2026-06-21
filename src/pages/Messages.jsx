import React from "react";

const Messages = () => {
  return (
    <div>
      <div className="  w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <FaArrowLeft
          className="w-[25px] h-[25px] cursor-pointer  text-white"
          onClick={() => navigate(`/profile/${userData?.userName}`)}
        />
        <h1 className="text-white text-[22px] font-semibold">Edit Profile</h1>
      </div>
    </div>
  );
};

export default Messages;
