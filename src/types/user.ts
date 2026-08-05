export type PaymentStatus = "Paid" | "Pending" | "Declined";

export type SubmissionStatus = "Submitted" | "Pending" | "Rejected";

export type UserCompetition = {
  title: string;
  team: string;
  role: string;

  payment: PaymentStatus;
  submission: SubmissionStatus;

  paymentProof?: string;
  submissionLink?: string;
};

export type UserItem = {
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
