import type { ReactNode } from "react";

export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <article className="relative overflow-hidden sm:p-5">
      <h3 className="text-xl font-black tracking-wide text-white sm:text-[1.35rem]">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </article>
  );
}
