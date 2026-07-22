import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Category } from "../../types/typesevent";
import {
  applyFormConfig,
  initialApplyFormData,
} from "../../config/applyformconfig";
import HackathonForm from "../../components/apply/hackathonform";
import UiUxForm from "../../components/apply/uiuxform";
import EfootballForm from "../../components/apply/efootballform";
import FastTypingForm from "../../components/apply/fasttypingform";

const categories: Category[] = [
  "Hackathon",
  "UI/UX",
  "efootball",
  "Fast Typing",
];

export default function Apply() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Hackathon");
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
      case "efootball":
        return (
          <EfootballForm
            step={currentStep}
            formData={formData.efootball}
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
    }
  };

  return (
    <main className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap gap-4 animate-slideInDown">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleSelectCategory(category)}
              className={`flex items-center gap-3 rounded-2xl px-6 py-3 font-semibold transition-all duration-300 group hover:scale-105 active:scale-95 ${
                selectedCategory === category
                  ? "border-2 border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/30 animate-pulse"
                  : "border-2 border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-500/10"
              }`}
            >
              {category === "Hackathon" && (
                <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-current group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <div className="h-3 w-3 rounded-sm bg-current" />
                </div>
              )}
              {category === "UI/UX" && (
                <div className="grid h-6 w-6 grid-cols-2 gap-1 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm bg-current group-hover:animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              )}
              {category === "efootball" && (
                <div
                  className="relative h-6 w-6 group-hover:scale-110 group-hover:animate-spin transition-all duration-300"
                  style={{ animationDuration: "2s" }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-current" />
                  <div className="absolute inset-1 rounded-full border border-current" />
                </div>
              )}
              {category === "Fast Typing" && (
                <div className="flex gap-1 group-hover:scale-110 transition-all duration-300">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-0.5 group-hover:animate-bounce"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div
                          key={j}
                          className="h-1 w-1 rounded-full bg-current"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {category}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 animate-slideInUp">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border-2 border-slate-700 bg-slate-900/50 p-8 backdrop-blur-sm hover:border-slate-600 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/20 group">
              {/* Step Indicator */}
              <div className="mb-8 flex items-center justify-between">
                {stepLabels.map((label, index) => {
                  const step = index + 1;
                  return (
                    <div key={label} className="flex items-center">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
                            getStepStatus(step) === "completed"
                              ? "border-2 border-green-500 bg-green-500/20 text-green-400 animate-scaleIn"
                              : getStepStatus(step) === "active"
                                ? "border-2 border-cyan-500 bg-cyan-500/20 text-cyan-300 animate-pulse shadow-lg shadow-cyan-500/50"
                                : "border-2 border-slate-600 bg-slate-800 text-slate-400"
                          }`}
                        >
                          {step}
                        </div>
                        <span className="hidden text-sm font-semibold text-slate-300 md:inline">
                          {label}
                        </span>
                      </div>
                      {step < totalSteps && (
                        <div
                          className={`mx-4 h-1 w-16 transition-all duration-500 lg:w-24 relative overflow-hidden rounded-full ${
                            getStepStatus(step) === "completed"
                              ? "bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-500/50"
                              : getStepStatus(step) === "active"
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50 animate-pulse"
                                : "bg-slate-700"
                          }`}
                        >
                          {getStepStatus(step) === "completed" && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
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
                  className="group relative flex-1 overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-3 font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:bg-cyan-500/10 active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="group-hover:-translate-x-1 transition-transform duration-300">
                      ←
                    </span>
                    <span>BACK</span>
                  </span>

                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="group relative flex-1 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>NEXT</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.3),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-pulse"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Registration Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-3xl border-2 border-slate-700 bg-slate-900/50 p-6 backdrop-blur-sm hover:border-slate-600 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/20 animate-slideInUp">
              <h3 className="mb-6 text-lg font-bold text-white animate-slideInRight">
                Registration Progress
              </h3>

              <div className="space-y-4">
                {stepLabels.map((label, index) => {
                  const step = index + 1;
                  const status = getStepStatus(step);
                  return (
                    <div
                      key={label}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                        status === "completed"
                          ? "border border-green-500/30 bg-green-500/10 animate-slideInLeft"
                          : status === "active"
                            ? "border border-cyan-500/30 bg-cyan-500/10 animate-pulse"
                            : "border border-slate-700 bg-slate-800/30"
                      }`}
                    >
                      {status === "completed" ? (
                        <CheckCircle2
                          size={20}
                          className="text-green-500 animate-bounce"
                        />
                      ) : (
                        <XCircle
                          size={20}
                          className={
                            status === "active"
                              ? "text-cyan-500"
                              : "text-red-500"
                          }
                        />
                      )}
                      <span
                        className={`font-semibold ${
                          status === "completed"
                            ? "text-green-400"
                            : status === "active"
                              ? "text-cyan-300"
                              : "text-red-400"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideInDown {
          animation: slideInDown 0.5s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.8);
          }
        }

        @keyframes border-shine {
          0% {
            border-color: rgb(71, 85, 105);
          }
          50% {
            border-color: rgb(6, 182, 212);
          }
          100% {
            border-color: rgb(71, 85, 105);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-border-shine {
          animation: border-shine 3s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 0.5s ease-in-out;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </main>
  );
}
