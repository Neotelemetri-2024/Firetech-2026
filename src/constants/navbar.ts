export interface NavChild {
  label: string;
  hash: string;
}

export interface NavItem {
  label: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "Home" },
  {
    label: "About",
    children: [
      { label: "Firetech", hash: "firetech" },
      { label: "Sponsor", hash: "sponsor" },
      { label: "Partner", hash: "mediapartner" },
      { label: "Countdown", hash: "countdown" },
    ],
  },
  {
    label: "Event",
    children: [
      { label: "Hackathon", hash: "hackathon" },
      { label: "UI/UX", hash: "uiux" },
      { label: "E-Football", hash: "ef" },
      { label: "Fast Typing", hash: "ft" },
    ],
  },
  { label: "Timeline" },
  { label: "Gallery" },
  { label: "FAQ" },
];

export const getMainMenu = (sectionId: string) => {
  switch (sectionId) {
    case "home":
      return "home";
    case "firetech":
    case "sponsor":
    case "mediapartner":
    case "countdown":
      return "about";
    case "event":
    case "hackathon":
    case "informaticsolympiad":
    case "ft":
    case "ef":
    case "uiux":
      return "event";
    case "timeline":
      return "timeline";
    case "gallery":
      return "gallery";
    case "faq":
      return "faq";
    default:
      return "home";
  }
};
