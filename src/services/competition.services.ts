import api from "../services/api";

export interface Competition {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  status: string;

  participantQuota: number;
  slotsUsed: number;
  slotsLeft: number;

  totalRegistrations?: number;

  registrationOpen: string;
  eventDate: string;
  registrationClose: string;
}

export interface UpdateCompetitionPayload {
  name: string;
  category: string;
  participantQuota: number;
  registrationOpen: string;
  eventDate: string;
  registrationClose: string;
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

export const updateCompetition = async (
  id: number,
  payload: UpdateCompetitionPayload,
) => {
  const response = await api.put(`/admin/competitions/${id}`, payload);

  return response.data;
};
