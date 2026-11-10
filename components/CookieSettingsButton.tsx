"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="min-h-11 cursor-pointer text-left text-base font-medium underline-offset-4 hover:underline"
    >
      Cookie settings
    </button>
  );
}
