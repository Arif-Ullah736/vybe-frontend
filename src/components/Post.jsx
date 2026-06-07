import React from "react";
import dp from "../assets/dp.jpg";

const Post = ({ postData }) => {
  console.log("postData : ", postData);
  return (
    <div className="w-[90%] min-h-[450px] flex flex-col gap-[10px] bg-white items-center  shadow-2xl shadow-[#00000058]  rounded-2xl">
      <div className="w-full h-[80px] flex justify-between items-center px-[10px]">
        <div className="flex items-center justify-center gap-[20px]">
          <div className="w-[60px] h-[60px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
            <img
              src={postData.author?.profileImage || dp}
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div className="font-semibold truncate w-[200px]">
            {postData.author?.userName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
