type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const baseButton =
    "min-w-[2.5rem] h-10 px-3 text-sm font-semibold rounded-xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 focus:outline-none";

  const activeClasses =
    "border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.14)_100%)] text-white shadow-[0_8px_20px_rgba(255,255,255,0.18)]";

  const inactiveClasses =
    "border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] text-white/75 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.12)_100%)] hover:text-white hover:border-white/30";

  const arrowClasses =
    "border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] text-white/75 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.12)_100%)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed";

  const focusRing =
    "focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:shadow-[0_0_15px_rgba(255,255,255,0.25)]";

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 flex-wrap py-4"
    >
      {/* Previous */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className={` cursor-pointer ${baseButton} ${arrowClasses} ${focusRing}`}
      >
        ‹
      </button>

      {/* Truncated page numbers with ellipsis */}
      {getPageNumbers().map((item, index) => {
        if (item === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center px-2 text-white/50 text-sm font-semibold select-none"
            >
              ...
            </span>
          );
        }

        const page = item as number;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            disabled={isActive}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={isActive ? "page" : undefined}
            className={` cursor-pointer ${baseButton} ${focusRing} ${
              isActive ? activeClasses : inactiveClasses
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className={` cursor-pointer ${baseButton} ${arrowClasses} ${focusRing}`}
      >
        ›
      </button>
    </nav>
  );
}
