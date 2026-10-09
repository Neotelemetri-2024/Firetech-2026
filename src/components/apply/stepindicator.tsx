export type StepIndicatorProps = {
  stepLabels: string[];
  totalSteps: number;
  currentStep: number;
  darkMode: boolean;
  getStepStatus: (step: number) => string;
  getStepColor: (step: number) => string;
};

export function StepIndicator({
  stepLabels,
  totalSteps,
  currentStep: _currentStep,
  darkMode,
  getStepStatus,
  getStepColor,
}: StepIndicatorProps) {
  return (
    <div
      className={`mb-8 flex items-center overflow-x-auto sm:overflow-visible ${
        totalSteps <= 2 ? "w-full" : "justify-between"
      }`}
    >
      {stepLabels.map((label, index) => {
        const step = index + 1;
        return (
          <div
            key={label}
            className={`flex shrink-0 items-center ${
              totalSteps <= 2 && index === 0 ? "flex-1" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <div
                className={`flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-110 ${getStepColor(step)}`}
              >
                {step}
              </div>
              <span
                className={`hidden text-sm font-semibold md:inline ${
                  darkMode ? "text-black" : "text-white"
                }`}
              >
                {label}
              </span>
            </div>
            {step < totalSteps && (
              <div
                className={`relative mx-2 sm:mx-4 h-1 flex-1 overflow-hidden rounded-full transition-all duration-500 ${
                  totalSteps <= 2 ? "flex-1" : "w-20 sm:w-18 lg:w-28"
                } ${
                  getStepStatus(step) === "completed"
                    ? darkMode
                      ? "bg-blue-600"
                      : "bg-red-600"
                    : getStepStatus(step) === "active"
                      ? darkMode
                        ? "bg-blue-600"
                        : "bg-red-600"
                      : darkMode
                        ? "bg-slate-300"
                        : "bg-slate-700"
                }`}
              >
                {getStepStatus(step) === "completed" && (
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
