import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { PiCalendarPlusBold } from "react-icons/pi";
import VideoPlayer from "../components/VideoPlayer";
import { serverUrl } from "../App";
import axios from "axios";
import { setPostData } from "../redux/postSlice";
import { setLoopData } from "../redux/loopSlice";
import { setStoryData } from "../redux/storySlice";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";

const Upload = () => {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("post");
  const [frontEndMedia, setFronEndMedia] = useState(null);
  const [backEndMedia, setBackEndMedia] = useState(null);
  const mediaInput = useRef();
  const [mediaType, setMediaType] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.post);
  const { loopData } = useSelector((state) => state.loop);
  const { storyData } = useSelector((state) => state.story);

  // handle media file selection
  const handleMedia = (e) => {
    const file = e.target.files[0];
    setFronEndMedia(URL.createObjectURL(file));
    setBackEndMedia(file);
    if (file.type.includes("image")) {
      setMediaType("image");
    } else {
      setMediaType("video");
    }
  };
  const uploadPost = async () => {
    try {
      const formData = new FormData();
      formData.append("uploadMedia", backEndMedia);
      formData.append("caption", caption);
      formData.append("mediaType", mediaType);
      const result = await axios.post(
        `${serverUrl}/api/v1/post/uploadPost`,
        formData,
        {
          withCredentials: true,
        },
      );
      console.log("result : ", result);
      dispatch(setPostData([...postData, result.data]));
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log("❌ Upload error:", err);
      setLoading(false);
    }
  };

  const uploadStory = async () => {
    try {
      const formData = new FormData();
      formData.append("media", backEndMedia);
      formData.append("mediaType", mediaType);
      const result = await axios.post(
        `${serverUrl}/api/v1/story/upload`,
        formData,
        {
          withCredentials: true,
        },
      );
      console.log("result : ", result);
      dispatch(setStoryData([...storyData, result.data]));
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log("❌ Upload error:", err);
      setLoading(false);
    }
  };

  const uploadLoop = async () => {
    try {
      const formData = new FormData();
      formData.append("video", backEndMedia);
      formData.append("caption", caption);
      const result = await axios.post(
        `${serverUrl}/api/v1/loop/upload`,
        formData,
        {
          withCredentials: true,
        },
      );
      console.log("result : ", result);
      dispatch(setLoopData([...loopData, result.data]));
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log("❌ Upload error:", err);
      setLoading(false);
    }
  };

  const handleUpload = () => {
    console.log("button was clicked");
    setLoading(true);
    if (uploadType === "post") {
      uploadPost();
    }
    if (uploadType === "story") {
      uploadStory();
    }
    if (uploadType === "loop") {
      uploadLoop();
    }
  };

  return (
    <div className="w-full h-screen flex items-center flex-col bg-black pb-10 ">
      <div className="  w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <FaArrowLeft
          className="w-[25px] h-[25px] cursor-pointer  text-white"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[22px] font-semibold">Upload Media</h1>
      </div>

      <div className="w-[90%] max-w-[600px] h-[80px] bg-white  rounded-full flex justify-around items-center gap-[10px]">
        {/* post  */}
        <div
          className={`  ${uploadType === "post" ? "bg-black text-white" : ""} w-[28%] h-[80%]  flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("post")}
        >
          Post
        </div>
        .{/* story  */}
        <div
          className={`  ${uploadType === "story" ? "bg-black text-white" : ""} w-[28%] h-[80%]  flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("story")}
        >
          Story
        </div>
        {/* loop  */}
        <div
          className={`  ${uploadType === "loop" ? "bg-black text-white" : ""} w-[28%] h-[80%]  flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("loop")}
        >
          Loop
        </div>
      </div>

      {/* upload media section */}
      {!frontEndMedia && (
        <div
          className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] bg-gray-800  border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl  cursor-pointer hover:bg-[#353a3d]  "
          onClick={() => mediaInput.current.click()}
        >
          <input type="file" hidden ref={mediaInput} onChange={handleMedia} />
          <PiCalendarPlusBold
            className="text-white w-[25px]  h-[25px] cursor-pointer
"
          />
          <div className="text-white text-[20px] font-semibold">
            upload {uploadType}
          </div>
        </div>
      )}

      {frontEndMedia && (
        <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[15vh]">
          {mediaType === "image" && (
            <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]">
              <img
                src={frontEndMedia}
                alt=""
                className="  h-[60%] rounded-2xl"
              />
              {uploadType !== "story" && (
                <input
                  type="text"
                  value={caption}
                  placeholder="Write  caption..."
                  className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px] "
                  onChange={(e) => setCaption(e.target.value)}
                />
              )}
            </div>
          )}

          {mediaType === "video" && (
            <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]">
              <VideoPlayer media={frontEndMedia} />
              {uploadType !== "story" && (
                <input
                  type="text"
                  value={caption}
                  placeholder="Write  caption..."
                  className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px] "
                  onChange={(e) => setCaption(e.target.value)}
                />
              )}
            </div>
          )}
        </div>
      )}
      {frontEndMedia && (
        <button
          className="bg-white   font-semibold py-[5px] px-[10px] w-[60%] max-w-[400px]  h-[50px]  rounded-2xl cursor-pointer mt-[50px]"
          onClick={handleUpload}
        >
          {loading ? (
            <ClipLoader size={30} color="black" />
          ) : (
            ` Upload ${uploadType} `
          )}
        </button>
      )}
    </div>
  );
};

export default Upload;
