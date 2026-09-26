// src/services/auth.service.ts

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const googleLogin = async (credential: string) => {
  const response = await axios.post(
    `${API_URL}/auth/google-login`,
    {
      token: credential,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const logout = async () => {
  const response = await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const refreshToken = async () => {
  const response = await axios.post(
    `${API_URL}/auth/refresh-token`,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};
