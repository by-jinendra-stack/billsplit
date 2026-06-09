"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_ITEMS,
  DEFAULT_SETTINGS,
  DEMO_PARTICIPANTS,
} from "./constants";
import type { BillItem, BillSettings, Participant } from "./types";
import { calculateParticipantTotals } from "./utils";

type BillContextValue = {
  items: BillItem[];
  settings: BillSettings;
  participants: Participant[];
  currentParticipantId: string | null;
  participantName: string;
  setItems: (items: BillItem[]) => void;
  updateItem: (id: string, field: "name" | "price", value: string) => void;
  addItem: () => void;
  deleteItem: (id: string) => void;
  updateSettings: (updates: Partial<BillSettings>) => void;
  joinParticipant: (name: string) => string;
  saveParticipantSelection: (
    participantId: string,
    selectedItemIds: string[],
    itemsTotal: number,
  ) => void;
  setParticipantName: (name: string) => void;
  resetExtractedItems: () => void;
  resetBill: () => void;
};

const BillContext = createContext<BillContextValue | null>(null);

function createBlankItem(): BillItem {
  return { id: crypto.randomUUID(), name: "", price: 0 };
}

function cloneDemoParticipants(): Participant[] {
  return DEMO_PARTICIPANTS.map((participant) => ({ ...participant }));
}

export function BillProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BillItem[]>(DEFAULT_ITEMS);
  const [settings, setSettings] = useState<BillSettings>(DEFAULT_SETTINGS);
  const [participants, setParticipants] = useState<Participant[]>(
    cloneDemoParticipants,
  );
  const [currentParticipantId, setCurrentParticipantId] = useState<
    string | null
  >(null);
  const [participantName, setParticipantName] = useState("");

  const updateItem = useCallback(
    (id: string, field: "name" | "price", value: string) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          if (field === "name") return { ...item, name: value };
          const price = Number.parseFloat(value);
          return { ...item, price: Number.isNaN(price) ? 0 : price };
        }),
      );
    },
    [],
  );

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, createBlankItem()]);
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateSettings = useCallback((updates: Partial<BillSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const joinParticipant = useCallback((name: string) => {
    const trimmed = name.trim();
    let participantId = "";

    setParticipants((prev) => {
      const existing = prev.find(
        (participant) =>
          participant.name.toLowerCase() === trimmed.toLowerCase(),
      );

      if (existing) {
        participantId = existing.id;
        return prev;
      }

      participantId = crypto.randomUUID();
      return [
        ...prev,
        {
          id: participantId,
          name: trimmed,
          selectedItemIds: [],
          itemsTotal: 0,
          taxShare: 0,
          serviceChargeShare: 0,
          grandTotal: 0,
          hasCompletedSelection: false,
        },
      ];
    });

    setCurrentParticipantId(participantId);
    setParticipantName(trimmed);
    return participantId;
  }, []);

  const saveParticipantSelection = useCallback(
    (participantId: string, selectedItemIds: string[], itemsTotal: number) => {
      const totals = calculateParticipantTotals(itemsTotal, settings);

      setParticipants((prev) =>
        prev.map((participant) =>
          participant.id === participantId
            ? {
                ...participant,
                selectedItemIds,
                ...totals,
                hasCompletedSelection: true,
              }
            : participant,
        ),
      );
    },
    [settings],
  );

  const resetExtractedItems = useCallback(() => {
    setItems(DEFAULT_ITEMS.map((item) => ({ ...item })));
  }, []);

  const resetBill = useCallback(() => {
    setItems(DEFAULT_ITEMS.map((item) => ({ ...item })));
    setSettings({ ...DEFAULT_SETTINGS });
    setParticipants(cloneDemoParticipants());
    setCurrentParticipantId(null);
    setParticipantName("");
  }, []);

  const value = useMemo(
    () => ({
      items,
      settings,
      participants,
      currentParticipantId,
      participantName,
      setItems,
      updateItem,
      addItem,
      deleteItem,
      updateSettings,
      joinParticipant,
      saveParticipantSelection,
      setParticipantName,
      resetExtractedItems,
      resetBill,
    }),
    [
      items,
      settings,
      participants,
      currentParticipantId,
      participantName,
      updateItem,
      addItem,
      deleteItem,
      updateSettings,
      joinParticipant,
      saveParticipantSelection,
      resetExtractedItems,
      resetBill,
    ],
  );

  return (
    <BillContext.Provider value={value}>{children}</BillContext.Provider>
  );
}

export function useBill() {
  const context = useContext(BillContext);
  if (!context) {
    throw new Error("useBill must be used within a BillProvider");
  }
  return context;
}
