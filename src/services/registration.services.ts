import api from "./api";

export interface RegistrationFile {
  id: number;
  kind: string;
  storageKey: string;
  originalName: string;
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

export interface Registration {
  id: number;
  userId: number;
  competitionId: number;
  submittedAt: string;
  status: string;
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
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
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
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
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

export const getRegistrations = async (): Promise<Registration[]> => {
  const response = await api.get("/admin/registrations");

  return response.data.data.registrations;
};

export const getRegistrationById = async (
  registrationId: number,
): Promise<Registration> => {
  const response = await api.get(`/admin/registrations/${registrationId}`);

  return response.data.data.registration;
};

/* ===========================
   APPROVE REGISTRATION
=========================== */

export const approveRegistration = async (registrationId: number) => {
  const response = await api.put(
    `/admin/registrations/${registrationId}/approve`,
  );

  return response.data;
};

/* ===========================
   REJECT REGISTRATION
=========================== */

export const rejectRegistration = async (
  registrationId: number,
  reason?: string,
) => {
  const response = await api.put(
    `/admin/registrations/${registrationId}/reject`,
    {
      reason,
    },
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
    payload,
  );

  return response.data;
};
