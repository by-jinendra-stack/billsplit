"use client";

import { PageCard, PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useBill } from "@/lib/bill-context";
import {
  formatCurrency,
  getServiceChargePerPerson,
  getTaxPerPerson,
} from "@/lib/utils";
import { useRouter } from "next/navigation";

function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={min}
        value={value || ""}
        onChange={(e) => {
          const next = Number.parseInt(e.target.value, 10);
          onChange(Number.isNaN(next) ? 0 : next);
        }}
        className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      />
    </div>
  );
}

function ToggleField({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/50"
    >
      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {label}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-zinc-300 accent-zinc-900 dark:border-zinc-600 dark:accent-zinc-50"
      />
    </label>
  );
}

export default function BillSettingsPage() {
  const router = useRouter();
  const { settings, updateSettings } = useBill();

  const taxPerPerson = getTaxPerPerson(settings);
  const servicePerPerson = getServiceChargePerPerson(settings);

  return (
    <PageLayout
      step="settings"
      title="Bill Settings"
      subtitle="Configure how tax and service charge are split"
    >
      <PageCard className="space-y-5">
        <NumberField
          id="participants"
          label="Number of Participants"
          value={settings.numberOfParticipants}
          onChange={(value) =>
            updateSettings({ numberOfParticipants: Math.max(1, value) })
          }
          min={1}
        />
        <NumberField
          id="tax"
          label="Tax Amount"
          value={settings.taxAmount}
          onChange={(value) => updateSettings({ taxAmount: Math.max(0, value) })}
        />
        <NumberField
          id="service"
          label="Service Charge Amount"
          value={settings.serviceChargeAmount}
          onChange={(value) =>
            updateSettings({ serviceChargeAmount: Math.max(0, value) })
          }
        />

        <div className="space-y-3 border-t border-zinc-100 pt-5 dark:border-zinc-800">
          <ToggleField
            id="apply-tax"
            label="Apply Tax To Everyone"
            checked={settings.applyTaxToEveryone}
            onChange={(checked) =>
              updateSettings({ applyTaxToEveryone: checked })
            }
          />
          <ToggleField
            id="apply-service"
            label="Apply Service Charge To Everyone"
            checked={settings.applyServiceChargeToEveryone}
            onChange={(checked) =>
              updateSettings({ applyServiceChargeToEveryone: checked })
            }
          />
        </div>
      </PageCard>

      <Card className="space-y-2 bg-zinc-50 dark:bg-zinc-800/50">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Live Preview
        </p>
        {settings.applyTaxToEveryone && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">
              Tax Per Person
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatCurrency(taxPerPerson)}
            </span>
          </div>
        )}
        {settings.applyServiceChargeToEveryone && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">
              Service Charge Per Person
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatCurrency(servicePerPerson)}
            </span>
          </div>
        )}
        {!settings.applyTaxToEveryone &&
          !settings.applyServiceChargeToEveryone && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Enable tax or service charge to see per-person amounts.
            </p>
          )}
      </Card>

      <Button onClick={() => router.push("/share")}>Continue</Button>
    </PageLayout>
  );
}
