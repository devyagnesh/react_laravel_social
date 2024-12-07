import api from "../api";

export const signup = async (credentials) => {
  const response = await api.post("/signup", credentials,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};
