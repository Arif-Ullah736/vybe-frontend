import React from "react";
import { useSelector } from "react-redux";

const MessageArea = () => {
  const { selectedUser } = useSelector((state) => state.message);
  return (
    <div className="w-full h-screen bg-black relative ">
      <div className="flex items-center gap-[15px] px-[20px] py-[10px] fixed top-0  z-100 bg-black w-full "></div>
    </div>
  );
};

export default MessageArea;
