import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
export const Navbar = ({ isPostDetailOpened, onClosePageDetail }) => {
  return (
    <nav className="sm:mt-0 lg:mt-14  bg-white border-b mb-2">
      {isPostDetailOpened ? (
        <div className="flex items-center justify-start gap-2 font-semibold py-2">
          <button
            className="ml-4 cursor-pointer"
            onClick={() =>
              onClosePageDetail({ isOpened: false, postId: null })
            }
            aria-label="Close post detail"
          >
            <IoMdArrowRoundBack className="text-lg" />
          </button>
          <p>Post</p>
        </div>
      ) : (
        <ul className="flex gap-1 items-center justify-center">
          <li className="flex-1 flex items-center justify-center gap-1 border-b-2 hightlighted_tab pb-2">
            <FaRegUserCircle /> For You
          </li>
          <li className="flex-1 flex items-center justify-center gap-1 pb-2">
            <IoEarthOutline />
            General
          </li>
          <li className="flex-1 flex items-center justify-center gap-1 pb-2">
            <BiMoviePlay />
            Reel
          </li>
        </ul>
      )}
    </nav>
  );
};
