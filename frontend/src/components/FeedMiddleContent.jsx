import React, { useEffect, useState } from 'react'
import ScrollablePosts from "@/components/ScrollablePosts";
import PostDetails from './PostDetails';
import { Navbar } from './Navbar';
export const FeedMiddleContent = () => {
  const [isPostDetailOpened,setIsPageDetailOpened] = useState({isOpened :  false, postId : null});
  useEffect(()=>{},[isPostDetailOpened]);
  return (
    <div className="sm:w-auto min-h-screen flex-1 border-l border-r">
         <Navbar isPostDetailOpened={isPostDetailOpened.isOpened} onClosePageDetail={setIsPageDetailOpened}/>
          {
            isPostDetailOpened.isOpened && isPostDetailOpened !== null ? <PostDetails postid={isPostDetailOpened.postId} />: 
          <ScrollablePosts onClick={(isOpened,id)=>{setIsPageDetailOpened({isOpened:isOpened,postId:id})}}/>
          }
        </div>
  )
}
