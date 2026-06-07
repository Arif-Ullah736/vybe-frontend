import React from "react";

const Post = ({ postData }) => {
  console.log("postData : ", postData);
  return <div>{postData.data.caption}</div>;
};

export default Post;
