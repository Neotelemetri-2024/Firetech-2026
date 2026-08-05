import { AlertTriangle } from "lucide-react";
import { useTheme } from "../../context/themecontext";

interface ProfileAlertProps {
  alerts: string[];
}

export default function ProfileAlert({ alerts }: ProfileAlertProps) {
  const { darkMode } = useTheme();

  if (alerts.length === 0) return null;

  return (
    <div
      className={`mt-5 w-full rounded-xl border p-4 ${
        darkMode
          ? "border-yellow-200 bg-yellow-50"
          : "border-yellow-500/20 bg-yellow-500/10"
      }`}
    >
      <div className="flex items-center gap-2 font-semibold text-yellow-500">
        <AlertTriangle size={18} />
        Profile Alert
      </div>

      <ul className="mt-2 space-y-1 text-sm text-yellow-500">
        {alerts.map((alert, index) => (
          <li key={index}>• {alert}</li>
        ))}
      </ul>
    </div>
  );
}
