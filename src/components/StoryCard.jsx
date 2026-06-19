import React, { useState, useEffect } from "react";
import dp from "../assets/dp.jpg";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";

const StoryCard = ({ story }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const progressPercentage = ((15 - timeLeft) / 15) * 100;
  return (
    <div className="w-full max-w-[500px] h-screen border-x-2 border-gray-800 pt-[10px] relative flex flex-col  justify-center  items-center ">
      {/* Progress Bar */}
      <div className="absolute top-[10px] left-0 right-0 w-full h-1 bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-200 ease-linear "
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex items-center    gap-[10px] left-2 absolute top-[20px] px-[10px ]">
        <FaArrowLeft
          className="w-[25px] h-[25px] cursor-pointer  text-white"
          onClick={() => navigate(`/`)}
        />
        <div className="w-[40px] h-[40px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
          <img
            src={story?.author?.profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div className="font-semibold truncate w-[100px] text-white">
          {story?.author?.userName}
        </div>
      </div>

      <div className="w-[80%]   flex    items-center justify-center  ">
        {story?.mediaType === "image" && (
          <div className="w-[80%]] flex  items-center justify-center ">
            <img
              src={story?.media}
              alt=""
              className="  w-[80%] rounded-2xl max-w-full object-cover"
            />
          </div>
        )}

        {story?.mediaType === "video" && (
          <div className="w-[80%]  flex flex-col items-center justify-center ">
            <VideoPlayer media={story?.media} />
          </div>
        )}
      </div>
      {/* handle story viewers */}
      {story?.author?.userName === userData?.userName && (
        <div className=" absolute w-full h-[70px]   bottom-0 p-2 mb-2 left-0  ">
          <div className="flex items-center gap-[5px] text-white">
            {" "}
            <FaEye />
            {story?.viewers?.length}
          </div>

          <div className="relative flex items-center  ">
            {story?.viewers?.slice(0, 3).map((viewer, index) => (
              <div
                key={index}
                className="w-[40px] h-[40px] rounded-full border-2 border-black cursor-pointer overflow-hidden "
                style={{ marginLeft: index > 0 ? "-15px" : "0" }}
              >
                <img
                  src={viewer?.profileImage || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
            ))}
            {/* viewers length */}
            {/* <div className="text-[22px] text-white md:text-[30px] font-semibold ml-2 ">
              {story?.viewers?.length}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryCard;
