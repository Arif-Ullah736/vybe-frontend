import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing, setUserData } from "../redux/userSlice";
import { setStoryList } from "../redux/storySlice";

const useGetAllStories = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { storyData } = useSelector((state) => state.story);
  const { storyListData } = useSelector((state) => state.story);

  useEffect(() => {
    if (!userData) {
      const fetchAllStories = async () => {
        try {
          const result = await axios.get(
            `${serverUrl}/api/v1/story/getStories`,
            {
              withCredentials: true,
            },
          );
          console.log(result.data);
          dispatch(setStoryList(result.data.data));
        } catch (error) {
          console.log(error);
        }
      };
      fetchAllStories();
    }
  }, [userData]);
};

export default useGetAllStories;
