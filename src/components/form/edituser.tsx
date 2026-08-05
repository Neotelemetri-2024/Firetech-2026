import { useEffect, useRef, useState } from "react";
import DeleteModal from "./delete";
import Toast from "../ui/toast";
import Field from "../form/field";
import CompetitionCard from "../../components/card/competitioncard";
import { EVENTS } from "../../constants/event";
import type { SyntheticEvent, ReactNode } from "react";
import {
  CheckCircle2,
  GraduationCap,
  Loader2,
  Mail,
  Pencil,
  Plus,
  RotateCcw,
  User,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { UserCompetition, EditUserFormData } from "../../types/user";

/* ─────────── Types & Props ─────────── */

export type EditUserFormProps = {
  open: boolean;
  onClose: () => void;
  initialData?: EditUserFormData;
  onSubmit: (data: EditUserFormData) => void;
  isSaving?: boolean;
};

type CompetitionErrors = {
  team?: string;
  role?: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  school?: string;
  competitions: Record<number, CompetitionErrors>;
};

type UserInfoKey = "name" | "email" | "phone" | "school";

/* ─────────── Constants ─────────── */
const gradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(185, 28, 28, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.6) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

const INPUT_CLASS =
  "w-full rounded-2xl border border-white/25 bg-black/20 px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-white/40 hover:border-white/40 focus:border-white/60 focus:bg-white/5";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─────────── Helpers ─────────── */
function buildInitialForm(initialData?: EditUserFormData): EditUserFormData {
  if (!initialData) {
    return {
      name: "",
      email: "",
      phone: "",
      school: "",
      competitions: [
        {
          title: EVENTS[0],
          team: "",
          role: "",
          payment: "Pending",
          submission: "Pending",
        },
      ],
    };
  }

  return {
    name: initialData.name,
    email: initialData.email,
    phone: initialData.phone,
    school: initialData.school,
    competitions: initialData.competitions.map((competition) => ({
      title: competition.title,
      team: competition.team,
      role: competition.role,
      payment: competition.payment,
      submission: competition.submission,
    })),
  };
}

function validateForm(form: EditUserFormData): FormErrors {
  const errors: FormErrors = { competitions: {} };

  if (!form.name.trim()) errors.name = "The name field is required.";

  if (!form.email.trim()) {
    errors.email = "The email field is required.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  const phoneDigits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) {
    errors.phone = "The WhatsApp number field is required.";
  } else if (phoneDigits.length < 8) {
    errors.phone = "Enter a valid WhatsApp number.";
  }

  if (!form.school.trim()) errors.school = "The institution field is required.";

  form.competitions.forEach((competition, index) => {
    const competitionErrors: CompetitionErrors = {};

    if (!competition.team.trim()) {
      competitionErrors.team = "Team name is required.";
    }

    if (!competition.role.trim()) {
      competitionErrors.role = "Role is required.";
    }

    if (Object.keys(competitionErrors).length > 0) {
      errors.competitions[index] = competitionErrors;
    }
  });

  return errors;
}

function hasErrors(errors: FormErrors): boolean {
  return Boolean(
    errors.name ||
    errors.email ||
    errors.phone ||
    errors.school ||
    Object.keys(errors.competitions).length > 0,
  );
}

function buildCompetitionErrors(
  competition: UserCompetition,
): CompetitionErrors {
  const competitionErrors: CompetitionErrors = {};

  if (!competition.team.trim())
    competitionErrors.team = "Team name is required.";
  if (!competition.role.trim()) competitionErrors.role = "Role is required.";

  return competitionErrors;
}

/* ─────────── Section Card ─────────── */

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article>
      <h3 className="text-xl font-black tracking-wide text-white sm:text-[1.35rem]">
        {title}
      </h3>
      <div className="mt-4 space-y-4">{children}</div>
    </article>
  );
}

/* ─────────── Main Component ─────────── */

export default function EditUser({
  open,
  onClose,
  initialData,
  onSubmit,
  isSaving = false,
}: EditUserFormProps) {
  const [form, setForm] = useState<EditUserFormData>(() =>
    buildInitialForm(initialData),
  );
  const [expandedCompetition, setExpandedCompetition] = useState<number | null>(
    0,
  );
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const [isDirty, setIsDirty] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const [errors, setErrors] = useState<FormErrors>({ competitions: {} });
  const [submitted, setSubmitted] = useState(false);
  const lastInitialData = useRef(initialData);

  /* Reset the form each time the modal opens with fresh data */
  useEffect(() => {
    if (open && lastInitialData.current !== initialData && !isDirty) {
      lastInitialData.current = initialData;

      setForm(buildInitialForm(initialData));

      setErrors({
        competitions: {},
      });

      setSubmitted(false);
    }
  }, [open, initialData, isDirty]);

  /* Lock body scroll + close on Escape */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSaving) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isSaving, onClose]);

  if (!open) return null;

  const updateField = (key: UserInfoKey, value: string) => {
    setIsDirty(true);

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => {
      if (!prev[key]) return prev;

      return {
        ...prev,
        [key]: undefined,
      };
    });
  };

  const updateCompetition = (
    index: number,
    patch: Partial<UserCompetition>,
  ) => {
    setIsDirty(true);
    setForm((prev) => ({
      ...prev,
      competitions: prev.competitions.map((competition, i) =>
        i === index ? { ...competition, ...patch } : competition,
      ),
    }));

    /* Rebuild that competition's errors from its latest value */
    setErrors((prev) => {
      const target = {
        ...(form.competitions[index] ?? {}),
        ...patch,
      } as UserCompetition;
      const nextErrors = buildCompetitionErrors(target);
      const competitions = { ...prev.competitions };

      if (Object.keys(nextErrors).length > 0) {
        competitions[index] = nextErrors;
      } else {
        delete competitions[index];
      }

      return { ...prev, competitions };
    });
  };

  const addCompetition = () => {
    setIsDirty(true);

    setForm((prev) => ({
      ...prev,
      competitions: [
        ...prev.competitions,
        {
          title: EVENTS[0],
          team: "",
          role: "",
          payment: "Pending",
          submission: "Pending",
        },
      ],
    }));
  };

  const removeCompetition = (index: number) => {
    setIsDirty(true);
    setForm((prev) => ({
      ...prev,
      competitions: prev.competitions.filter((_, i) => i !== index),
    }));

    setErrors((prev) => {
      const competitions: Record<number, CompetitionErrors> = {};

      Object.entries(prev.competitions).forEach(([key, value]) => {
        const numericKey = Number(key);

        if (numericKey === index) return;

        competitions[numericKey > index ? numericKey - 1 : numericKey] = value;
      });

      return {
        ...prev,
        competitions,
      };
    });

    // update accordion setelah item dihapus
    setExpandedCompetition((prev) => {
      if (prev === null) {
        return null;
      }

      // yang sedang dibuka adalah item yang dihapus
      if (prev === index) {
        return null;
      }

      // jika item sebelum yang dibuka dihapus,
      // index accordion ikut bergeser
      if (prev > index) {
        return prev - 1;
      }

      return prev;
    });
  };

  const confirmDeleteCompetition = () => {
    if (deleteTarget === null) return;

    const deletedCompetition = form.competitions[deleteTarget];

    removeCompetition(deleteTarget);

    // tutup accordion
    setExpandedCompetition(null);

    // tutup modal
    setDeleteTarget(null);

    setToast({
      open: true,
      message: `${deletedCompetition.title} deleted`,
      type: "success",
    });
  };

  const handleReset = () => {
    setForm(buildInitialForm(initialData));

    setErrors({
      competitions: {},
    });

    setSubmitted(false);

    setExpandedCompetition(0);

    setIsDirty(false);
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      school: form.school.trim(),
      competitions: form.competitions.map((competition) => ({
        ...competition,
        team: competition.team.trim(),
        role: competition.role.trim(),
      })),
    });

    setSubmitted(true);

    setIsDirty(false);

    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/70 px-3 py-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-user-title"
      style={{ animation: "proof-fade-in 0.25s ease-out" }}
    >
      <div
        className="relative w-full max-w-255 max-h-[90vh] overflow-hidden rounded-[1.8rem] border border-white/35 text-white shadow-[0_28px_70px_rgba(0,0,0,0.48)]"
        style={{
          ...gradientStyle,
          animation: "proof-zoom-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -left-16 top-4 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-2 h-44 w-44 rounded-full bg-[#5b7cff]/20 blur-3xl" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSaving}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-9999 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            animation:
              "proof-zoom-in 0.35s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="custom-scrollbar max-h-[90vh] overflow-y-auto px-5 py-5 sm:px-7 sm:py-7">
          {/* Header */}
          <div
            className="mb-5 border-b border-white/80 pb-4"
            style={{ animation: "proof-slide-down 0.3s 0.08s ease-out both" }}
          >
            <p className="mb-2 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-white/90">
              Edit
            </p>

            <h2
              id="edit-user-title"
              className="text-2xl font-black uppercase tracking-wide sm:text-[2.1rem]"
            >
              Edit User
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Update the details below to edit this user. Changes will be saved
              when you click Save Changes.
            </p>
          </div>

          {/* Success banner */}
          {submitted && (
            <div
              className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-3"
              role="status"
              style={{ animation: "proof-fade-in 0.3s ease-out" }}
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
              <p className="text-sm font-semibold text-emerald-300">
                User successfully updated!
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 lg:grid-cols-[1.02fr_1fr]">
              {/* ── Information ── */}
              <div
                style={{
                  animation: "proof-slide-up 0.35s 0.15s ease-out both",
                }}
              >
                <SectionCard title="Information">
                  <Field
                    label="Name"
                    icon={<User className="h-4 w-4" />}
                    error={errors.name}
                  >
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="e.g., Wonwoo"
                      className={`${INPUT_CLASS} ${
                        errors.name ? "border-red-400/60" : ""
                      }`}
                    />
                  </Field>

                  <Field
                    label="Email"
                    icon={<Mail className="h-4 w-4" />}
                    error={errors.email}
                  >
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="e.g., user@example.com"
                      className={`${INPUT_CLASS} ${
                        errors.email ? "border-red-400/60" : ""
                      }`}
                    />
                  </Field>

                  <Field
                    label="WhatsApp"
                    icon={<FaWhatsapp className="h-4 w-4" />}
                    error={errors.phone}
                  >
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="e.g., 628123456789"
                      className={`${INPUT_CLASS} ${
                        errors.phone ? "border-red-400/60" : ""
                      }`}
                    />
                  </Field>

                  <Field
                    label="Institution"
                    icon={<GraduationCap className="h-4 w-4" />}
                    error={errors.school}
                  >
                    <input
                      type="text"
                      value={form.school}
                      onChange={(e) => updateField("school", e.target.value)}
                      placeholder="e.g., Universitas Andalas"
                      className={`${INPUT_CLASS} ${
                        errors.school ? "border-red-400/60" : ""
                      }`}
                    />
                  </Field>
                </SectionCard>
              </div>

              {/* ── Competition ── */}
              <div
                style={{
                  animation: "proof-slide-up 0.35s 0.2s ease-out both",
                }}
              >
                <SectionCard title="Competition">
                  <div className="space-y-4">
                    {form.competitions.map((competition, index) => (
                      <CompetitionCard
                        key={`${competition.title}-${index}`}
                        competition={competition}
                        index={index}
                        expanded={expandedCompetition === index}
                        onToggle={() =>
                          setExpandedCompetition(
                            expandedCompetition === index ? null : index,
                          )
                        }
                        onDelete={setDeleteTarget}
                        error={errors.competitions[index]}
                        canRemove={true}
                        onUpdate={updateCompetition}
                      />
                    ))}

                    <button
                      type="button"
                      onClick={addCompetition}
                      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-white/30 bg-white/5 px-4 py-3 text-sm font-bold text-white/80 transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                      Add Competition
                    </button>
                  </div>
                </SectionCard>
              </div>
            </div>

            {/* ── Actions ── */}
            <div
              className="mt-8 flex flex-col-reverse gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-end"
              style={{
                animation: "proof-slide-up 0.35s 0.3s ease-out both",
              }}
            >
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="reset"
                onClick={handleReset}
                disabled={isSaving}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-red-600 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.32)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <DeleteModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteCompetition}
        itemName={
          deleteTarget !== null ? form.competitions[deleteTarget]?.title : ""
        }
        itemLabel="competition"
      />

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </div>
  );
}
