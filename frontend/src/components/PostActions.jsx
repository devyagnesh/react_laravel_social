import { CiHeart } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { GoEye } from "react-icons/go";

const PostActions = ({ totalLikes=0,  isLiked ,onClick , totalComments=0, totalViews=0}) => {

  return (
    <div className="flex w-80 mt-4">
      <button className="flex items-center justify-center flex-1 gap-1 border border-r-0 rounded-full rounded-tr-none rounded-br-none py-1" onClick={onClick}>
        {isLiked ? <FaHeart className="text-red-600"/> : <CiHeart/>}
        {totalLikes ? totalLikes : "0"}
      </button>
      <button className="flex items-center justify-center flex-1 gap-1 border py-1">
        <LiaCommentDotsSolid className="" /> {totalComments ? totalComments : 0}
      </button>
      <button className="flex items-center justify-center flex-1 gap-1 border border-l-0 rounded-full rounded-tl-none rounded-bl-none py-1">
        <GoEye /> {totalViews ? totalViews : 0}
      </button>
    </div>
  );
};

export default PostActions;
