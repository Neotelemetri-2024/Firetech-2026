import { useTheme } from "../../context/themecontext";

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
    role: "FrontEnd Developer",
    name: "Rizki Dafa Naldi",
    instagram: "https://www.instagram.com/daf_nal/",
  },
  {
    role: "BackEnd Developer",
    name: "Aufan Taufiqurrahman",
    instagram: "https://www.instagram.com/aufant_/",
  },
];

export default function OurTeam() {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
      <span
        className={`text-sm font-bold uppercase tracking-widest ${
          darkMode ? "text-slate-600" : "text-slate-300"
        }`}
      >
        Our Team
      </span>

      <div className="flex flex-col items-center lg:items-start lg:-ml-4 gap-2.5">
        {teamMembers.map((member) => (
          <a
            key={member.role}
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full lg:w-auto items-center justify-center lg:justify-start gap-3  px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="min-w-0">
              <div
                className={`text-[10px] uppercase font-bold tracking-wider ${
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
