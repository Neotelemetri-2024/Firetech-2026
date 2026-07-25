import { CheckCircle2, XCircle } from "lucide-react";
import { useTheme } from "../../context/themecontext";

type RegistrationProgressProps = {
  stepLabels: string[];
  currentStep: number;
};

export default function RegistrationProgress({
  stepLabels,
  currentStep,
}: RegistrationProgressProps) {
  const { darkMode } = useTheme();

  const getStepStatus = (step: number) => {
    if (step < currentStep) return "completed";
    if (step === currentStep) return "active";
    return "pending";
  };

  return (
    <div
      className={`overflow-hidden rounded-3xl border-2 p-6 backdrop-blur-sm transition-all duration-500 animate-slideInUp ${
        darkMode
          ? "border-slate-300 bg-white/70 hover:border-blue-600 hover:shadow-lg"
          : "border-slate-700 bg-slate-900/50 hover:border-red-600 hover:shadow-lg"
      }`}
    >
      <h3
        className={`mb-6 text-lg font-bold animate-slideInRight ${
          darkMode ? "text-black" : "text-white"
        }`}
      >
        Registration Progress
      </h3>

      <div className="space-y-4">
        {stepLabels.map((label, index) => {
          const step = index + 1;
          const status = getStepStatus(step);

          return (
            <div
              key={label}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 hover:translate-x-2 hover:scale-105 ${
                status === "completed"
                  ? darkMode
                    ? "border border-blue-600/30 bg-blue-600/10"
                    : "border border-red-600/30 bg-red-600/10"
                  : status === "active"
                    ? darkMode
                      ? "border border-blue-600/30 bg-blue-600/10"
                      : "border border-red-600/30 bg-red-600/10"
                    : darkMode
                      ? "border border-slate-300 bg-slate-100"
                      : "border border-slate-700 bg-slate-800/30"
              }`}
            >
              {status === "completed" ? (
                <CheckCircle2
                  size={20}
                  className={darkMode ? "text-blue-600" : "text-red-600"}
                />
              ) : (
                <XCircle
                  size={20}
                  className={
                    status === "active"
                      ? darkMode
                        ? "text-blue-600"
                        : "text-red-600"
                      : darkMode
                        ? "text-slate-500"
                        : "text-slate-400"
                  }
                />
              )}

              <span
                className={`font-semibold ${
                  status === "completed"
                    ? darkMode
                      ? "text-blue-600"
                      : "text-red-600"
                    : status === "active"
                      ? darkMode
                        ? "text-blue-600"
                        : "text-red-600"
                      : darkMode
                        ? "text-black"
                        : "text-white"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
