import React from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.jpg";
import Navbar from "../components/Navbar";
const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.user);
  const navigate = useNavigate();
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

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/v1/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen  bg-black">
      {/* top content */}
      <div className="text-white flex items-center justify-between w-full h-[80px] px-[30px]">
        <FaArrowLeft
          className=" text-white w-[25px] h-[25px] "
          onClick={handleBack}
        />
        <p className="text-semibold  text-[20px]">{userName}</p>
        <button
          onClick={handleLogOut}
          className="font-semibold cursor-pointer text-[20px] text-blue-500"
        >
          Log Out
        </button>
      </div>

      {/* user profile */}
      <div className="flex  items-top justify-center w-full mt-10 gap-10 ">
        {/* profile image */}
        <div className="w-20 h-20 rounded-full">
          <img
            src={dp}
            alt="profile image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* profile details */}
        <div className="text-white">
          <p>{profileData.name || "John Doe"}</p>
          <p>{profileData.userName || "john_doe"}</p>
          <p>{profileData.bio || "No bio available"}</p>
        </div>
      </div>

      {/* post followers folllowing detial */}
      <div className="flex items-center justify-center gap-10 text-white mt-8">
        {/* Post */}
        <div className="">
          <p>100</p>
          <p>Posts </p>
        </div>

        {/* Followers */}
        <div>
          <p>100k</p>
          <p>Followers </p>
        </div>

        {/* Following */}
        <div>
          <p>500</p>
          <p>Following </p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="flex items-center justify-center mt-8">
        <button className="bg-white  text-black font-bold py-2 px-12 rounded-full">
          Edit Profile
        </button>
      </div>

      {/* footer part */}
      <div className="bg-white w-[60%] mx-auto h-48 rounded-t-2xl mt-5 flex items-center justify-center ">
        <Navbar />
      </div>
    </div>
  );
};

export default Profile;
