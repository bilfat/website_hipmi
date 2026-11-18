"use client";

import { useEffect, useState } from "react";
import {
  MockStoreData,
  User,
  Project,
  ProjectTask,
  CorrespondenceRequest,
  FundRequest,
  FinanceTransaction,
  TicketReservation,
  IssuedTicket,
  MedpartSubmission,
  FeedbackItem,
  AppNotification,
  ActivityHistory,
  AuditEvent,
  LPJItem,
  CadreBusiness,
  CompanyPartner,
  ArticleItem,
  AchievementItem
} from "@/types/domain";
import { createInitialStoreData } from "./seed";

export const STORE_STORAGE_KEY = "hipmi-central-demo:v1.1:mock-store";
export const STORE_UPDATE_EVENT = "hipmi-central-store-update";

// In-memory cache for SSR & rapid client reads
let memoryStore: MockStoreData | null = null;

export function getStore(): MockStoreData {
  if (typeof window === "undefined") {
    if (!memoryStore) {
      memoryStore = createInitialStoreData();
    }
    return memoryStore;
  }

  try {
    const raw = localStorage.getItem(STORE_STORAGE_KEY);
    if (!raw) {
      const initial = createInitialStoreData();
      saveStore(initial);
      memoryStore = initial;
      return initial;
    }
    const parsed = JSON.parse(raw) as MockStoreData;
    // Schema version check
    if (parsed.schema_version !== "1.1") {
      const initial = createInitialStoreData();
      saveStore(initial);
      memoryStore = initial;
      return initial;
    }
    memoryStore = parsed;
    return parsed;
  } catch (err) {
    console.error("Failed to read store from LocalStorage, falling back to seed:", err);
    const fallback = createInitialStoreData();
    saveStore(fallback);
    memoryStore = fallback;
    return fallback;
  }
}

export function saveStore(data: MockStoreData): void {
  memoryStore = data;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORE_STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent(STORE_UPDATE_EVENT, { detail: data }));
    } catch (err) {
      console.error("Failed to save store to LocalStorage:", err);
    }
  }
}

export function resetToSeed(): MockStoreData {
  const fresh = createInitialStoreData();
  saveStore(fresh);
  return fresh;
}

export function getCurrentUser(): User {
  const store = getStore();
  const current = store.users.find((u) => u.id === store.current_user_id);
  return current || store.users[0];
}

export function setCurrentUserId(userId: string): void {
  const store = getStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) return;
  store.current_user_id = userId;
  addActivityHistory(
    user.name,
    "beralih akun demo",
    `${user.demo_id} (${user.base_role})`,
    "Sistem Demo"
  );
  saveStore(store);
}

// ----------------------------------------------------------------------------
// Activity & Audit Log Helpers
// ----------------------------------------------------------------------------
export function addActivityHistory(
  actor_name: string,
  action: string,
  target: string,
  module: string
): void {
  const store = getStore();
  const newActivity: ActivityHistory = {
    id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    actor_name,
    action,
    target,
    module,
    timestamp: new Date().toISOString()
  };
  store.activity_history.unshift(newActivity);
  // Keep last 100 activities
  if (store.activity_history.length > 100) {
    store.activity_history.pop();
  }
}

export function addAuditEvent(
  actor_id: string,
  actor_name: string,
  action: string,
  resource_type: string,
  resource_id: string,
  before_state?: string,
  after_state?: string
): void {
  const store = getStore();
  const newAudit: AuditEvent = {
    id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    actor_id,
    actor_name,
    action,
    resource_type,
    resource_id,
    before_state,
    after_state,
    timestamp: new Date().toISOString()
  };
  store.audit_events.unshift(newAudit);
  if (store.audit_events.length > 100) {
    store.audit_events.pop();
  }
}

// ----------------------------------------------------------------------------
// Domain Mutations with Cross-Module Sync
// ----------------------------------------------------------------------------

export function updateStore(partial: Partial<MockStoreData>): void {
  const current = getStore();
  const next = { ...current, ...partial };
  saveStore(next);
}

export function mutateStore<T>(
  mutator: (draft: MockStoreData) => T
): T {
  const store = getStore();
  const result = mutator(store);
  saveStore(store);
  return result;
}

// Stable seed snapshot used for consistent SSR and initial client hydration pass
let initialSeedSnapshot: MockStoreData | null = null;
export function getInitialSeedSnapshot(): MockStoreData {
  if (!initialSeedSnapshot) {
    initialSeedSnapshot = createInitialStoreData();
  }
  return initialSeedSnapshot;
}

// ----------------------------------------------------------------------------
// React Hook for Reactive Store Consumption
// ----------------------------------------------------------------------------
export function useMockStore() {
  // Always initialize with server-consistent snapshot to ensure identical initial hydration pass
  const [store, setStoreState] = useState<MockStoreData>(() => {
    if (typeof window === "undefined") {
      return getStore();
    }
    return getInitialSeedSnapshot();
  });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    // Once client mounts, immediately sync with localStorage
    setStoreState(getStore());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<MockStoreData>;
      if (customEvent.detail) {
        setStoreState(customEvent.detail);
      } else {
        setStoreState(getStore());
      }
    };

    window.addEventListener(STORE_UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(STORE_UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const currentUser = store.users.find((u) => u.id === store.current_user_id) || store.users[0];

  return {
    store,
    currentUser,
    isHydrated,
    setCurrentUserId,
    resetToSeed,
    saveStore,
    updateStore
  };
}
