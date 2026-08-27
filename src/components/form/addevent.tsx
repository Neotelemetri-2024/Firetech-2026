import { useState } from "react";
import type { ReactNode } from "react";
import {
  AlertCircle,
  CalendarClock,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronDown,
  FileText,
  Tag,
  Type as TypeIcon,
  Users,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import type { EventRow } from "../events/tableevent";
import DatePicker from "../ui/datepicker";

/* ─────────── Types & Props ─────────── */

export type NewEventData = Omit<EventRow, "id" | "participants"> & {
  participants: number;
};

type AddEventProps = {
  onSubmit: (data: NewEventData) => void;
  onCancel?: () => void;
};

type FormState = {
  name: string;
  category: string;
  date: string;
  registrationDeadline: string;
  maxParticipants: string;
  description: string;
};

/* ─────────── Constants ─────────── */

const INITIAL_FORM: FormState = {
  name: "",
  category: "",
  date: "",
  registrationDeadline: "",
  maxParticipants: "",
  description: "",
};

const CATEGORIES = ["Programming", "Design", "Esport", "Skill"];

const INPUT_CLASS =
  "w-full rounded-2xl border border-white/25 bg-black/20 px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-white/40 hover:border-white/40 focus:border-white/60 focus:bg-white/5";

const MAX_QUOTA = 9999;

/* ─────────── Helpers ─────────── */

function formatIndonesianDate(isoDate: string, fallback: string) {
  if (!isoDate) return fallback;
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return fallback;
  return new Date(year, month - 1, day).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function validateForm(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (!form.name.trim()) errors.name = "The event name is required.";
  if (!form.category) errors.category = "Select event category";
  if (!form.date) errors.date = "The event date field is mandatory.";
  if (!form.registrationDeadline) {
    errors.registrationDeadline =
      "The registration deadline field is mandatory.";
  } else if (form.date && form.registrationDeadline > form.date) {
    errors.registrationDeadline =
      "The registration deadline must be before the event date";
  }

  const max = Number(form.maxParticipants);
  if (!form.maxParticipants.trim()) {
    errors.maxParticipants = "The participant quota field is mandatory.";
  } else if (!Number.isInteger(max) || max < 1) {
    errors.maxParticipants = "Minimum quota of 1 participant";
  } else if (max > MAX_QUOTA) {
    errors.maxParticipants = `Maximum quota of ${MAX_QUOTA} participants`;
  }

  return errors;
}

/* ─────────── Field Wrapper ─────────── */

type FieldProps = {
  label: string;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
};

function Field({ label, icon, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-[0.22em] text-white/70">
        <span className="text-white/45">{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────── Event Preview ─────────── */

function EventPreview({ form }: { form: FormState }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] shadow-[0_10px_24px_rgba(0,0,0,0.2)] backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/15 bg-black/20 px-5 py-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-white/70">
          <CalendarDays className="h-4 w-4 text-white/50" />
          Event Preview
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[0.65rem] font-black uppercase tracking-widest text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live
        </span>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-white/45">
              Name
            </p>
            <p className="mt-1 -wrap-break-word text-lg font-black leading-tight text-white">
              {form.name.trim() || "Event Name"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-white/45">
              Category
            </p>
            <p className="mt-1 truncate font-bold text-white/90">
              {form.category || "-"}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-white/45">
              Date
            </p>
            <p className="mt-1 truncate font-bold text-white/90">
              {formatIndonesianDate(form.date, "-")}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-white/45">
              Registration Deadline
            </p>
            <p className="mt-1 truncate font-bold text-white/90">
              {formatIndonesianDate(form.registrationDeadline, "-")}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-white/45">
              Participant Quota
            </p>
            <p className="mt-1 truncate font-bold text-white/90">
              {form.maxParticipants
                ? `${Number(form.maxParticipants).toLocaleString("id-ID")} orang`
                : "-"}
            </p>
          </div>
        </div>

        {form.description.trim() && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-white/45">
              Description
            </p>
            <p className="mt-1 line-clamp-3 text-sm leading-6 text-white/80">
              {form.description}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

/* ─────────── Main Component ─────────── */

export default function AddEvent({ onSubmit, onCancel }: AddEventProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const updateQuota = (type: "increase" | "decrease") => {
    const current = Number(form.maxParticipants) || 0;

    const next =
      type === "increase"
        ? Math.min(current + 1, MAX_QUOTA)
        : Math.max(current - 1, 1);

    updateField("maxParticipants", String(next));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      name: form.name.trim(),
      category: form.category,
      date: formatIndonesianDate(form.date, form.date),
      status: "Upcoming",
      participants: 0,
      maxParticipants: Number(form.maxParticipants),
      registrationDeadline: formatIndonesianDate(
        form.registrationDeadline,
        form.registrationDeadline,
      ),
    });

    setForm(INITIAL_FORM);
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
  };

  return (
    <div className="min-h-screen overflow-hidden rounded-4xl border border-white/15 bg-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)] px-4 py-5 shadow-[0_10px_24px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:px-7 sm:py-7">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
          <CalendarPlus className="h-6 w-6" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
            Event
          </p>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Add New Event
          </h2>
        </div>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
        Fill in the form below to add a new event. Make sure all required fields
        are completed before submitting.
      </p>

      {/* Success banner */}
      {submitted && (
        <div
          className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-3"
          role="status"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
          <p className="text-sm font-semibold text-emerald-300">
            Event successfully added!
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"
      >
        {/* ── Fields ── */}
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field
                label="Name"
                icon={<TypeIcon className="h-4 w-4" />}
                error={errors.name}
              >
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g., National Hackathon 2026"
                  className={`${INPUT_CLASS} ${
                    errors.name ? "border-red-400/60" : ""
                  }`}
                />
              </Field>
            </div>

            <Field
              label="Kategori"
              icon={<Tag className="h-4 w-4" />}
              error={errors.category}
            >
              <Listbox
                value={form.category}
                onChange={(value) => updateField("category", value)}
              >
                <div className="relative">
                  <ListboxButton
                    className={`${INPUT_CLASS} flex cursor-pointer items-center justify-between ${
                      errors.category ? "border-red-400/60" : ""
                    }`}
                  >
                    <span>{form.category || "Select category"}</span>

                    <ChevronDown className="h-5 w-5 text-white/50" />
                  </ListboxButton>

                  <Transition
                    as={Fragment}
                    leave="transition duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-white/20 bg-[#1b2335]/95 backdrop-blur-xl shadow-2xl">
                      {CATEGORIES.map((category) => (
                        <ListboxOption
                          key={category}
                          value={category}
                          className={({ active }) =>
                            `cursor-pointer px-5 py-3 font-semibold transition ${
                              active
                                ? "bg-linear-to-r from-red-600 to-blue-600 text-white"
                                : "text-white/80"
                            }`
                          }
                        >
                          {({ selected }) => (
                            <div className="flex items-center justify-between">
                              <span>{category}</span>

                              {selected && (
                                <span className="font-black text-emerald-400">
                                  ✓
                                </span>
                              )}
                            </div>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
            </Field>

            <Field
              label="Event Date"
              icon={<CalendarDays className="h-4 w-4" />}
              error={errors.date}
            >
              <DatePicker
                value={form.date}
                onChange={(value) => updateField("date", value)}
                error={Boolean(errors.date)}
              />
            </Field>

            <Field
              label="Registration Deadline"
              icon={<CalendarClock className="h-4 w-4" />}
              error={errors.registrationDeadline}
            >
              <DatePicker
                value={form.registrationDeadline}
                onChange={(value) => updateField("registrationDeadline", value)}
                error={Boolean(errors.registrationDeadline)}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field
                label="Participant Quota"
                icon={<Users className="h-4 w-4" />}
                error={errors.maxParticipants}
              >
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={MAX_QUOTA}
                    value={form.maxParticipants}
                    onChange={(e) =>
                      updateField("maxParticipants", e.target.value)
                    }
                    placeholder="e.g., 100"
                    className={`${INPUT_CLASS} pr-14 [appearance:textfield] ${
                      errors.maxParticipants ? "border-red-400/60" : ""
                    }`}
                  />

                  <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => updateQuota("increase")}
                      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md text-white/60 transition hover:bg-white/10 hover:text-white"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => updateQuota("decrease")}
                      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md text-white/60 transition hover:bg-white/10 hover:text-white"
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field
                label="Description"
                icon={<FileText className="h-4 w-4" />}
              >
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Brief description of the event (optional)"
                  rows={4}
                  className={`${INPUT_CLASS} resize-none leading-6`}
                />
              </Field>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="reset"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              Reset
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-red-600 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.32)] cursor-pointer"
            >
              <CalendarPlus className="h-5 w-5" />
              Submit
            </button>
          </div>
        </div>

        {/* ── Preview ── */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <EventPreview form={form} />
        </div>
      </form>
    </div>
  );
}
