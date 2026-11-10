"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "firebase/auth";
import { CaretDown } from "@phosphor-icons/react";
import { sileo } from "sileo";
import { deleteAllHistory, deleteAllUserData, loadProfile, saveProfile } from "@/lib/store";
import { friendlyAuthError } from "./AuthForm";
import { useAuth } from "./AuthProvider";

export function AccountView() {
  const { user } = useAuth();
  const router = useRouter();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    let live = true;
    loadProfile(user.uid)
      .then((p) => {
        if (!live) return;
        if (p.age !== undefined) setAge(String(p.age));
        if (p.gender) setGender(p.gender);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [user]);

  if (!user) return null;
  const uid = user.uid;

  async function run(fn: () => Promise<string>) {
    setBusy(true);
    try {
      sileo.success({ title: await fn() });
    } catch (err) {
      sileo.error({ title: "Something went wrong", description: friendlyAuthError(err) });
    } finally {
      setBusy(false);
    }
  }

  const onSave = (e: FormEvent) => {
    e.preventDefault();
    return run(async () => {
      await saveProfile(uid, { age: age ? Number(age) : undefined, gender: gender || undefined });
      return "Profile saved.";
    });
  };

  const onClearHistory = () => {
    if (!window.confirm("Delete all saved analyses? This cannot be undone.")) return;
    return run(async () => {
      await deleteAllHistory(uid);
      return "Your history was deleted.";
    });
  };

  const onDeleteAccount = () => {
    if (!window.confirm("Delete your account and all saved data? This cannot be undone.")) return;
    return run(async () => {
      await deleteAllUserData(uid);
      await deleteUser(user!);
      router.replace("/");
      return "Account deleted.";
    });
  };

  return (
    <div className="mx-auto max-w-2xl pt-8 sm:pt-14">
      <h1 className="text-[clamp(3rem,9vw,5rem)] leading-[0.95]">Account</h1>
      <p className="mt-3 text-lg text-ink-soft">{user.displayName || user.email}</p>

      <form onSubmit={onSave} className="strip mt-8 p-5 sm:p-7">
        <h2 className="text-3xl">Profile</h2>
        <p className="mt-1 text-ink-soft">Used to prefill the symptom checker.</p>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="mb-2 block font-bold">Age</label>
            <input
              id="age"
              type="number"
              inputMode="numeric"
              min={0}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="field"
              disabled={busy}
            />
          </div>
          <div>
            <label htmlFor="gender" className="mb-2 block font-bold">Sex</label>
            <div className="relative">
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="field cursor-pointer appearance-none pr-10"
                disabled={busy}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <CaretDown size={18} weight="bold" aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#2a1233]" />
            </div>
          </div>
        </div>
        <div className="perforation mt-6 pt-5">
          <button type="submit" disabled={busy} className="tab w-full sm:w-auto">Save profile</button>
        </div>
      </form>


      <section className="mt-8 rounded-[28px] border-[3px] border-dotted border-ink/40 p-5 sm:p-7">
        <h2 className="text-3xl">Your data</h2>
        <p className="mt-2 max-w-[56ch] text-ink-soft">
          Delete your saved analyses, or remove your account and everything we hold about you.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onClearHistory} disabled={busy} className="tab tab-outline !text-xl">
            Delete history
          </button>
          <button type="button" onClick={onDeleteAccount} disabled={busy} className="tab tab-outline !text-xl">
            Delete account
          </button>
        </div>
      </section>
    </div>
  );
}
