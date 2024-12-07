import api from "../api";

export const getAllPosts = async () => {
  const response = await api.get("/posts/all");
  return response.data;
};
export const getPostDetail = async (id) => {
  const response = await api.get(`/posts/details/${id}`);
  return response.data;
};

export const togglePostLike = async (data) => {
  const response = await api.post("like/toggle",data);
  return response.data;
};
