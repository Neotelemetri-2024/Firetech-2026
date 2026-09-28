import api from "./api";

export const registerCompetition = async (
  competitionId: number,
  payload: FormData,
) => {
  const response = await api.post(
    `/api/competitions/${competitionId}/register`,
    payload,
  );

  return response.data;
};
