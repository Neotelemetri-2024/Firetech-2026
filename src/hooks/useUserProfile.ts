import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile as updateProfileApi,
} from "../services/profile.services";

import type { UpdateProfilePayload } from "../services/profile.services";
import type { PaymentStatus, SubmissionStatus } from "../types/user";

interface UserData {
  avatarUrl: string;
  name: string;
  email: string;
  phone: string;
  participantId: string;
  competition: string;
  team: string;
  payment: PaymentStatus;
  submission: SubmissionStatus;
  timeline: {
    title: string;
    date: string;
  };
}

export function useUserProfile() {
  const [user, setUser] = useState<UserData>(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    return {
      avatarUrl:
        storedUser.avatarUrl ||
        storedUser.picture ||
        storedUser.photo ||
        "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(storedUser.name || "Guest"),

      name: storedUser.name || storedUser.fullName || "Guest",

      email: storedUser.email || "",

      phone: storedUser.phone || storedUser.whatsapp || "",

      participantId: "FT26-00127",

      competition: "Hackathon",

      team: "Syntax Error",

      payment: "Pending",

      submission: "Pending",

      timeline: {
        title: "Technical Meeting",
        date: "2026-08-11",
      },
    };
  });

  const profileAlerts = [
    user.phone === "",
    user.avatarUrl === "",
    user.payment !== "Paid",
    user.submission !== "Submitted",
  ].filter(Boolean).length;

  const updateProfile = async (data: UpdateProfilePayload) => {
    try {
      const result = await updateProfileApi(data);

      const updatedUser = result.data;

      setUser((prev) => ({
        ...prev,
        ...updatedUser,
      }));

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user") || "{}"),
          ...updatedUser,
        }),
      );

      window.dispatchEvent(new Event("user:updated"));

      return updatedUser;
    } catch (error) {
      console.error("Update profile failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) return;

    const loadProfile = async () => {
      try {
        const profile = await getProfile();

        const profileData = profile.data;

        setUser((prev) => ({
          ...prev,
          ...profileData,
        }));

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user") || "{}"),
            ...profileData,
          }),
        );
      } catch (error) {
        const status = (
          error as { response?: { status?: number } }
        ).response?.status;

        // Guest or expired sessions can receive 401; this is an expected auth state.
        if (status !== 401) {
          console.error("Failed to load user profile:", error);
        }
      }
    };

    loadProfile();
  }, []);

  return {
    user,
    profileAlerts,
    updateProfile,
  };
}
