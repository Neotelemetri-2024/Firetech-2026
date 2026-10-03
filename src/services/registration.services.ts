import api from "./api";
import { fetchAllPages } from "./pagination";

export interface RegistrationFile {
  id: number;
  kind: string;
  storageKey: string;
  originalName: string | null;
  mimeType: string;
  sizeBytes?: number;
  uploadedAt?: string;
  memberId?: number;
}

export interface RegistrationUser {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface RegistrationMember {
  id: number;
  order: number;
  name: string;
  email: string;
  phone: string;
  institution: string;
  files?: RegistrationFile[];
}

/** Ringkasan lomba yang ikut menempel di tiap pendaftaran dari backend. */
export interface RegistrationCompetition {
  id: number;
  name: string;
  type?: string;
  requiresKtm?: boolean;
  requiresPayment?: boolean;
}

export interface Registration {
  id: number;
  userId: number;
  competitionId: number;
  competition?: RegistrationCompetition;
  submittedAt: string;
  ktmStatus: string;
  paymentStatus: string;
  teamName: string | null;
  institution: string;
  message: string | null;
  createdAt: string;
  updatedAt: string;

  files?: RegistrationFile[];

  members: RegistrationMember[];
  user: RegistrationUser;
}

export interface RegistrationsResponse {
  registrations: Registration[];
}

/* ===========================
   USER
=========================== */

/**
 * Register Competition
 * POST /api/competitions/:id/register
 */
export const registerCompetition = async (
  competitionId: number,
  formData: FormData,
) => {
  const response = await api.post(
    `/api/competitions/${competitionId}/register`,
    formData,
  );

  return response.data;
};

/**
 * Get My Registrations
 * GET /api/registrations
 */
export const getMyRegistrations = async (): Promise<Registration[]> => {
  const response = await api.get("/api/registrations");

  return response.data.data.registrations;
};

/**
 * Get My Registration Detail
 * GET /api/registrations/:id
 */
export const getMyRegistrationById = async (
  registrationId: number,
): Promise<Registration> => {
  const response = await api.get(`/api/registrations/${registrationId}`);

  return response.data.data.registration;
};

/**
 * Upload Payment Proof
 * POST /api/registrations/:id/payment-proof
 */
export const uploadPaymentProof = async (
  registrationId: number,
  file: File,
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/api/registrations/${registrationId}/payment-proof`,
    formData,
  );

  return response.data;
};

/**
 * Download Registration File
 * GET /api/registrations/:id/files/:fileId
 */
export const downloadRegistrationFile = async (
  registrationId: number,
  fileId: number,
) => {
  const response = await api.get(
    `/api/registrations/${registrationId}/files/${fileId}`,
    {
      responseType: "blob",
    },
  );

  return response.data;
};

/* ===========================
   ADMIN
=========================== */

export const getRegistrations = (): Promise<Registration[]> =>
  fetchAllPages<Registration>("/admin/registrations", "registrations");

export const getRegistrationById = async (
  registrationId: number,
): Promise<Registration> => {
  const response = await api.get(`/admin/registrations/${registrationId}`);

  return response.data.data.registration;
};

export interface RegistrationVerificationPayload {
  status: "approved" | "rejected";
  note?: string;
}

/** PUT /admin/registrations/:id/ktm */
export const verifyKtm = async (
  registrationId: number,
  payload: RegistrationVerificationPayload,
) => {
  const response = await api.put(
    `/admin/registrations/${registrationId}/ktm`,
    payload,
  );

  return response.data;
};

/* ===========================
   PAYMENT VERIFICATION
=========================== */

export interface PaymentVerificationPayload {
  action: "approve" | "reject";
  reason?: string;
}

export const verifyPayment = async (
  registrationId: number,
  payload: PaymentVerificationPayload,
) => {
  const response = await api.put(
    `/admin/registrations/${registrationId}/payment`,
    {
      status: payload.action === "approve" ? "paid" : "rejected",
      ...(payload.reason ? { note: payload.reason } : {}),
    },
  );

  return response.data;
};
