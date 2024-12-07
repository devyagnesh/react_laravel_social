import api from "../api";

export const getCurrentLoggedUserProfile = async () => {
  const response = await api.get("/me");
  return response.data;
};

export const getSuggestedPeople = async () => {
  const response = await api.get("/users/all");
  return response.data;
};
