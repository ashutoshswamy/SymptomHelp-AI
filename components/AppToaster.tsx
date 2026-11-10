"use client";

import { Toaster } from "sileo";

// One toaster for the whole site. Use `sileo.success/error/warning/info(...)` from any client component.
export function AppToaster() {
  return <Toaster position="top-center" theme="system" offset={{ top: 48 }} />;
}
