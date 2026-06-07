import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.post);
  useEffect(() => {
    if (!postData) {
      const fetchPost = async () => {
        try {
          const result = await axios.get(
            `${serverUrl}/api/v1/post/getAllPosts`,
            {
              withCredentials: true,
            },
          );
          console.log(result.data);
          dispatch(setPostData(result.data.data));
        } catch (error) {
          console.log(error);
        }
      };
      fetchPost();
    }
  }, [dispatch]);
};

export default useGetAllPost;
