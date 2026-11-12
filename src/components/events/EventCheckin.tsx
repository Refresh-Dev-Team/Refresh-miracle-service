"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import styles from "./eventCheckin.module.css";

type Tab = "checkin" | "registration";

type EventInfo = {
  name: string;
  slug: string;
  description?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

type ChatMessage = {
  id: number;
  from: "bot" | "user";
  text: string;
  code?: string | null;
  sessionName?: string | null;
  action?: "register";
};

export type EventCheckinProps = {
  /** Event slug used by the API, e.g. "irg-2026" */
  slug: string;
  /** Name shown while the event loads, or if the API is unreachable */
  fallbackName: string;
  /** Short name used in the assistant greeting, e.g. "IRG 2026" */
  shortName?: string;
  /** Where the back link points */
  backHref?: string;
  backLabel?: string;
};

const HEARD_OPTIONS = [
  "Friend or Family",
  "Invited by Someone",
  "Social Media (Instagram, Facebook, X, TikTok)",
  "WhatsApp",
  "YouTube",
  "Church Website",
  "Google Search",
  "Flyer or Poster",
  "Church Announcement / Service",
  "Previous Refresh Program",
  "Other",
];

/** Same-origin call; src/app/api/events/[...path]/route.ts proxies it to BACKEND_URL (like /api/register). */
function apiUrl(path: string): string {
  return path;
}

/**
 * Normalise to E.164 so registration and check-in always store/look up the same value.
 * Local Nigerian numbers (0801...) are assumed when no country code is given.
 */
export function normalizePhone(raw: string): { phone?: string; error?: string } {
  const value = (raw || "").trim();
  if (!value) return { error: "Please enter your phone number." };
  const cleaned = value.startsWith("00") ? `+${value.slice(2)}` : value;
  const parsed = parsePhoneNumberFromString(cleaned, "NG");
  if (!parsed || !parsed.isValid()) {
    return {
      error: "That doesn't look like a valid phone number. Use e.g. 08012345678, or +44... for international numbers.",
    };
  }
  return { phone: parsed.number };
}

function formatRange(start?: string | null, end?: string | null): string | null {
  if (!start) return null;
  const opts: Intl.DateTimeFormatOptions = { timeZone: "Africa/Lagos", weekday: "short", day: "numeric", month: "short" };
  const s = new Date(start);
  const e = end ? new Date(end) : null;
  const fmt = new Intl.DateTimeFormat("en-GB", opts);
  const year = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", year: "numeric" }).format(e ?? s);
  return e ? `${fmt.format(s)} – ${fmt.format(e)}, ${year}` : `${fmt.format(s)}, ${year}`;
}

async function readJson(res: Response): Promise<Record<string, unknown>> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default function EventCheckin({
  slug,
  fallbackName,
  shortName,
  backHref = "/",
  backLabel = "Back to Home",
}: EventCheckinProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialTab: Tab = searchParams.get("tab") === "registration" ? "registration" : "checkin";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [event, setEvent] = useState<EventInfo | null>(null);
  const [eventError, setEventError] = useState<string | null>(null);

  const displayName = event?.name || fallbackName;
  const greetingName = shortName || displayName;

  // ---------- Event details ----------
  useEffect(() => {
    let cancelled = false;
    fetch(apiUrl(`/api/events/${encodeURIComponent(slug)}`))
      .then(async (res) => {
        const body = await readJson(res);
        if (cancelled) return;
        if (res.ok && body.event) {
          setEvent(body.event as EventInfo);
        } else {
          setEventError((body.detail as string) || "This event is not open yet.");
        }
      })
      .catch(() => !cancelled && setEventError("We couldn't reach the server. Please check your connection."));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const switchTab = useCallback(
    (next: Tab) => {
      setTab(next);
      const params = new URLSearchParams(searchParams.toString());
      if (next === "registration") params.set("tab", "registration");
      else params.delete("tab");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  // ---------- Check-in assistant ----------
  const idRef = useRef(1);
  const greeting = useCallback(
    (): ChatMessage => ({
      id: idRef.current++,
      from: "bot",
      text: `Hi! 👋 I'm here to help you check in for ${greetingName}.\n\nPlease type your registered phone number to get started (e.g. 08012345678).`,
    }),
    [greetingName],
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages((prev) => (prev.length ? prev : [greeting()]));
  }, [greeting]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const push = (msg: Omit<ChatMessage, "id">) =>
    setMessages((prev) => [...prev, { ...msg, id: idRef.current++ }]);

  const [regPhonePrefill, setRegPhonePrefill] = useState("");

  async function sendCheckin(e?: FormEvent) {
    e?.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    setDraft("");
    push({ from: "user", text });

    const lower = text.toLowerCase();
    if (["hi", "hello", "hey", "good morning", "good evening", "good afternoon"].includes(lower)) {
      push({ from: "bot", text: "Hello! 😊 Please type your registered phone number to check in (e.g. 08012345678)." });
      return;
    }

    const { phone, error } = normalizePhone(text);
    if (!phone) {
      push({ from: "bot", text: error || "Please send a valid phone number." });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(apiUrl(`/api/events/${encodeURIComponent(slug)}/checkin`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phone }),
      });
      const body = await readJson(res);

      if (res.ok) {
        push({
          from: "bot",
          text: (body.message as string) || "✅ You're checked in!",
          code: (body.session_code as string) || null,
          sessionName: (body.session_name as string) || null,
        });
      } else if (res.status === 404 && body.error === "not_registered") {
        setRegPhonePrefill(text);
        push({
          from: "bot",
          text: `👋 We couldn't find a registration for ${text} for ${displayName}. Registration is free and takes a minute.`,
          action: "register",
        });
      } else if (res.status === 429) {
        push({ from: "bot", text: "Lots of people are checking in right now. Please wait a few seconds and try again." });
      } else {
        push({ from: "bot", text: (body.detail as string) || "Check-in failed. Please try again shortly." });
      }
    } catch {
      push({ from: "bot", text: "We couldn't reach the server. Please check your connection and try again." });
    } finally {
      setSending(false);
    }
  }

  function endSession() {
    idRef.current = 1;
    setMessages([greeting()]);
    setDraft("");
  }

  // ---------- Registration ----------
  const [fullName, setFullName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [heard, setHeard] = useState("");
  const [stateCountry, setStateCountry] = useState("");
  const [regBusy, setRegBusy] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [regResult, setRegResult] = useState<{
    message: string;
    code?: string | null;
    sessionName?: string | null;
    alreadyRegistered?: boolean;
  } | null>(null);

  useEffect(() => {
    if (regPhonePrefill) setRegPhone(regPhonePrefill);
  }, [regPhonePrefill]);

  async function submitRegistration(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (regBusy) return;
    setRegError(null);

    if (!fullName.trim()) {
      setRegError("Please enter your full name.");
      return;
    }
    const { phone, error } = normalizePhone(regPhone);
    if (!phone) {
      setRegError(error || "Please enter a valid phone number.");
      return;
    }

    setRegBusy(true);
    try {
      const res = await fetch(apiUrl(`/api/events/${encodeURIComponent(slug)}/register`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName.trim(),
          phone_number: phone,
          heard_about_us: heard || null,
          state_country: stateCountry.trim() || null,
        }),
      });
      const body = await readJson(res);

      if (res.ok) {
        setRegResult({
          message: (body.message as string) || `🎉 You're registered for ${displayName}!`,
          code: (body.session_code as string) || null,
          sessionName: (body.session_name as string) || null,
        });
        setFullName("");
        setRegPhone("");
        setHeard("");
        setStateCountry("");
      } else if (res.status === 409) {
        setRegResult({
          message: `You're already registered for ${displayName}. Head to the Check-in tab and enter your phone number to mark your attendance.`,
          alreadyRegistered: true,
        });
      } else if (res.status === 429) {
        setRegError("Lots of people are registering right now. Please wait a few seconds and try again.");
      } else {
        setRegError((body.detail as string) || "Registration failed. Please try again.");
      }
    } catch {
      setRegError("We couldn't reach the server. Please check your connection and try again.");
    } finally {
      setRegBusy(false);
    }
  }

  const dateRange = formatRange(event?.startDate, event?.endDate);

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <Link href={backHref} className={styles.backLink}>
          <span aria-hidden="true">←</span> {backLabel}
        </Link>

        <p className={styles.eyebrow}>{displayName}</p>
        <h1 className={styles.title}>Check-in &amp; Registration</h1>
        <p className={styles.subtitle}>
          Already registered? Use the <strong>Check-in</strong> tab to mark your attendance. Joining us for{" "}
          {greetingName}? Use the <strong>Registration</strong> tab to save your seat.
        </p>

        {(dateRange || event?.location) && (
          <div className={styles.meta}>
            {dateRange && <span className={styles.chip}>🗓 {dateRange}</span>}
            {event?.location && <span className={styles.chip}>📍 {event.location}</span>}
          </div>
        )}
        {eventError && <div className={styles.warning}>{eventError}</div>}

        <div className={styles.tabs} role="tablist" aria-label="Check-in or registration">
          <button
            role="tab"
            aria-selected={tab === "checkin"}
            className={`${styles.tab} ${tab === "checkin" ? styles.tabActive : ""}`}
            onClick={() => switchTab("checkin")}
          >
            Check-in
          </button>
          <button
            role="tab"
            aria-selected={tab === "registration"}
            className={`${styles.tab} ${tab === "registration" ? styles.tabActive : ""}`}
            onClick={() => switchTab("registration")}
          >
            Registration
          </button>
        </div>

        {tab === "checkin" ? (
          <section className={styles.card} aria-label="Check-in assistant">
            <header className={styles.chatHeader}>
              <span className={styles.chatTitle}>{greetingName} Check-in Assistant</span>
              <button type="button" className={styles.ghostButton} onClick={endSession}>
                End session
              </button>
            </header>

            <div className={styles.chatBody} ref={scrollRef} aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={m.from === "bot" ? styles.botRow : styles.userRow}>
                  <div className={m.from === "bot" ? styles.botBubble : styles.userBubble}>
                    <span className={styles.bubbleText}>{m.text}</span>
                    {m.code && (
                      <div className={styles.pass}>
                        <span className={styles.passLabel}>{m.sessionName || "Check-in code"}</span>
                        <span className={styles.passCode}>{m.code}</span>
                      </div>
                    )}
                    {m.action === "register" && (
                      <button type="button" className={styles.inlineButton} onClick={() => switchTab("registration")}>
                        Register now →
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {sending && (
                <div className={styles.botRow}>
                  <div className={`${styles.botBubble} ${styles.typing}`}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            <form className={styles.chatInputRow} onSubmit={sendCheckin}>
              <input
                className={styles.input}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type your phone number…"
                inputMode="tel"
                autoComplete="tel"
                aria-label="Message"
              />
              <button type="submit" className={styles.sendButton} disabled={sending || !draft.trim()}>
                Send
              </button>
            </form>
          </section>
        ) : (
          <section className={`${styles.card} ${styles.formCard}`} aria-label="Registration">
            <h2 className={styles.formTitle}>Save your seat</h2>
            <p className={styles.formSubtitle}>Registration is free and only takes a minute.</p>

            {regResult ? (
              <div className={regResult.alreadyRegistered ? styles.infoBox : styles.successBox}>
                <p className={styles.bubbleText}>{regResult.message}</p>
                {regResult.code && (
                  <div className={styles.pass}>
                    <span className={styles.passLabel}>{regResult.sessionName || "Check-in code"}</span>
                    <span className={styles.passCode}>{regResult.code}</span>
                  </div>
                )}
                <div className={styles.resultActions}>
                  {regResult.alreadyRegistered ? (
                    <button type="button" className={styles.primaryButton} onClick={() => switchTab("checkin")}>
                      Go to Check-in
                    </button>
                  ) : (
                    <button type="button" className={styles.secondaryButton} onClick={() => setRegResult(null)}>
                      Register someone else
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={submitRegistration} noValidate>
                <label className={styles.field}>
                  <span className={styles.label}>Full name</span>
                  <input
                    className={styles.input}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Phone number</span>
                  <input
                    className={styles.input}
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="e.g. 0801 234 5678 or +44 7700 900123"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>How did you hear about us</span>
                  <select className={styles.input} value={heard} onChange={(e) => setHeard(e.target.value)}>
                    <option value="">Select how you heard about us</option>
                    {HEARD_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Country and state</span>
                  <input
                    className={styles.input}
                    value={stateCountry}
                    onChange={(e) => setStateCountry(e.target.value)}
                    placeholder="e.g. Edo, Nigeria"
                    autoComplete="country-name"
                  />
                </label>

                {regError && (
                  <p className={styles.error} role="alert">
                    {regError}
                  </p>
                )}

                <button type="submit" className={styles.primaryButton} disabled={regBusy}>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                  {regBusy ? "Submitting…" : "Submit"}
                </button>
              </form>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
