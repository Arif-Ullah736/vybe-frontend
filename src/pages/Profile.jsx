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
import FollowButton from "../components/FollowButton";
const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { profileData, userData } = useSelector((state) => state.user);
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
          className=" text-white w-[25px] h-[25px]  cursor-pointer"
          onClick={() => navigate("/")}
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
      <div className="flex  items-start justify-center w-full h-[150px]  pt-[20px] px-[10px] gap-[20px] lg:gap-[50px]">
        {/* profile image */}
        <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
          <img
            src={profileData?.profileImage || dp}
            alt=""
            className="w-full object-cover"
          />
        </div>
        {/* profile details */}
        <div className="text-white">
          <p className="text-[22px] font-semibold">{profileData?.name}</p>
          <p className="text-[17px] text-[#ffffe8] ">
            {profileData?.profession || "New User"}
          </p>
          <p className="text-[17px] text-[#ffffe8] ">
            {profileData?.bio || "No bio available"}
          </p>
        </div>
      </div>

      {/* post followers folllowing detial */}
      <div className="flex items-center justify-center w-full h-[100px] md:gap-[60px]   text-white mt-8 gap-[40px]  px-[20%] pt-[30px]">
        {/* Post */}
        <div className="">
          <p className="text-[22px] md:text-[30px] font-semibold">
            {profileData?.posts.length}
          </p>
          <p className="text-[18px] md:text-[22px] text-[#ffffffc7]">Posts </p>
        </div>

        {/* Followers */}
        <div className=" ">
          <div className="">
            {/* followers image  */}
            <div className="relative flex  ">
              {profileData?.followers?.slice(0, 3).map((user, index) => (
                <div
                  key={index}
                  className={` w-[40px] h-[40px] rounded-full border-2 border-black cursor-pointer overflow-hidden ${index > 0 ? `absolute left-[${index * 9}]` : ""}`}
                >
                  <img
                    src={user?.profileImage || dp}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
              ))}
              {/* followers length */}
              <div className="text-[22px] text-white md:text-[30px] font-semibold ml-[15px] ">
                {profileData?.followers.length}
              </div>
            </div>
          </div>

          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Followers{" "}
          </div>
        </div>

        {/* Following */}
        <div className=" ">
          <div className="">
            {/* followers image  */}
            <div className="relative flex  ">
              {/* image1 */}
              <div className=" absolute w-[40px] h-[40px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
                <img
                  src={profileData?.profileImage || dp}
                  alt=""
                  className="w-full object-cover"
                />
                {/* following length */}
                <div className="text-[22px] md:text-[30px] font-semibold ml-[15px] ">
                  {profileData?.following.length}
                </div>
              </div>

              {/* image2 */}
              <div className=" absolute left-[10px] w-[40px] h-[40px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
                <img
                  src={profileData?.profileImage || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>

              {/* image3 */}
              <div className="absolute left-[18px] w-[40px] h-[40px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
                <img
                  src={profileData?.profileImage || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Following{" "}
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-[10px] w-full h-[80px] flex items-center justify-center gap-[20px]">
        {profileData?._id === userData?._id && (
          <button
            onClick={() => navigate("/editprofile")}
            className="bg-white  text-black font-bold py-2 px-[10px] py-[5px] h-[40px] min-w-[150px] rounded-2xl cursor-pointer"
          >
            Edit Profile
          </button>
        )}

        {profileData?._id !== userData?._id && (
          <>
            <FollowButton
              tailwind={
                "bg-white  text-black font-bold py-2 px-[10px] py-[5px] h-[40px] min-w-[150px] rounded-2xl cursor-pointer"
              }
              targetUserId={profileData?._id}
              onFollowChange={handleProfile}
            />

            <button className="bg-white  text-black font-bold py-2 px-[10px] py-[5px] h-[40px] min-w-[150px] rounded-2xl cursor-pointer">
              Message
            </button>
          </>
        )}
      </div>

      {/* footer part */}
      <div className=" w-full min-h-[100vh] flex justify-center ">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px]  bg-white relative gap-[20px] pt-[30px]">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Profile;
