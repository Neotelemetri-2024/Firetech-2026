import { useTheme } from "../../context/themecontext";
import Instagram from "../../assets/socialmedia/instagram.webp";

const teamMembers = [
  {
    role: "Project Manager",
    name: "Naufal Rafiif Irwan",
    instagram: "https://www.instagram.com/rapip_n/",
  },
  {
    role: "UI/UX Designer",
    name: "Azlin Fahira",
    instagram: "https://www.instagram.com/fahirazlin/",
  },
  {
    role: "Front End Developer",
    name: "Rizki Dafa Naldi",
    instagram: "https://www.instagram.com/daf_nal/",
  },
  {
    role: "Back End Developer",
    name: "Aufan Taufiqurrahman",
    instagram: "https://www.instagram.com/aufant_/",
  },
];

export default function OurTeam() {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-col items-start gap-5">
      <span
        className={`text-sm font-bold uppercase tracking-widest ${
          darkMode ? "text-slate-600" : "text-slate-300"
        }`}
      >
        Our Team
      </span>

      <div className="flex flex-col gap-2.5">
        {teamMembers.map((member) => (
          <a
            key={member.role}
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 rounded-xl border px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 ${
              darkMode
                ? "border-slate-200/80 bg-slate-50/80 hover:border-blue-600 hover:bg-blue-50"
                : "border-slate-700/60 bg-slate-900/50 hover:border-red-600 hover:bg-red-700/10"
            }`}
          >
            <img
              src={Instagram}
              alt="Instagram"
              className={`w-4.5 h-4.5 object-contain transition-transform duration-300 group-hover:scale-110 ${
                darkMode ? "" : "invert brightness-0"
              }`}
            />

            <div className="min-w-0">
              <div
                className={`text-[10px] uppercase tracking-wider ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {member.role}
              </div>

              <div
                className={`text-sm font-medium truncate ${
                  darkMode ? "text-slate-700" : "text-slate-300"
                }`}
              >
                {member.name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
