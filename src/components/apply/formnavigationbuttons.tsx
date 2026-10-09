export type FormNavigationButtonsProps = {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  loadingExistingRegistration: boolean;
  activeRegistrationId: number | null;
  darkMode: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export function FormNavigationButtons({
  currentStep,
  totalSteps,
  isSubmitting,
  loadingExistingRegistration,
  activeRegistrationId,
  darkMode,
  onBack,
  onNext,
  onSubmit,
}: FormNavigationButtonsProps) {
  return (
    <div
      className="mt-8 flex items-center justify-between gap-4 animate-slideInUp"
      style={{ animationDelay: "0.4s" }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`cursor-pointer group relative flex-1 overflow-hidden rounded-full border px-8 py-3 font-bold backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ${
          darkMode
            ? "border-slate-300 bg-white/70 text-slate-800 hover:border-blue-600 hover:bg-blue-600/10 hover:shadow-lg hover:shadow-blue-600/20"
            : "border-white/20 bg-white/5 text-white hover:border-red-600 hover:bg-red-600/10 hover:shadow-lg hover:shadow-red-600/20"
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 cursor-pointer">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          <span>BACK</span>
        </span>

        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            darkMode
              ? "bg-linear-to-r from-blue-600/10 to-red-600/10"
              : "bg-linear-to-r from-red-600/10 to-blue-600/10"
          }`}
        />
      </button>

      {/* Next Button */}
      <button
        disabled={isSubmitting || loadingExistingRegistration}
        onClick={
          loadingExistingRegistration
            ? undefined
            : currentStep === totalSteps
              ? onSubmit
              : onNext
        }
        className={`group relative flex-1 overflow-hidden rounded-full px-8 py-3 font-bold text-white transition-all duration-300 ${
          isSubmitting
            ? "cursor-not-allowed opacity-70"
            : "cursor-pointer hover:scale-105 active:scale-95"
        } ${
          darkMode
            ? "bg-linear-to-r from-blue-600 to-red-600 hover:shadow-lg hover:shadow-blue-600/40"
            : "bg-linear-to-r from-red-600 to-blue-600 hover:shadow-lg hover:shadow-red-600/40"
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {currentStep === totalSteps && isSubmitting ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  opacity="0.25"
                />
                <path
                  d="M22 12a10 10 0 0 1-10 10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>

              <span>SUBMITTING...</span>
            </>
          ) : (
            <span>
              {currentStep === totalSteps
                ? activeRegistrationId
                  ? "SAVE CHANGES"
                  : "SUBMIT"
                : "NEXT"}
            </span>
          )}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            darkMode
              ? "bg-linear-to-r from-blue-500 to-red-500"
              : "bg-linear-to-r from-red-500 to-blue-500"
          }`}
        />

        {/* Shine Effect */}
        <div
          className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.3),transparent_50%)]
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        />
      </button>
    </div>
  );
}
