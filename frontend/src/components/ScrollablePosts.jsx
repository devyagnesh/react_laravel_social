import { getAllPosts, togglePostLike } from "@/services/posts/postsServices";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import PostActions from "./PostActions";

const ScrollablePosts = ({onClick}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getAllPosts();
      const updatedPosts = data.data.map((post) => ({
        ...post,
        isLiked: false,
      }));
      setPosts(updatedPosts);
    }

    fetchPosts();
  }, []);

  async function toggleLike(postId) {
    const data = await togglePostLike({
      post_id: postId,
    });

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: data.isLiked, total_likes: post.total_likes + (data.isLiked ? 1 : -1) }
          : post
      )
    );
  }

  return (
    <div className="h-screen overflow-y-auto no-scrollbar bg-white rounded-lg p-4">
      {posts.map((post) => (
        <Card key={post.id} className="p-0 my-6 border-b border-x-0  border-t-0  rounded-none shadow-none">
          <CardHeader className="p-1">
            <div className="flex items-center justify-start gap-2">
              <img
                src={post.user.profile_img}
                className="rounded-full w-8 h-8 object-cover"
                alt=""
              />
              <div>
                <p className="font-bold leading-[1]">{post.user.name}</p>
                <span className="text-sm text-gray-400 m-0 p-0">
                  {post.upload_time}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="flex-0"></div>
              <div className="w-62 min-h-28 flex-1">
                <p className="w-full pb-2" onClick={()=>{onClick(true, post.id)}}>{post.title}</p>
                <img
                  src={post.images[0]}
                  className="max-h-80 w-full object-cover rounded"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-5">
              <div></div>
              <PostActions
                totalLikes={post.total_likes}
                isLiked={post.isLiked}
                onClick={() => toggleLike(post.id)}
              />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ScrollablePosts;

