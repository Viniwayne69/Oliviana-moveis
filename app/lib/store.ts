"use client";

import { demoLeads, properties, siteSettings } from "./demo-data";
import type { Lead, Property, SiteSettings } from "./types";

const propertyKey = "oliviana.properties";
const leadKey = "oliviana.leads";
const settingsKey = "oliviana.settings";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const value = window.localStorage.getItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function loadProperties(): Property[] {
  return read(propertyKey, properties);
}

export function saveProperties(value: Property[]) {
  write(propertyKey, value);
}

export function loadLeads(): Lead[] {
  return read(leadKey, demoLeads);
}

export function saveLead(value: Omit<Lead, "id" | "createdAt" | "status">) {
  const leads = loadLeads();
  const next: Lead = {
    ...value,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "novo",
  };
  write(leadKey, [next, ...leads]);
  return next;
}

export function loadSettings(): SiteSettings {
  return read(settingsKey, siteSettings);
}

export function saveSettings(value: SiteSettings) {
  write(settingsKey, value);
}
