import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-line bg-surface p-5 shadow-[var(--shadow)] backdrop-blur",
        className,
      )}
    >
      {children}
    </section>
  );
}
