import { PageCard, PageLayout } from "@/components/PageLayout";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";

type JoinPageProps = {
  params: Promise<{ shareCode: string }>;
};

type Bill = {
  id: string;
  share_code: string;
  participant_count: number;
  tax_amount: number;
  service_charge: number;
  apply_tax: boolean;
  apply_service_charge: boolean;
};

export default async function JoinPage({ params }: JoinPageProps) {
  const { shareCode } = await params;

  const { data: bill } = await supabase
    .from("bills")
    .select("*")
    .eq("share_code", shareCode)
    .maybeSingle<Bill>();

  if (!bill) {
    return (
      <PageLayout step="join" title="Bill Not Found" subtitle="Invalid share code">
        <PageCard>
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Check the link and try again.
          </p>
        </PageCard>
      </PageLayout>
    );
  }

  return (
    <PageLayout step="join" title="Bill Found" subtitle={`Share code ${bill.share_code}`}>
      <PageCard className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Share Code</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {bill.share_code}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            Participant Count
          </span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {bill.participant_count}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Tax Amount</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {formatCurrency(bill.tax_amount)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            Service Charge
          </span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {formatCurrency(bill.service_charge)}
          </span>
        </div>
      </PageCard>
    </PageLayout>
  );
}
