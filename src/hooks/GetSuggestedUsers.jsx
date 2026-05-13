import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers, setUserData } from "../redux/userSlice";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userData) {
      const fetchUser = async () => {
        try {
          const result = await axios.get(
            `${serverUrl}/api/v1/user/suggestedUsers`,
            {
              withCredentials: true,
            },
          );
          console.log(result.data);
          dispatch(setSuggestedUsers(result.data.data));
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [userData]);
};

export default useGetSuggestedUsers;
