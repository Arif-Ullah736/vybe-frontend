import React from "react";
import dp from "../assets/dp.jpg";

const Post = ({ postData }) => {
  console.log("postData : ", postData);
  return (
    <div className="w-[90%] min-h-[450px] flex flex-col gap-[10px] bg-white items-center  shadow-2xl shadow-[#00000058]  rounded-2xl">
      <div className="w-[70px] h-[70px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
        <img
          src={postData.author?.profileImage || dp}
          alt=""
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Post;
