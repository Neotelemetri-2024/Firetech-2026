import { ChevronDown, Trash2, User, Users } from "lucide-react";
import Field from "../form/field";
import type { UserCompetition } from "../../types/user";
import { getPaymentTone, getSubmissionTone } from "../../utils/status";
import StatusSelect from "../form/statusselect";

const INPUT_CLASS =
  "w-full rounded-2xl border border-white/25 bg-black/20 px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-white/40 hover:border-white/40 focus:border-white/60 focus:bg-white/5";

type CompetitionErrors = {
  team?: string;
  role?: string;
};

type CompetitionCardProps = {
  competition: UserCompetition;

  index: number;

  error?: CompetitionErrors;

  canRemove: boolean;

  expanded: boolean;

  onToggle: () => void;

  onDelete: (index: number) => void;

  onUpdate: (index: number, patch: Partial<UserCompetition>) => void;
};

export default function CompetitionCard({
  competition,
  index,
  error,
  canRemove,
  expanded,
  onToggle,
  onDelete,
  onUpdate,
}: CompetitionCardProps) {
  return (
    <article className="rounded-3xl border border-white/20 bg-black/20 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onToggle}
          className="flex flex-1 cursor-pointer items-center justify-between text-left"
        >
          <div>
            <h3 className="text-lg font-black uppercase tracking-wide">
              {competition.title}
            </h3>

            <p className="text-sm text-white/60">
              {competition.team || "No Team"}
            </p>
          </div>

          <ChevronDown
            className={`
            h-5 w-5 transition-transform
            ${expanded ? "rotate-180" : ""}
            `}
          />
        </button>

        {canRemove && (
          <button
            type="button"
            onClick={() => onDelete(index)}
            className="
        inline-flex h-9 w-9
        cursor-pointer
        items-center justify-center
        rounded-full
        border border-red-400/30
        bg-red-500/15
        text-red-300
        "
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div
        className={`
  transition-all duration-500

  ${
    expanded
      ? "mt-4 max-h-250 opacity-100"
      : "max-h-0 overflow-hidden opacity-0"
  }

  `}
      >
        <div className="grid gap-4 overflow-visible">
          <Field
            label="Team"
            icon={<Users className="h-4 w-4" />}
            error={error?.team}
          >
            <input
              type="text"
              value={competition.team}
              onChange={(e) =>
                onUpdate(index, {
                  team: e.target.value,
                })
              }
              className={INPUT_CLASS}
            />
          </Field>

          <div className="grid grid-cols-[90px_15px_1fr] items-center gap-3">
            <p className="font-bold">Payment</p>

            <span className="text-center">:</span>

            <div className="flex justify-start">
              <StatusSelect
                value={competition.payment}
                onChange={(payment) => onUpdate(index, { payment })}
                options={["Paid", "Pending", "Declined"]}
                getTone={getPaymentTone}
              />
            </div>
          </div>

          <div className="grid grid-cols-[90px_15px_1fr] items-center gap-3">
            <p className="font-bold">Submission</p>

            <span className="text-center">:</span>

            <div className="flex justify-start">
              <StatusSelect
                value={competition.submission}
                onChange={(submission) => onUpdate(index, { submission })}
                options={["Submitted", "Pending", "Rejected"]}
                getTone={getSubmissionTone}
              />
            </div>
          </div>

          <Field
            label="Role"
            icon={<User className="h-4 w-4" />}
            error={error?.role}
          >
            <input
              type="text"
              value={competition.role}
              onChange={(e) =>
                onUpdate(index, {
                  role: e.target.value,
                })
              }
              className={INPUT_CLASS}
            />
          </Field>
        </div>
      </div>
    </article>
  );
}
