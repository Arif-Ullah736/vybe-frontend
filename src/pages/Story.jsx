import React, { useEffect } from "react";
import StoryCard from "../components/StoryCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setStoryData } from "../redux/storySlice";

const Story = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { stroyData } = useSelector((state) => state.story);

  const handleStory = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/story/getStory/${userName}`,
        { withCredentials: true },
      );
      dispatch(setStoryData(result.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userName) {
      handleStory();
    }
  }, [userName]);
  return (
    <div className="w-full h-screen bg-black  flex justify-center  items-center">
      <StoryCard story={stroyData} />
    </div>
  );
};

export default Story;
