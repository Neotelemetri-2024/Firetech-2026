import type { PaymentStatus, SubmissionStatus } from "../types/user";

export type StatusTone = "success" | "warning" | "danger";

export function getPaymentTone(status: PaymentStatus): StatusTone {
  switch (status) {
    case "Paid":
      return "success";

    case "Pending":
      return "warning";

    case "Declined":
      return "danger";
  }
}

export function getSubmissionTone(status: SubmissionStatus): StatusTone {
  switch (status) {
    case "Submitted":
      return "success";

    case "Pending":
      return "warning";

    case "Rejected":
      return "danger";
  }
}

export function getEmailStatus(email: string) {
  if (!email || email.trim() === "") {
    return {
      label: "Not Verified",
      tone: "danger" as StatusTone,
    };
  }

  return {
    label: "Verified",
    tone: "success" as StatusTone,
  };
}

export function getStatusColor(status: string): StatusTone {
  if (status === "Paid" || status === "Submitted") {
    return "success";
  }

  if (status === "Pending") {
    return "warning";
  }

  return "danger";
}
