import type { Category, ApplyFormDataMap } from "../types/applysevent";
import type {
  getMyRegistrationById,
  RegistrationFile,
  RegistrationMember,
} from "../services/registration.services";

export const categoryFromSlug = (slug?: string): Category | null => {
  if (slug === "hackathon") return "Hackathon";
  if (slug === "ui-ux-competition") return "UI/UX";
  if (slug === "e-football") return "E-Football";
  return null;
};

export const categoryFromName = (name?: string): Category | null => {
  const normalized = name?.toLowerCase() ?? "";
  if (normalized.includes("hackathon")) return "Hackathon";
  if (normalized.includes("ui/ux") || normalized.includes("ui-ux")) return "UI/UX";
  if (normalized.includes("e-football") || normalized.includes("efootball")) {
    return "E-Football";
  }
  return null;
};

export const getRegistrationFiles = (
  reg: Awaited<ReturnType<typeof getMyRegistrationById>> | null | undefined,
): RegistrationFile[] => {
  if (!reg) return [];
  return [
    ...(reg.files ?? []),
    ...(reg.members?.flatMap((m) => m.files ?? []) ?? []),
  ];
};

type RegistrationMemberLike =
  | RegistrationMember
  | { order?: number; institution?: string; name?: string }
  | string;

export const formDataFromRegistration = (
  category: Category,
  registration: Awaited<ReturnType<typeof getMyRegistrationById>> | null | undefined,
): ApplyFormDataMap[Category] => {
  const rawMembers = registration?.members ?? [];
  const members: RegistrationMemberLike[] = [...rawMembers].sort(
    (a, b) => {
      const orderA = typeof a === "string" ? 0 : (a.order ?? 0);
      const orderB = typeof b === "string" ? 0 : (b.order ?? 0);
      return orderA - orderB;
    },
  );

  const institution =
    registration?.institution ||
    (typeof members[0] === "object" && members[0] !== null && "institution" in members[0]
      ? (members[0].institution ?? "")
      : "") ||
    "";

  const memberName = (index: number) => {
    const m = members[index];
    if (!m) return "";
    if (typeof m === "string") return m;
    if ("name" in m && typeof m.name === "string") return m.name;
    return "";
  };

  if (category === "Hackathon") {
    return {
      namaTeam: registration?.teamName ?? "",
      namaKetua: memberName(0),
      asalInstitusi: institution,
      anggota1: memberName(1),
      anggota2: memberName(2),
      anggota3: memberName(3),
      anggota4: memberName(4),
      ktm: null,
      paymentProof: null,
    };
  }
  if (category === "UI/UX") {
    return {
      namaTeam: registration?.teamName ?? "",
      namaKetua: memberName(0),
      asalInstitusi: institution,
      anggota1: memberName(1),
      anggota2: memberName(2),
      ktm: null,
      paymentProof: null,
    };
  }
  return {
    namaPemain: memberName(0),
    asalInstitusi: institution,
    paymentProof: null,
  };
};

export const buildHackathonPayload = (formData: ApplyFormDataMap) => {
  const data = formData.Hackathon;
  const members = [
    data.namaKetua,
    data.anggota1,
    data.anggota2,
    data.anggota3,
    data.anggota4,
  ].filter(Boolean);

  const payload = new FormData();
  payload.append(
    "fields",
    JSON.stringify({
      teamName: data.namaTeam,
      institution: data.asalInstitusi,
    }),
  );
  payload.append("members", JSON.stringify(members));
  payload.append("message", "");

  if (data.ktm) {
    payload.append("memberIdentities", data.ktm);
  }
  if (data.paymentProof) {
    payload.append("paymentProof", data.paymentProof);
  }
  return payload;
};

export const buildUiUxPayload = (formData: ApplyFormDataMap) => {
  const data = formData["UI/UX"];
  const members = [data.namaKetua, data.anggota1, data.anggota2].filter(
    Boolean,
  );

  const payload = new FormData();
  payload.append(
    "fields",
    JSON.stringify({
      teamName: data.namaTeam,
      institution: data.asalInstitusi,
    }),
  );
  payload.append("members", JSON.stringify(members));
  payload.append("message", "");

  if (data.ktm) {
    payload.append("memberIdentities", data.ktm);
  }
  if (data.paymentProof) {
    payload.append("paymentProof", data.paymentProof);
  }
  return payload;
};

export const buildEfootballPayload = (formData: ApplyFormDataMap) => {
  const data = formData["E-Football"];
  const payload = new FormData();
  payload.append(
    "fields",
    JSON.stringify({
      institution: data.asalInstitusi,
    }),
  );
  payload.append("members", JSON.stringify([data.namaPemain]));
  payload.append("message", "");

  if (data.paymentProof) {
    payload.append("paymentProof", data.paymentProof);
  }
  return payload;
};

export const buildPayload = (selectedCategory: Category, formData: ApplyFormDataMap) => {
  switch (selectedCategory) {
    case "Hackathon":
      return buildHackathonPayload(formData);
    case "UI/UX":
      return buildUiUxPayload(formData);
    case "E-Football":
      return buildEfootballPayload(formData);
    default:
      throw new Error(`${selectedCategory} not implemented`);
  }
};
