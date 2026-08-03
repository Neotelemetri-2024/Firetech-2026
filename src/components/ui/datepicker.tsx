import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function formatDisplayDate(date: string) {
  if (!date) return "";
  const selected = new Date(date);
  return selected.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
function formatInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export default function DatePicker({
  value,
  onChange,
  error = false,
}: DatePickerProps) {
  const initialDate = value ? new Date(value) : new Date();
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };
  const selectDate = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);
    onChange(formatInputDate(selected));
    setOpen(false);
  };
  return (
    <div className="relative">
      {" "}
      {/* Input */}{" "}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={` flex w-full cursor-pointer items-center justify-between rounded-2xl border px-3 py-3 sm:px-4 text-sm font-medium text-white transition bg-black/20 ${error ? "border-red-400/60" : "border-white/25 hover:border-white/40"} `}
      >
        {" "}
        <span className={value ? "text-white" : "text-white/40"}>
          {" "}
          {value ? formatDisplayDate(value) : "dd/mm/yyyy"}{" "}
        </span>{" "}
        <CalendarDays className="h-5 w-5 text-white/60" />{" "}
      </button>{" "}
      {/* Calendar */}{" "}
      {open && (
        <div className=" absolute left-0 z-50 mt-2 w-full max-w-70 rounded-2xl border border-white/20 bg-[#20283d]/95 p-3 shadow-2xl backdrop-blur-xl sm:w-70 ">
          {" "}
          {/* Header */}{" "}
          <div className=" mb-4 flex items-center justify-between ">
            {" "}
            <button
              type="button"
              onClick={previousMonth}
              className=" rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-white "
            >
              {" "}
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />{" "}
            </button>{" "}
            <p className=" text-sm font-black text-white ">
              {" "}
              {MONTHS[currentMonth]} {currentYear}{" "}
            </p>{" "}
            <div className="flex items-center gap-1">
              {" "}
              <button
                type="button"
                onClick={nextMonth}
                className=" rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-white "
              >
                {" "}
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />{" "}
              </button>{" "}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className=" rounded-xl p-2 text-white/70 transition hover:bg-red-500/20 hover:text-red-300 "
              >
                {" "}
                <X className="h-5 w-5 cursor-pointer" />{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          {/* Day Name */}{" "}
          <div className=" grid grid-cols-7 gap-1.5 mb-2 ">
            {" "}
            {DAYS.map((day) => (
              <span
                key={day}
                className=" text-center text-xs font-black text-white/50 "
              >
                {" "}
                {day}{" "}
              </span>
            ))}{" "}
          </div>{" "}
          {/* Date */}{" "}
          <div className=" grid grid-cols-7 gap-2 ">
            {" "}
            {Array.from({ length: firstDay }).map((_, index) => (
              <span key={`empty-${index}`} />
            ))}{" "}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dateValue = formatInputDate(
                new Date(currentYear, currentMonth, day),
              );
              const active = dateValue === value;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDate(day)}
                  className={` h-8 rounded-lg text-xs font-bold sm:h-9 sm:rounded-xl sm:text-sm transition ${active ? ` bg-linear-to-r from-red-600 to-blue-600 text-white shadow-lg ` : ` text-white/80 hover:bg-white/10 hover:text-white `} `}
                >
                  {" "}
                  {day}{" "}
                </button>
              );
            })}{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}
