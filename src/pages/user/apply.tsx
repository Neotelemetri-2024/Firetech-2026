import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Code2, Keyboard, Palette, Gamepad2, BrainCircuit } from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { Category } from "../../types/typesevent";
import {
  applyFormConfig,
  initialApplyFormData,
} from "../../config/applyformconfig";
import HackathonForm from "../../components/apply/hackathonform";
import UiUxForm from "../../components/apply/uiuxform";
import EfootballForm from "../../components/apply/efootballform";
import FastTypingForm from "../../components/apply/fasttypingform";
import InformaticsOlympiadForm from "../../components/apply/informaticsolympiadform";
import RegistrationProgress from "../../components/apply/registrationprogres";
import { useTheme } from "../../context/themecontext";

const categoryIcons: Record<Category, LucideIcon> = {
  Hackathon: Code2,
  "UI/UX": Palette,
  "E-Football": Gamepad2,
  "Fast Typing": Keyboard,
  "Informatics Olympiad": BrainCircuit,
};

const categories: Category[] = [
  "Hackathon",
  "UI/UX",
  "E-Football",
  "Fast Typing",
  "Informatics Olympiad",
];

export default function Apply() {
  const { darkMode } = useTheme();
  const location = useLocation();
  const initialCategory =
    (location.state?.category as Category | undefined) ?? "Hackathon";
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(initialCategory);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialApplyFormData);

  const { steps: stepLabels } = applyFormConfig[selectedCategory];
  const totalSteps = stepLabels.length;

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setCurrentStep(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [selectedCategory]: {
        ...(prev[selectedCategory] as Record<string, string>),
        [name]: value,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) {
      return "completed";
    }
    if (step === currentStep) {
      return "active";
    }
    return "pending";
  };

  const getStepColor = (step: number) => {
    const status = getStepStatus(step);
    const isDark = darkMode;
    if (status === "completed" || status === "active") {
      return isDark
        ? "border-2 border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
        : "border-2 border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/30";
    }
    return isDark
      ? "border-2 border-slate-300 bg-transparent text-slate-700 hover:border-blue-600 "
      : "border-2 border-slate-600 bg-transparent text-slate-300 hover:border-red-600 ";
  };

  const renderActiveForm = () => {
    switch (selectedCategory) {
      case "Hackathon":
        return (
          <HackathonForm
            step={currentStep}
            formData={formData.Hackathon}
            onChange={handleInputChange}
          />
        );
      case "UI/UX":
        return (
          <UiUxForm
            step={currentStep}
            formData={formData["UI/UX"]}
            onChange={handleInputChange}
          />
        );
      case "E-Football":
        return (
          <EfootballForm
            step={currentStep}
            formData={formData["E-Football"]}
            onChange={handleInputChange}
          />
        );
      case "Fast Typing":
        return (
          <FastTypingForm
            step={currentStep}
            formData={formData["Fast Typing"]}
            onChange={handleInputChange}
          />
        );
      case "Informatics Olympiad":
        return (
          <InformaticsOlympiadForm
            step={currentStep}
            formData={formData["Informatics Olympiad"]}
            onChange={handleInputChange}
          />
        );
    }
  };

  return (
    <main className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Category Tabs */}
        <div
          className="
          mb-12
          grid
          grid-cols-2
          justify-items-center
          gap-4
          animate-slideInDown

          lg:flex
          lg:flex-wrap
        "
        >
          {categories.map((category) => {
            const isOlympiad = category === "Informatics Olympiad";
            const Icon = categoryIcons[category];

            return (
              <button
                key={category}
                onClick={() => handleSelectCategory(category)}
                className={`
                ${
                  isOlympiad
                    ? "col-span-2 justify-self-center lg:col-auto lg:justify-self-auto"
                    : ""
                }

                  group
                  flex
                  w-full
                  max-w-42.5
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  px-5
                  py-3
                  cursor-pointer
                  font-semibold
                  transition-all
                  duration-300
                  hover:scale-105
                  active:scale-95

                  ${
                    selectedCategory === category
                      ? darkMode
                        ? "border-2 border-blue-600 text-black"
                        : "border-2 border-red-600 text-white"
                      : darkMode
                        ? "border-2 border-slate-300 bg-white/70 text-slate-700 hover:border-blue-600"
                        : "border-2 border-slate-700 bg-slate-900/50 text-slate-300 hover:border-red-600"
                  }
                `}
              >
                <Icon
                  size={22}
                  strokeWidth={2.3}
                  className={`
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:-translate-y-0.5
          ${
            selectedCategory === category
              ? darkMode
                ? "text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,.45)]"
                : "text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,.45)]"
              : ""
          }
        `}
                />

                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Registration Progress */}
        <div className="mb-8 lg:hidden">
          <RegistrationProgress
            stepLabels={stepLabels}
            currentStep={currentStep}
          />
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
              {/* Step Indicator */}
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
                            totalSteps <= 2 ? "flex-1" : "w-15 sm:w-18 lg:w-28"
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

              {/* Form Content */}
              <div className="space-y-6">{renderActiveForm()}</div>
              {/* Navigation Buttons */}
              <div
                className="mt-8 flex items-center justify-between gap-4 animate-slideInUp"
                style={{ animationDelay: "0.4s" }}
              >
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className={`group relative flex-1 overflow-hidden rounded-full border px-8 py-3 font-bold backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ${
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
                  onClick={handleNext}
                  className={`group relative flex-1 overflow-hidden rounded-full px-8 py-3 font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                    darkMode
                      ? "bg-linear-to-r from-blue-600 to-red-600 hover:shadow-lg hover:shadow-blue-600/40"
                      : "bg-linear-to-r from-red-600 to-blue-600 hover:shadow-lg hover:shadow-red-600/40"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>NEXT</span>
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
            </div>
          </div>
          {/* Desktop Registration Progress */}
          <div className="hidden lg:block lg:col-span-1">
            <RegistrationProgress
              stepLabels={stepLabels}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
