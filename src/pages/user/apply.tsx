import { Code2, Palette, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Category } from "../../types/applysevent";
import HackathonForm from "../../components/apply/hackathonform";
import UiUxForm from "../../components/apply/uiuxform";
import EfootballForm from "../../components/apply/efootballform";
import RegistrationProgress from "../../components/apply/registrationprogres";
import Toast from "../../components/ui/toast";
import { useTheme } from "../../context/themecontext";
import { CategoryTabs } from "../../components/apply/categorytabs";
import { StepIndicator } from "../../components/apply/stepindicator";
import { ReviewRegistrationNotice } from "../../components/apply/reviewregistrationnotice";
import { FormNavigationButtons } from "../../components/apply/formnavigationbuttons";
import { useApplyForm } from "../../hooks/useApplyForm";

const categoryIcons: Record<Category, LucideIcon> = {
  Hackathon: Code2,
  "UI/UX": Palette,
  "E-Football": Gamepad2,
};

const categories: Category[] = ["Hackathon", "UI/UX", "E-Football"];

export default function Apply() {
  const { darkMode } = useTheme();
  const {
    selectedCategory,
    currentStep,
    formData,
    showValidationToast,
    setShowValidationToast,
    validationMessage,
    toastType,
    isSubmitting,
    activeRegistrationId,
    myRegistrations,
    availableCompetitions,
    loadingExistingRegistration,
    existingFiles,
    existingRegistration,
    stepLabels,
    totalSteps,
    isReviewFlow,
    competitionSlugMap,
    handleSelectCategory,
    handleInputChange,
    handleNext,
    handleSubmit,
    handleBack,
    getStepStatus,
    getStepColor,
  } = useApplyForm();

  const renderActiveForm = () => {
    switch (selectedCategory) {
      case "Hackathon":
        return (
          <HackathonForm
            step={currentStep}
            formData={formData.Hackathon}
            existingFiles={existingFiles}
            registrationId={activeRegistrationId}
            onChange={handleInputChange}
          />
        );
      case "UI/UX":
        return (
          <UiUxForm
            step={currentStep}
            formData={formData["UI/UX"]}
            existingFiles={existingFiles}
            registrationId={activeRegistrationId}
            onChange={handleInputChange}
          />
        );
      case "E-Football":
        return (
          <EfootballForm
            step={currentStep}
            formData={formData["E-Football"]}
            existingFiles={existingFiles}
            registrationId={activeRegistrationId}
            onChange={handleInputChange}
          />
        );
    }
  };

  return (
    <main className="min-h-screen py-40">
      <div className="mx-auto max-w-7xl px-6">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          categoryIcons={categoryIcons}
          availableCompetitions={availableCompetitions}
          myRegistrations={myRegistrations}
          isReviewFlow={isReviewFlow}
          loadingExistingRegistration={loadingExistingRegistration}
          darkMode={darkMode}
          competitionSlugMap={competitionSlugMap}
          onSelectCategory={(cat) => void handleSelectCategory(cat)}
        />

        {/* Mobile Registration Progress */}
        <div className="mb-8 lg:hidden">
          <RegistrationProgress
            stepLabels={stepLabels}
            currentStep={currentStep}
          />

          <div className="mt-4">
            <Toast
              open={showValidationToast}
              message={validationMessage}
              type={toastType}
              onClose={() => setShowValidationToast(false)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 animate-slideInUp">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div
              className={`overflow-hidden rounded-3xl border-2 p-6 backdrop-blur-sm transition-all duration-500 animate-slideInUp ${
                darkMode
                  ? "border-slate-300 bg-white/70 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/20"
                  : "border-slate-700 bg-slate-900/50 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20"
              }`}
            >
              <StepIndicator
                stepLabels={stepLabels}
                totalSteps={totalSteps}
                currentStep={currentStep}
                darkMode={darkMode}
                getStepStatus={getStepStatus}
                getStepColor={(step) => getStepColor(step, darkMode)}
              />

              <ReviewRegistrationNotice
                activeRegistrationId={activeRegistrationId}
                existingFiles={existingFiles}
                existingRegistration={existingRegistration}
              />

              {loadingExistingRegistration ? (
                <p className="py-10 text-center text-white/75">
                  Memuat data pendaftaran...
                </p>
              ) : (
                <div className="space-y-6">{renderActiveForm()}</div>
              )}

              <FormNavigationButtons
                currentStep={currentStep}
                totalSteps={totalSteps}
                isSubmitting={isSubmitting}
                loadingExistingRegistration={loadingExistingRegistration}
                activeRegistrationId={activeRegistrationId}
                darkMode={darkMode}
                onBack={handleBack}
                onNext={handleNext}
                onSubmit={() => void handleSubmit()}
              />
            </div>
          </div>

          {/* Desktop Registration Progress */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32">
              <RegistrationProgress
                stepLabels={stepLabels}
                currentStep={currentStep}
              />

              {showValidationToast && (
                <div className="mt-4">
                  <Toast
                    open={showValidationToast}
                    message={validationMessage}
                    type={toastType}
                    onClose={() => setShowValidationToast(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
