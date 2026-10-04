export type PaymentStatus = "Paid" | "Pending" | "Declined";

export type SubmissionStatus =
  | "Approved"
  | "Submitted"
  | "Pending"
  | "Rejected";

export type UserRegistrationStatus = {
  registrationId: number;
  competition: string;
  payment: PaymentStatus;
  submission: SubmissionStatus;
  requiresPayment: boolean;
  requiresKtm: boolean;
  usesTeam: boolean;
  team: string | null;
};

export type UserCompetitionMember = {
  name: string;
  email: string;
  phone: string;
  institution: string;
};

/** Berkas bukti pembayaran di backend; isinya diambil lewat endpoint berkas yang butuh token. */
export type PaymentProofFile = {
  id: number;
  mimeType: string;
  originalName: string | null;
};

export type UserCompetition = {
  registrationId?: number;

  title: string;
  team: string;
  role: string;

  payment: PaymentStatus;
  submission: SubmissionStatus;

  /** URL gambar yang bisa langsung dipakai `<img>` (hanya data dummy). */
  paymentProof?: string;
  /** Bukti dari backend. Tidak bisa dipakai sebagai `<img src>` karena butuh header Authorization. */
  paymentProofFile?: PaymentProofFile;
  submissionLink?: string;

  members?: UserCompetitionMember[];
};

export type UserItem = {
  id: number;

  name: string;
  email: string;
  phone: string;
  school: string;

  eventTags: string[];

  paymentStatus: PaymentStatus;
  submissionStatus: SubmissionStatus;

  competitions: UserCompetition[];
};

export type EditUserFormData = {
  name: string;
  email: string;
  phone: string;
  school: string;

  competitions: UserCompetition[];
};
