# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS v4, next/font. Existing project; keep.

## Users

Primary: a worried person at home, mostly on a phone, often late or anxious, typing symptoms in their own words and wanting a calm, clear read of what it might be and when to see a doctor. India-based (en_IN locale, symptomhelpai.in). Secondary: caregivers checking for a child or relative; the curious public.

## Purpose

Free symptom checker. User describes symptoms in free text plus optional age and sex. Google Gemini returns ranked possible conditions (confidence %, severity low/moderate/high/critical, urgency routine/soon/urgent/emergency, description, matching symptoms, recommended actions), general wellness advice, and a disclaimer.

## Product truths to preserve

- Routes: `/` landing, `/check` (intake, loading, results), `/history`, `/account`, auth (`/signin`, `/signup`, `/forgot-password`, `/onboarding`), info (`/about`, `/faq`, `/contact`), legal (`/terms`, `/privacy`, `/cookies`, `/disclaimer`). API at `/api/analyze`.
- Users must be 18+ and accept Terms and Privacy before use (three checkboxes: 18+, Terms, Privacy; self-declared, enforced in the UI and in `/api/analyze`). Cookie notice with Accept all / Essential only.
- Not medical advice; disclaimer must stay prominent. Does not diagnose.
- Sign-in required (Firebase Auth: Google + email/password). Analyses, age and sex are saved to the signed-in user's own Firestore history/profile only. The old "nothing stored" claim is retired.
- Claims on the site: saved only to the user, results in seconds, powered by Google Gemini.
- Author credit and links (Ashutosh Swamy: portfolio, GitHub, LinkedIn) in footer.
- Brand name: SymptomHelp AI. SEO metadata, JSON-LD, routes, form field names unchanged.

## Brand commitments / constraints

- Fonts pinned by the user: Bricolage Grotesque and DM Sans only. No other typefaces.
- Replace the existing visual world (paper-grid ground, mono "chart" labels, rubber-stamp badges, "Patient Intake" framing) entirely.
- Must NOT feel gamified or cutesy, and must NOT feel cold hospital/clinical.
- Severity colors must remain unambiguous and accessible; avoid alarmist, red-heavy treatment.
- Mobile-first; WCAG AA contrast; honor prefers-reduced-motion.

## Open decisions

- Build path (comp-first vs code-first): image generation not available in this session, so code-first.
