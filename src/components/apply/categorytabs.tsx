import type { LucideIcon } from "lucide-react";
import type { Category } from "../../types/applysevent";
import type { getCompetitions } from "../../services/competition.services";
import type { getMyRegistrationById } from "../../services/registration.services";

export type CategoryTabsProps = {
  categories: Category[];
  selectedCategory: Category;
  categoryIcons: Record<Category, LucideIcon>;
  availableCompetitions: Awaited<ReturnType<typeof getCompetitions>>;
  myRegistrations: Awaited<ReturnType<typeof getMyRegistrationById>>[];
  isReviewFlow: boolean;
  loadingExistingRegistration: boolean;
  darkMode: boolean;
  competitionSlugMap: Record<Category, string>;
  onSelectCategory: (category: Category) => void;
};

export function CategoryTabs({
  categories,
  selectedCategory,
  categoryIcons,
  availableCompetitions,
  myRegistrations,
  isReviewFlow,
  loadingExistingRegistration,
  darkMode,
  competitionSlugMap,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div
      className="
      mb-12
      grid
      grid-cols-2
      gap-4
      animate-slideInDown
      lg:flex
      lg:flex-wrap
      lg:justify-center
    "
    >
      {categories.map((category) => {
        const Icon = categoryIcons[category];
        const eventCompetition = availableCompetitions.find(
          ({ slug }) => slug === competitionSlugMap[category],
        );
        const eventRegistration = myRegistrations.find(
          (registration) =>
            registration.competitionId === eventCompetition?.id,
        );

        return (
          <button
            key={category}
            type="button"
            disabled={loadingExistingRegistration}
            onClick={() => onSelectCategory(category)}
            className={`
            group
            flex
            w-full
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

            lg:w-56.25

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

            <span className="flex flex-col items-start text-left">
              <span>{category}</span>
              {isReviewFlow && (
                <span className="mt-1 text-xs font-medium opacity-75">
                  {eventRegistration
                    ? [
                        eventCompetition?.requiresKtm
                          ? `KTM: ${eventRegistration.ktmStatus}`
                          : null,
                        eventCompetition?.requiresPayment
                          ? `Pembayaran: ${eventRegistration.paymentStatus}`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" · ") || "Terdaftar"
                    : "Belum mendaftar"}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
