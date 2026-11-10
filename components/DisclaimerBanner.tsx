export function DisclaimerBanner() {
  return (
    <div className="w-full bg-ink px-4 py-2 text-center text-ground">
      <p className="text-sm leading-snug">
        <strong className="font-bold">Not medical advice.</strong>{" "}
        <span className="hidden sm:inline">
          For information only. Always consult a licensed clinician.
        </span>
        <span className="sm:hidden">For information only.</span>
      </p>
    </div>
  );
}
