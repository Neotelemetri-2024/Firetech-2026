import participantProof from "../assets/firetech.webp";
import type { UserItem } from "../types/user";

export const users: UserItem[] = [
  {
    name: "Wonwoo",
    email: "jeonwonwoo@gmail.com",
    phone: "628123456789",
    school: "Universitas Andalas",

    eventTags: ["UI/UX Competition", "Hackathon"],

    paymentStatus: "Pending",
    submissionStatus: "Pending",

    competitions: [
      {
        title: "Hackathon",
        team: "Neo Telemetri",
        payment: "Pending",
        paymentProof: participantProof,
        role: "Leader",
        submission: "Pending",
        submissionLink: "https://github.com/firetech/hackathon-project",
      },
      {
        title: "UI/UX Competition",
        team: "Neo Telemetri",
        payment: "Paid",
        paymentProof: participantProof,
        role: "Member",
        submission: "Submitted",
        submissionLink: "https://github.com/firetech/hackathon-project",
      },
    ],
  },
  {
    name: "Jeonghan",
    email: "jeonghan@gmail.com",
    phone: "628998887777",
    school: "Institut Teknologi Bandung",

    eventTags: ["UI/UX Competition", "Hackathon"],

    paymentStatus: "Declined",
    submissionStatus: "Submitted",

    competitions: [
      {
        title: "Hackathon",
        team: "Alpha Team",
        payment: "Declined",
        paymentProof: participantProof,
        role: "Member",
        submission: "Submitted",
        submissionLink: "https://github.com/firetech/hackathon-project",
      },
    ],
  },
  {
    name: "Jeonghan",
    email: "jeonghan@gmail.com",
    phone: "628998887777",
    school: "Institut Teknologi Bandung",
    eventTags: ["UI/UX Competition", "Hackathon"],
    paymentStatus: "Paid",
    submissionStatus: "Submitted",

    competitions: [
      {
        title: "UI/UX Competition",
        team: "Beta Team",
        payment: "Paid",
        paymentProof: participantProof,
        role: "Member",
        submission: "Submitted",
        submissionLink: "https://github.com/firetech/hackathon-project",
      },
    ],
  },
  {
    name: "Wonwoo",
    email: "jeonwonwoo@gmail.com",
    phone: "628123456789",
    school: "Universitas Andalas",
    eventTags: ["UI/UX Competition", "Hackathon"],
    paymentStatus: "Declined",
    submissionStatus: "Submitted",

    competitions: [
      {
        title: "Hackathon",
        team: "Gamma Team",
        payment: "Declined",
        paymentProof: participantProof,
        role: "Leader",
        submission: "Submitted",
        submissionLink: "https://github.com/firetech/hackathon-project",
      },
    ],
  },
  {
    name: "Mingyu",
    email: "kiming@gmail.com",
    phone: "628112223334",
    school: "Universitas Gadjah Mada",
    eventTags: ["UI/UX Competition", "Hackathon"],
    paymentStatus: "Pending",
    submissionStatus: "Pending",

    competitions: [
      {
        title: "UI/UX Competition",
        team: "Alpha Team",
        payment: "Pending",
        paymentProof: participantProof,
        role: "Member",
        submission: "Pending",
      },
    ],
  },
  {
    name: "Abdul",
    email: "abdull@gmail.com",
    phone: "628112223334",
    school: "Universitas Gadjah Mada",
    eventTags: ["Informatics Olympiad", "Hackathon"],
    paymentStatus: "Pending",
    submissionStatus: "Pending",

    competitions: [
      {
        title: "Informatics Olympiad",
        team: "Epsilon Team",
        payment: "Pending",
        paymentProof: participantProof,
        role: "Member",
        submission: "Pending",
      },
    ],
  },
  {
    name: "Jeonghan",
    email: "jeonghan@gmail.com",
    phone: "628998887777",
    school: "Institut Teknologi Sumatera",
    eventTags: ["UI/UX Competition", "Hackathon"],
    paymentStatus: "Declined",
    submissionStatus: "Rejected",

    competitions: [
      {
        title: "UI/UX Competition",
        team: "Zeta Team",
        payment: "Declined",
        paymentProof: participantProof,
        role: "Member",
        submission: "Rejected",
        submissionLink: "https://github.com/firetech/hackathon-project",
      },
    ],
  },
  {
    name: "Abdul",
    email: "abdull@gmail.com",
    phone: "628112223334",
    school: "Universitas Gadjah Mada",
    eventTags: ["E-Football", "Hackathon"],
    paymentStatus: "Paid",
    submissionStatus: "Submitted",

    competitions: [
      {
        title: "E-Football",
        team: "Eta Team",
        payment: "Paid",
        paymentProof: participantProof,
        role: "Member",
        submission: "Submitted",
      },
    ],
  },
];
