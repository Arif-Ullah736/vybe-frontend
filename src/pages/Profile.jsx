import React from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../redux/userSlice";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.user);

  const handleProfile = async () => {
    console.log("profile clicke...");
    try {
      const response = await axios.get(
        `${serverUrl}/api/v1/user/getProfile/${userName}`,
        { withCredentials: true },
      );
      dispatch(setProfileData(response.data.data));
      console.log("profile data", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName]);

  return (
    <div className="w-full min-h-screen  bg-black">
      {/* top content */}
      <div className="text-white flex items-center justify-between w-full p-5">
        <FaArrowLeft />
        <p>username</p>
        <button>Log Out</button>
      </div>

      {/* user profile */}
      <div className="w-lvh">
        {/* profile image */}
        <div></div>
        {/* profile details */}
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
