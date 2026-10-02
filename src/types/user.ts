export type PaymentStatus = "Paid" | "Pending" | "Declined";

export type SubmissionStatus = "Submitted" | "Pending" | "Rejected";

export type UserCompetitionMember = {
  name: string;
  email: string;
  phone: string;
  institution: string;
};

export type UserCompetition = {
  registrationId?: number;

  title: string;
  team: string;
  role: string;

  payment: PaymentStatus;
  submission: SubmissionStatus;

  paymentProof?: string;
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
