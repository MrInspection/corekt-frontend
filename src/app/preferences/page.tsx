import type { Metadata } from "next";
import { PreferencesView } from "@/features/preferences/views/preferences.view";

export const metadata: Metadata = {
  title: "Preferences - Corekt",
};

export default function PreferencesPage() {
  return <PreferencesView />;
}
