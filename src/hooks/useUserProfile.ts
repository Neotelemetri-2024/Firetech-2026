import { useState } from "react";

import type { PaymentStatus, SubmissionStatus } from "../types/user";

interface UserData {
  photo: string;
  name: string;
  email: string;

  whatsapp: string;

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
  const [user, setUser] = useState<UserData>({
    photo: "https://i.pravatar.cc/300",

    name: "Dafnal",

    email: "dafnal@gmail.com",

    whatsapp: "",

    participantId: "FT26-00127",

    competition: "Hackathon",

    team: "Syntax Error",

    payment: "Pending",

    submission: "Submitted",

    timeline: {
      title: "Technical Meeting",

      date: "2026-08-11",
    },
  });

  const profileAlerts = [
    user.whatsapp === "",
    user.photo === "",
    user.payment !== "Paid",
    user.submission !== "Submitted",
  ].filter(Boolean).length;

  const updateProfile = (data: {
    photo: string;
    name: string;
    whatsapp: string;
  }) => {
    setUser((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return {
    user,
    profileAlerts,
    updateProfile,
  };
}
