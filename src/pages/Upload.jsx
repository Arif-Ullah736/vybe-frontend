import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PiCalendarPlusBold } from "react-icons/pi";

const Upload = () => {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("post");
  const [frontEndMedia, setFronEndMedia] = useState(null);
  const [backEndMedia, setBackEndMedia] = useState(null);

  return (
    <div className="w-full h-screen flex items-center flex-col bg-black ">
      <div className="  w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <FaArrowLeft
          className="w-[25px] h-[25px] cursor-pointer  text-white"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[22px] font-semibold">Upload Media</h1>
      </div>

      <div className="w-[90%] max-w-[600px] h-[80px] bg-white  rounded-full flex justify-around items-center gap-[10px]">
        {/* post  */}
        <div
          className={`  ${uploadType === "post" ? "bg-black text-white" : ""} w-[28%] h-[80%]  flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("post")}
        >
          Post
        </div>

        {/* story  */}
        <div
          className={`  ${uploadType === "story" ? "bg-black text-white" : ""} w-[28%] h-[80%]  flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("story")}
        >
          Story
        </div>

        {/* loop  */}
        <div
          className={`  ${uploadType === "loop" ? "bg-black text-white" : ""} w-[28%] h-[80%]  flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("loop")}
        >
          Loop
        </div>
      </div>

      <div className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] bg-gray-800  border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl  cursor-pointer hover:bg-[#353a3d]  ">
        <PiCalendarPlusBold
          className="text-white w-[25px]  h-[25px] cursor-pointer
"
        />
        <div className="text-white text-[20px] font-semibold">
          upload {uploadType}
        </div>
      </div>
    </div>
  );
};

export default Upload;
