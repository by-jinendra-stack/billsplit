import type { FlowStep } from "@/lib/types";
import { ProgressIndicator } from "./ProgressIndicator";
import { Card } from "./ui/Card";

type PageLayoutProps = {
  step: FlowStep;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function PageLayout({ step, title, subtitle, children }: PageLayoutProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center bg-zinc-50 px-4 py-8 font-sans dark:bg-zinc-950 sm:px-6 sm:py-10">
      <main className="w-full max-w-md">
        <ProgressIndicator currentStep={step} />
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        <div className="mt-8 space-y-4">{children}</div>
      </main>
    </div>
  );
}

export function PageCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Card className={className}>{children}</Card>;
}
