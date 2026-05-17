import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dp from "../assets/dp.jpg";
import { useRef, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";
const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const imageInput = useRef();
  const [frontEndImage, setFrontEndImage] = useState(
    userData?.profileImage || dp,
  );
  const [backEndImage, setBackEndImage] = useState(null);
  const [name, setName] = useState(userData?.name || "");
  const [userName, setUserName] = useState(userData?.userName || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [profession, setProfession] = useState(userData?.profession || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackEndImage(file);
    setFrontEndImage(URL.createObjectURL(file));
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userName", userName);
      formData.append("bio", bio);
      formData.append("profession", profession);
      formData.append("gender", gender);
      if (backEndImage) {
        formData.append("profileImage", backEndImage);
      }
      const response = await axios.post(
        `${serverUrl}/api/v1/user/editProfile`,
        formData,
        {
          withCredentials: true,
        },
      );
      console.log("data ...", response.data);
      dispatch(setUserData(response.data.data));
      dispatch(setProfileData(response.data.data));
      navigate(`/profile/${response.data.data.userName}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile";
      alert("Error: " + errorMessage);
      console.log("EditProfile error:", error);
    }
  };

  return (
    <div className="w-full min-h-[100vh] pb-5 bg-black flex items-center flex-col gap-[20px]">
      <div className="  w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <FaArrowLeft
          className="w-[25px] h-[25px] cursor-pointer  text-white"
          onClick={() => navigate(`/profile/${userData?.userName}`)}
        />
        <h1 className="text-white text-[22px] font-semibold">Edit Profile</h1>
      </div>

      {/* profile  */}
      <div
        className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full border-2 border-black cursor-pointer overflow-hidden"
        onClick={() => imageInput.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          className="hidden"
          hidden
          id="profileImageInput"
          onChange={handleImage}
        />
        <img src={frontEndImage} alt="" className="w-full object-cover" />
      </div>

      {/* change profile image */}
      <div
        className="text-blue-500 text-center text-[18px] font-semibold cursor-pointer"
        onClick={() => imageInput.current.click()}
      >
        Change Your Profile Picture
      </div>

      {/* edit profile input */}

      {/* name */}
      <input
        type="text"
        placeholder="Enter Your Name"
        className="w-[90%] max-w-[600px] h-[60px] rounded-2xl bg-[#0a101010] border-2 border-gray-700 rounded-2xl text-white  font-semibold outline-none px-[20px]"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* user  name */}
      <input
        type="text"
        placeholder="Enter User Name"
        className="w-[90%] max-w-[600px] h-[60px] rounded-2xl bg-[#0a101010] border-2 border-gray-700 rounded-2xl text-white  font-semibold outline-none px-[20px]"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      {/* bio*/}
      <input
        type="text"
        placeholder="Bio"
        className="w-[90%] max-w-[600px] h-[60px] rounded-2xl bg-[#0a101010] border-2 border-gray-700 rounded-2xl text-white  font-semibold outline-none px-[20px]"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      {/* profession*/}
      <input
        type="text"
        placeholder="Profession"
        className="w-[90%] max-w-[600px] h-[60px] rounded-2xl bg-[#0a101010] border-2 border-gray-700 rounded-2xl text-white  font-semibold outline-none px-[20px]"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
      />

      {/* gender*/}
      <input
        type="text"
        placeholder="Gender"
        className="w-[90%] max-w-[600px] h-[60px] rounded-2xl bg-[#0a101010] border-2 border-gray-700 rounded-2xl text-white  font-semibold outline-none px-[20px]"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />

      <button
        className="w-[60%] max-w-[400px] h-[50px] px-[10px]  py-[5px] rounded-2xl bg-white cursor-pointer"
        onClick={handleEditProfile}
      >
        {loading ? <ClipLoader size={30} color="black" /> : "Save Changes"}
      </button>
    </div>
  );
};

export default EditProfile;
