import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import type { Category, ApplyFormDataMap } from "../types/applysevent";
import {
  applyFormConfig,
  initialApplyFormData,
} from "../config/applyformconfig";
import { getMissingFields, fieldLabels } from "../config/applyvalidation";
import {
  getMyRegistrationById,
  getMyRegistrations,
  registerCompetition,
  updateRegistration,
  type RegistrationFile,
} from "../services/registration.services";
import { getCompetitions } from "../services/competition.services";
import {
  categoryFromSlug,
  categoryFromName,
  getRegistrationFiles,
  formDataFromRegistration,
  buildPayload,
} from "../utils/applyhelpers";

const competitionSlugMap: Record<Category, string> = {
  Hackathon: "hackathon",
  "UI/UX": "ui-ux-competition",
  "E-Football": "e-football",
};

export function useApplyForm() {
  const location = useLocation();
  const initialCategory =
    categoryFromName(location.state?.competition) ??
    (location.state?.category as Category | undefined) ??
    "Hackathon";
  const initialRegistrationId = Number(location.state?.registrationId);
  const isReviewFlow =
    Boolean(location.state?.reviewRegistration) ||
    (Number.isInteger(initialRegistrationId) && initialRegistrationId > 0);

  const [selectedCategory, setSelectedCategory] =
    useState<Category>(initialCategory);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialApplyFormData);
  const [showValidationToast, setShowValidationToast] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [toastType, setToastType] = useState<"error" | "success">("error");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeRegistrationId, setActiveRegistrationId] = useState<number | null>(
    Number.isInteger(initialRegistrationId) && initialRegistrationId > 0
      ? initialRegistrationId
      : null,
  );
  const [myRegistrations, setMyRegistrations] = useState<
    Awaited<ReturnType<typeof getMyRegistrationById>>[]
  >([]);
  const [availableCompetitions, setAvailableCompetitions] = useState<
    Awaited<ReturnType<typeof getCompetitions>>
  >([]);
  const [loadingExistingRegistration, setLoadingExistingRegistration] =
    useState(false);
  const [existingFiles, setExistingFiles] = useState<RegistrationFile[]>([]);
  const [existingRegistration, setExistingRegistration] = useState<
    Awaited<ReturnType<typeof getMyRegistrationById>> | null
  >(null);

  const { steps: stepLabels } = applyFormConfig[selectedCategory];
  const totalSteps = stepLabels.length;

  useEffect(() => {
    let cancelled = false;
    const loadRegistrationsAndCompetitions = async () => {
      setLoadingExistingRegistration(true);
      try {
        const [registrations, competitions] = await Promise.all([
          getMyRegistrations(),
          getCompetitions(),
        ]);
        if (cancelled) return;
        setMyRegistrations(registrations);
        setAvailableCompetitions(competitions);

        const targetRegId = initialRegistrationId;
        const targetCategory = initialCategory;

        if (targetRegId && Number.isInteger(targetRegId) && targetRegId > 0) {
          let registration = registrations.find((r) => r.id === targetRegId);
          if (!registration) {
            try {
              registration = await getMyRegistrationById(targetRegId);
            } catch (e) {
              console.error("Failed to fetch registration by id:", e);
            }
          }

          if (registration) {
            const slug = competitions.find(
              (competition) => competition.id === registration.competitionId,
            )?.slug;
            const category =
              categoryFromSlug(slug) ??
              categoryFromName(registration.competition?.name) ??
              targetCategory;

            if (cancelled) return;
            setSelectedCategory(category);
            setActiveRegistrationId(registration.id);
            setExistingRegistration(registration);
            setExistingFiles(getRegistrationFiles(registration));
            setFormData((current) =>
              ({ ...current, [category]: formDataFromRegistration(category, registration) }) as ApplyFormDataMap,
            );
            return;
          }
        }

        const comp = competitions.find(
          ({ slug }) => slug === competitionSlugMap[targetCategory],
        );
        const matchedReg = registrations.find(
          (r) => r.competitionId === comp?.id,
        );

        if (matchedReg) {
          const details = matchedReg.members ? matchedReg : await getMyRegistrationById(matchedReg.id);
          if (cancelled) return;
          if (details) {
            setActiveRegistrationId(details.id);
            setExistingRegistration(details);
            setExistingFiles(details.files ?? []);
            setFormData((current) =>
              ({
                ...current,
                [targetCategory]: formDataFromRegistration(targetCategory, details),
              }) as ApplyFormDataMap,
            );
          } else {
            setActiveRegistrationId(null);
            setExistingRegistration(null);
            setExistingFiles([]);
          }
        } else {
          setActiveRegistrationId(null);
          setExistingRegistration(null);
          setExistingFiles([]);
        }
      } catch (error) {
        console.error("Failed to load registrations for apply:", error);
      } finally {
        if (!cancelled) setLoadingExistingRegistration(false);
      }
    };

    void loadRegistrationsAndCompetitions();
    return () => {
      cancelled = true;
    };
  }, [initialCategory, initialRegistrationId, location.key]);

  const getFormMissingFields = (
    category: Category,
    step: number,
    categoryData: Record<string, string | File | null>,
  ) => {
    const missing = getMissingFields(category, step, categoryData);
    const ktmRejected =
      existingRegistration?.ktmStatus?.toLowerCase() === "rejected" ||
      existingRegistration?.ktmStatus?.toLowerCase() === "declined";
    const paymentRejected =
      existingRegistration?.paymentStatus?.toLowerCase() === "rejected" ||
      existingRegistration?.paymentStatus?.toLowerCase() === "declined";

    let ktmInvalid = ktmRejected;
    let paymentInvalid = paymentRejected;

    if (category === "UI/UX" || category === "Hackathon") {
      const bothRejected = ktmRejected && paymentRejected;
      ktmInvalid = bothRejected;
      paymentInvalid = bothRejected;
    }

    const hasExistingIdentity =
      !ktmInvalid &&
      existingFiles.some((file) => file.kind === "identity");
    const hasExistingPaymentProof =
      !paymentInvalid &&
      existingFiles.some((file) => file.kind === "payment_proof");

    return missing.filter((field) => {
      if (field === "ktm" && hasExistingIdentity) return false;
      if (field === "paymentProof" && hasExistingPaymentProof) return false;
      return true;
    });
  };

  const handleSelectCategory = async (category: Category) => {
    const eventMap: Record<Category, string> = {
      Hackathon: "hackathon",
      "E-Football": "e-football",
      "UI/UX": "ui-ux-competition",
    };

    const eventId = eventMap[category];
    sessionStorage.setItem("activeEvent", eventId);
    window.dispatchEvent(
      new CustomEvent("firetech-event-change", {
        detail: eventId,
      }),
    );

    setSelectedCategory(category);
    setCurrentStep(1);
    setShowValidationToast(false);

    const competition = availableCompetitions.find(
      ({ slug }) => slug === competitionSlugMap[category],
    );
    const registration = myRegistrations.find(
      (item) => item.competitionId === competition?.id,
    );
    if (!registration) {
      setActiveRegistrationId(null);
      setExistingRegistration(null);
      setExistingFiles([]);
      setFormData((current) => ({
        ...current,
        [category]: initialApplyFormData[category],
      }));
      return;
    }

    setLoadingExistingRegistration(true);
    try {
      const details = await getMyRegistrationById(registration.id);
      setActiveRegistrationId(details.id);
      setExistingRegistration(details);
      setExistingFiles(getRegistrationFiles(details));
      setFormData((current) =>
        ({
          ...current,
          [category]: formDataFromRegistration(category, details),
        }) as ApplyFormDataMap,
      );
    } catch (error) {
      console.error("Failed to load registration for review:", error);
      setActiveRegistrationId(null);
      setExistingRegistration(null);
      setExistingFiles([]);
    } finally {
      setLoadingExistingRegistration(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    const nextValue = type === "file" ? (files?.[0] ?? null) : value;

    setFormData((prev) => ({
      ...prev,
      [selectedCategory]: {
        ...(prev[selectedCategory] as Record<string, string | File | null>),
        [name]: nextValue,
      },
    }));

    setShowValidationToast(false);
  };

  const handleNext = () => {
    const categoryData = formData[selectedCategory] as Record<
      string,
      string | File | null
    >;

    const missingFields = getFormMissingFields(
      selectedCategory,
      currentStep,
      categoryData,
    );

    if (missingFields.length > 0) {
      const missingLabels = missingFields
        .map((field) => fieldLabels[field] ?? field)
        .join(", ");

      setValidationMessage(
        `Harap lengkapi kolom wajib berikut sebelum melanjutkan: ${missingLabels}`,
      );
      setShowValidationToast(true);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const categoryData = formData[selectedCategory] as Record<
        string,
        string | File | null
      >;

      const missingFields = getFormMissingFields(
        selectedCategory,
        currentStep,
        categoryData,
      );

      if (missingFields.length > 0) {
        const missingLabels = missingFields
          .map((field) => fieldLabels[field] ?? field)
          .join(", ");

        setToastType("error");
        setValidationMessage(
          `Harap lengkapi kolom wajib berikut sebelum melanjutkan: ${missingLabels}`,
        );
        setShowValidationToast(true);
        return;
      }

      const payload = buildPayload(selectedCategory, formData);
      const competitions = await getCompetitions();
      const competition = competitions.find(
        ({ slug }) => slug === competitionSlugMap[selectedCategory],
      );

      if (!competition) {
        throw new Error(`Competition not found for ${selectedCategory}`);
      }

      const response = activeRegistrationId
        ? await updateRegistration(activeRegistrationId, payload)
        : await registerCompetition(competition.id, payload);

      console.log("REGISTER SUCCESS:", response);
      window.dispatchEvent(new Event("firetech-registration-updated"));
      if (isReviewFlow) {
        void getMyRegistrations()
          .then(setMyRegistrations)
          .catch((error) =>
            console.error("Failed to refresh registration statuses:", error),
          );
      }

      if (!activeRegistrationId) {
        setFormData(initialApplyFormData);
        setCurrentStep(1);
      }

      setToastType("success");
      setValidationMessage(
        activeRegistrationId
          ? "Perubahan pendaftaran berhasil dikirim. Silakan tunggu konfirmasi panitia."
          : "Pendaftaran berhasil dikirim! Silakan tunggu konfirmasi dari panitia.",
      );
      setShowValidationToast(true);
    } catch (error: unknown) {
      console.error("REGISTER ERROR:", error);
      let errorMessage = "Gagal mengirim pendaftaran.";

      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data as
          | {
              message?: string;
              errors?: { field?: string; message?: string }[];
            }
          | undefined;
        const validationDetails = responseData?.errors
          ?.map(({ field, message }) =>
            [field, message].filter(Boolean).join(": "),
          )
          .filter(Boolean)
          .join("; ");

        errorMessage =
          [responseData?.message, validationDetails]
            .filter(Boolean)
            .join(": ") || "Gagal mengirim pendaftaran.";
      }

      setToastType("error");
      setValidationMessage(errorMessage);
      setShowValidationToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return "completed";
    if (step === currentStep) return "active";
    return "pending";
  };

  const getStepColor = (step: number, darkMode: boolean) => {
    const status = getStepStatus(step);
    if (status === "completed" || status === "active") {
      return darkMode
        ? "border-2 border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
        : "border-2 border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/30";
    }
    return darkMode
      ? "border-2 border-slate-300 bg-transparent text-slate-700 hover:border-blue-600 "
      : "border-2 border-slate-600 bg-transparent text-slate-300 hover:border-red-600 ";
  };

  return {
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
  };
}
