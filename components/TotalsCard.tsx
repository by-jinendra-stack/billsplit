import { formatCurrency } from "@/lib/utils";
import { Card } from "./ui/Card";

type TotalsCardProps = {
  participantName?: string;
  selectedTotal: number;
  taxShare: number;
  serviceChargeShare: number;
  showTax: boolean;
  showServiceCharge: boolean;
};

export function TotalsCard({
  participantName,
  selectedTotal,
  taxShare,
  serviceChargeShare,
  showTax,
  showServiceCharge,
}: TotalsCardProps) {
  const grandTotal = selectedTotal + taxShare + serviceChargeShare;

  return (
    <Card className="space-y-3">
      {participantName && (
        <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Participant Name
          </p>
          <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
            {participantName}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-600 dark:text-zinc-400">
          Selected Items Total
        </span>
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          {formatCurrency(selectedTotal)}
        </span>
      </div>
      {showTax && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Tax Share</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {formatCurrency(taxShare)}
          </span>
        </div>
      )}
      {showServiceCharge && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            Service Charge Share
          </span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {formatCurrency(serviceChargeShare)}
          </span>
        </div>
      )}
      <div className="rounded-xl bg-zinc-900 px-4 py-4 dark:bg-zinc-50">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white dark:text-zinc-900">
            Grand Total Owed
          </span>
          <span className="text-2xl font-bold text-white dark:text-zinc-900">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>
    </Card>
  );
}
