import { Fragment } from "react";

import { ChevronDown } from "lucide-react";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

type StatusTone = "success" | "warning" | "danger";

type StatusSelectProps<T extends string> = {
  value: T;

  onChange: (value: T) => void;

  options: readonly T[];

  getTone: (value: T) => StatusTone;
};

function getPillClasses(tone: StatusTone) {
  switch (tone) {
    case "success":
      return "bg-[#57d11f] text-white shadow-[0_8px_18px_rgba(87,209,31,0.3)]";

    case "warning":
      return "bg-[#f6bf14] text-[#231500] shadow-[0_8px_18px_rgba(246,191,20,0.3)]";

    case "danger":
      return "bg-[#ef4444] text-white shadow-[0_8px_18px_rgba(239,68,68,0.3)]";
  }
}

export default function StatusSelect<T extends string>({
  value,
  onChange,
  options,
  getTone,
}: StatusSelectProps<T>) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <ListboxButton
          className={`
inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-bold transition 
${getPillClasses(getTone(value))}
`}
        >
          {value}

          <ChevronDown className="h-4 w-4 opacity-80" />
        </ListboxButton>

        <Transition
          as={Fragment}
          leave="transition duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            className="
            absolute
            left-0
            top-full
            z-999
            mt-3
            min-w-48
            overflow-hidden
            rounded-2xl
            border
            border-white/20
            bg-[#1b2335]/95
            p-1.5
            shadow-2xl
            backdrop-blur-xl
            "
          >
            {options.map((option) => (
              <ListboxOption
                key={option}
                value={option}
                className="cursor-pointer"
              >
                {({ active, selected }) => (
                  <div
                    className={`
                    flex items-center justify-between gap-4 rounded-xl px-4 py-2.5 text-sm font-bold transition

                    ${
                      active
                        ? "bg-linear-to-r from-red-600 to-blue-600 text-white"
                        : "text-white/80"
                    }
                    `}
                  >
                    <span>{option}</span>

                    {selected && (
                      <span className="font-black text-emerald-400">✓</span>
                    )}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}
