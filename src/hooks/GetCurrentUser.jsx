import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing, setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userData) {
      const fetchUser = async () => {
        try {
          const result = await axios.get(`${serverUrl}/api/v1/user/getUser`, {
            withCredentials: true,
          });
          console.log(result.data);
          dispatch(setUserData(result.data.data));
          dispatch(setFollowing(result.data.data.following));
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [userData, dispatch]);
};

export default useGetCurrentUser;
