import api from "../services/api";

export type CompetitionStatus =
  | "open"
  | "upcoming"
  | "closed"
  | "ongoing"
  | "finished";

export interface Competition {
  id: number;
  slug: string;
  name: string;
  category: string;
  type?: "individual" | "team";
  minTeamSize?: number | null;
  maxTeamSize?: number | null;
  requiresKtm?: boolean;
  requiresPayment?: boolean;
  description: string;

  status: CompetitionStatus;

  participantQuota: number;
  slotsUsed: number;
  slotsLeft: number;
  totalRegistrations?: number;

  registrationOpen: string;
  eventDate: string;
  registrationClose: string;
  registrationClosedAt?: string | null;

  isFull: boolean;
}

export interface UpdateCompetitionPayload {
  name: string;
  category: string;
  participantQuota: number | null;
  registrationOpen: string;
  eventDate: string;
  registrationClose: string;
  type: "individual" | "team";
  minTeamSize: number | null;
  maxTeamSize: number | null;
  requiresKtm: boolean;
  requiresPayment: boolean;
}

export const getCompetitions = async (): Promise<Competition[]> => {
  const response = await api.get("/api/competitions");
  return response.data.data.competitions;
};

export const getCompetitionById = async (id: number) => {
  const response = await api.get(`/api/competitions/${id}`);
  return response.data.data;
};

export const getAdminCompetitionById = async (id: number) => {
  const response = await api.get(`/admin/competitions/${id}`);
  return response.data.data;
};

export const checkAdminAccess = async (): Promise<void> => {
  await api.get("/admin/competitions", {
    params: { page: 1, limit: 1 },
  });
};

export const updateCompetition = async (
  id: number,
  payload: UpdateCompetitionPayload,
) => {
  const response = await api.put(`/admin/competitions/${id}`, payload);

  return response.data;
};
