import type { FlowStep } from "@/lib/types";

const STEPS: { id: FlowStep; label: string }[] = [
  { id: "upload", label: "Upload Bill" },
  { id: "review", label: "Review Items" },
  { id: "settings", label: "Bill Settings" },
  { id: "share", label: "Share Bill" },
  { id: "join", label: "Join Bill" },
  { id: "select", label: "Select Items" },
  { id: "results", label: "Results" },
];

type ProgressIndicatorProps = {
  currentStep: FlowStep;
};

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const currentIndex = STEPS.findIndex((step) => step.id === currentStep);

  return (
    <nav aria-label="Progress" className="mb-8 overflow-x-auto pb-1">
      <ol className="flex min-w-max gap-1">
        {STEPS.map((step, index) => {
          const isCurrent = step.id === currentStep;
          const isComplete = index < currentIndex;

          return (
            <li key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${
                  isCurrent
                    ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                    : isComplete
                      ? "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      : "bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                    isCurrent
                      ? "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                      : isComplete
                        ? "bg-zinc-700 text-white dark:bg-zinc-300 dark:text-zinc-900"
                        : "bg-zinc-300 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">
                  {step.label.split(" ")[0]}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <span
                  className={`mx-0.5 h-px w-3 ${
                    index < currentIndex
                      ? "bg-zinc-400 dark:bg-zinc-600"
                      : "bg-zinc-200 dark:bg-zinc-800"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
