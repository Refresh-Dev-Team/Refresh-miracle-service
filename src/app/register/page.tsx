"use client";

import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import styles from "./register.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const base = process.env.NEXT_PUBLIC_API_BASE || "";
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [howDidYouHear, setHowDidYouHear] = useState("");

  function normalizePhone(raw: string): { normalized?: string; error?: string } {
    if (!raw) {
      return { error: "Please enter your phone number." };
    }
    const value = raw.startsWith("+") ? raw : `+${raw}`;
    const phone = parsePhoneNumberFromString(value);
    if (!phone || !phone.isValid()) {
      return { error: "Enter a valid international phone number." };
    }
    return { normalized: phone.number };
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setNotice(null);

    try {
      const { normalized, error } = normalizePhone(phoneNumber);
      if (error) {
        setPhoneError(error);
        throw new Error(error);
      }
      const payload = {
        name,
        phone_number: normalized,
        location: location || null,
        how_did_you_hear_about_refresh: howDidYouHear || null,
      };

      const url = base ? `${base}/api/register` : "/api/register";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let message = "Registration failed. Please try again.";
        try {
          const body = (await res.json()) as { detail?: string; message?: string };
          message = body.detail || body.message || message;
        } catch {
          // Ignore JSON parsing errors and keep default message.
        }
        throw new Error(message);
      }

      const data = (await res.json()) as { ok: boolean; message: string };
      setName("");
      setPhoneNumber("");
      setLocation("");
      setHowDidYouHear("");
      setNotice({
        type: "success",
        text: `${data.message} Redirecting...`,
      });
      setTimeout(() => router.push("/"), 1200);
    } catch (err) {
      setNotice({
        type: "error",
        text: err instanceof Error ? err.message : "Registration failed",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={styles.page}>
      {notice && (
        <div
          role="alert"
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            minWidth: "min(560px, calc(100vw - 24px))",
            maxWidth: "calc(100vw - 24px)",
            borderRadius: 12,
            padding: "12px 14px",
            fontSize: 14,
            fontWeight: 700,
            color: notice.type === "success" ? "#0f5132" : "#842029",
            background: notice.type === "success" ? "#d1e7dd" : "#f8d7da",
            border: notice.type === "success" ? "1px solid #badbcc" : "1px solid #f5c2c7",
            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.14)",
          }}
        >
          {notice.text}
        </div>
      )}
      <div className={styles.wrap}>
        <Link href="/" className={styles.backLink}>
          <span aria-hidden="true">←</span>
          <span>Back to Home</span>
        </Link>

        <header className={styles.hero}>
          <h1 className={styles.title}>Refresh Registration</h1>
          <p className={styles.subtitle}>
            Fill in your details to register for service. This helps us welcome you properly and plan
            each gathering smoothly.
          </p>
        </header>

        <section className={styles.card}>
          <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>Full name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jane Doe"
                className={styles.control}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Phone number</span>
              <span style={{ fontSize: 12, color: "#475467", marginTop: 6 }}>
                Select your country first, then enter your number.
              </span>
              <PhoneInput
                country="ng"
                value={phoneNumber}
                onChange={(value) => {
                  setPhoneNumber(value);
                  const { error } = normalizePhone(value);
                  setPhoneError(error ?? null);
                }}
                countryCodeEditable={false}
                enableSearch
                inputProps={{ required: true, name: "phone" }}
                placeholder="Select country, then type number"
                containerClass={styles.phoneContainer}
                inputClass={styles.phoneInput}
                buttonClass={styles.phoneButton}
                dropdownClass={styles.phoneDropdown}
              />
              {phoneError && (
                <span style={{ color: "#b42318", fontSize: 12, marginTop: 6 }}>
                  {phoneError}
                </span>
              )}
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Location</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Benin"
                className={styles.control}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>How did you hear about Refresh?</span>
              <input
                value={howDidYouHear}
                onChange={(e) => setHowDidYouHear(e.target.value)}
                placeholder="e.g. Friend, social media, flyer"
                className={styles.control}
              />
            </label>

            <button type="submit" disabled={busy} className={styles.submitButton}>
              {busy ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
