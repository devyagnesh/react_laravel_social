import { getPostDetail } from "@/services/posts/postsServices";
import React, { useEffect, useState } from "react";
import PostActions from "./PostActions";

const PostDetails = ({ postid }) => {
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!postid) return;

    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const data = await getPostDetail(postid);
        setPostDetail(data?.data || null);
      } catch (err) {
        setError("Failed to fetch post details");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!postDetail) return <div>No post details available.</div>;

  const {
    title,
    introduction,
    user,
    upload_time,
    images = [],
    paragraph = [],
  } = postDetail;

  return (
    <div className="h-screen overflow-y-auto no-scrollbar bg-white rounded-lg p-4">
      <p className="font-semibold text-sm">{title || "Untitled"}</p>
      <p className="text-gray-700 text-sm">
        {introduction || "No introduction available."}
      </p>
      <span className="text-sm text-gray-400 p-0 mt-6">
        {upload_time || "Unknown time"}
      </span>
      <div className="flex items-center justify-start gap-2">
        <img
          src={user?.profile_img}
          className="rounded-full w-8 h-8 object-cover"
          alt={user?.name}
        />
        <div>
          <p className="font-normal leading-[1]">{user?.name || "Anonymous"}</p>
        </div>
      </div>
      <div className="border-t my-4"></div>

      {Array.from({
        length: Math.max(paragraph.length, images.length - 1),
      }).map((_, index) => {
        const imgIndex = index;
        return (
          <React.Fragment key={index}>
            {index < paragraph.length && (
              <p className="content-paragraph my-4">{paragraph[index]}</p>
            )}
            {imgIndex < images.length && (
              <img
                src={images[imgIndex]}
                alt={`Content ${imgIndex}`}
                className="content-image max-h-80 w-full object-cover"
              />
            )}
          </React.Fragment>
        );
      })}
      <div className="flex items-center justify-center">
        <PostActions
          totalLikes={postDetail.totallikes}
          isLiked={postDetail.likes.isLiked}
          onClick={() => {
            toggleLike(postDetail.id)
          }}
        />
      </div>
    </div>
  );
};

export default PostDetails;
