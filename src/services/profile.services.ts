import api from "./api";

export interface UpdateProfilePayload {
  name: string;
  phone: string;
  avatarUrl?: string;
}

export const getProfile = async () => {
  const response = await api.get("/api/profile");
  return response.data;
};

export const updateProfile = async (data: UpdateProfilePayload) => {
  const response = await api.put("/api/profile", data);

  return response.data;
};
