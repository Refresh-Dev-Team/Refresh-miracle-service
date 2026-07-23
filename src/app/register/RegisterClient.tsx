"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import styles from "./register.module.css";

type Tab = "checkin" | "registration";

type Notice = {
  type: "success" | "error";
  text: string;
};

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const CHECKIN_WELCOME =
  "Hi! 👋 I'm here to help you check in for service.\n\nPlease type your phone number to get started (e.g. 08012345678).";

function makeMessage(role: ChatMessage["role"], text: string): ChatMessage {
  return {
    id: `${role}-${crypto.randomUUID()}`,
    role,
    text,
  };
}

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

function tabFromQuery(raw: string | null): Tab {
  return raw === "registration" ? "registration" : "checkin";
}

function renderMessageText(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (/^https?:\/\/[^\s]+$/.test(part)) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          className={styles.messageLink}
          target="_self"
          rel="noreferrer"
        >
          {part}
        </a>
      );
    }
    return part.split("\n").map((line, lineIndex) => (
      <p key={`${part}-${index}-${lineIndex}`}>{line || "\u00A0"}</p>
    ));
  });
}

export default function RegisterPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>(() => tabFromQuery(null));
  const [notice, setNotice] = useState<Notice | null>(null);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [howDidYouHear, setHowDidYouHear] = useState("");
  const [registrationBusy, setRegistrationBusy] = useState(false);

  const [chatSessionId, setChatSessionId] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    makeMessage("assistant", CHECKIN_WELCOME),
  ]);

  useEffect(() => {
    setChatSessionId(`refresh-${crypto.randomUUID()}`);
  }, []);

  useEffect(() => {
    setActiveTab(tabFromQuery(searchParams.get("tab")));
  }, [searchParams]);

  const tabCopy = useMemo(
    () => ({
      checkin: {
        title: "Refresh Assistant",
        subtitle: "Already a member? Use the Check-in tab to mark your attendance.",
      },
      registration: {
        title: "New Member Registration",
        subtitle: "New to our church? Use the Registration tab.",
      },
    }),
    [],
  );

  async function submitRegistration(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRegistrationBusy(true);
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

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let message = "Registration failed. Please try again.";
        try {
          const body = (await res.json()) as {
            detail?: string;
            message?: string;
            phone_number?: string | null;
          };
          if (res.status === 409) {
            message = body.phone_number
              ? `${body.detail || "This user is already registered."} Existing phone: ${body.phone_number}.`
              : (body.detail || "This user is already registered.");
          } else {
            message = body.detail || body.message || message;
          }
        } catch {
          // Keep fallback message.
        }
        throw new Error(message);
      }

      const data = (await res.json()) as { ok: boolean; message: string };
      setName("");
      setPhoneNumber("");
      setLocation("");
      setHowDidYouHear("");
      setPhoneError(null);
      setNotice({
        type: "success",
        text: data.message,
      });
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Registration failed.",
      });
    } finally {
      setRegistrationBusy(false);
    }
  }

  async function sendChatMessage(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    const trimmed = chatInput.trim();
    if (!trimmed || chatBusy || !chatSessionId) {
      return;
    }

    const userMessage = makeMessage("user", trimmed);
    setMessages((current) => [...current, userMessage]);
    setChatInput("");
    setChatBusy(true);
    setNotice(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: chatSessionId,
          message: trimmed,
        }),
      });

      if (!res.ok) {
        let message = "Check-in failed. Please try again.";
        try {
          const body = (await res.json()) as { detail?: string };
          message = body.detail || message;
        } catch {
          // Keep fallback message.
        }
        throw new Error(message);
      }

      const data = (await res.json()) as { reply: string };
      setMessages((current) => [...current, makeMessage("assistant", data.reply)]);
    } catch (error) {
      const text = error instanceof Error ? error.message : "Check-in failed. Please try again.";
      setMessages((current) => [...current, makeMessage("assistant", text)]);
      setNotice({
        type: "error",
        text,
      });
    } finally {
      setChatBusy(false);
    }
  }

  function resetChatSession() {
    setChatSessionId(`refresh-${crypto.randomUUID()}`);
    setChatInput("");
    setChatBusy(false);
    setMessages([makeMessage("assistant", CHECKIN_WELCOME)]);
  }

  function switchTab(nextTab: Tab) {
    setActiveTab(nextTab);
    const params = new URLSearchParams(searchParams.toString());
    if (nextTab === "registration") {
      params.set("tab", "registration");
    } else {
      params.delete("tab");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <main className={styles.page}>
      {notice && (
        <div className={notice.type === "success" ? styles.noticeSuccess : styles.noticeError} role="alert">
          {notice.text}
        </div>
      )}

      <div className={styles.shell}>
        <Link href="/" className={styles.backLink}>
          <span aria-hidden="true">←</span>
          <span>Back to Home</span>
        </Link>

        <header className={styles.hero}>
          <h1 className={styles.title}>Check-in & Registration</h1>
          <p className={styles.subtitle}>
            Already a member? Use the <strong>Check-in</strong> tab to mark your attendance. New to our church?
            Use the <strong>Registration</strong> tab.
          </p>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="Registration options">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "checkin"}
            className={activeTab === "checkin" ? styles.tabActive : styles.tab}
            onClick={() => switchTab("checkin")}
          >
            Check-in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "registration"}
            className={activeTab === "registration" ? styles.tabActive : styles.tab}
            onClick={() => switchTab("registration")}
          >
            New Member Registration
          </button>
        </div>

        {activeTab === "checkin" ? (
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>{tabCopy.checkin.title}</h2>
              </div>
              <button type="button" className={styles.endSessionButton} onClick={resetChatSession}>
                End session
              </button>
            </div>

            <div className={styles.chatBody}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={message.role === "assistant" ? styles.assistantBubble : styles.userBubble}
                >
                  {renderMessageText(message.text)}
                </div>
              ))}
            </div>

            <form className={styles.chatComposer} onSubmit={sendChatMessage}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className={styles.chatInput}
                disabled={chatBusy}
              />
              <button type="submit" className={styles.sendButton} disabled={chatBusy || !chatInput.trim()}>
                {chatBusy ? "Sending..." : "Send"}
              </button>
            </form>
          </section>
        ) : (
          <section className={styles.card}>
            <div className={styles.registrationIntro}>
              <h2 className={styles.cardTitle}>{tabCopy.registration.title}</h2>
              <p className={styles.registrationCopy}>
                Fill in your details so we can welcome you properly and plan each gathering smoothly.
              </p>
            </div>

            <form onSubmit={submitRegistration} className={styles.form}>
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
                <span className={styles.helperText}>Select your country first, then enter your number.</span>
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
                {phoneError && <span className={styles.fieldError}>{phoneError}</span>}
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

              <button type="submit" disabled={registrationBusy} className={styles.submitButton}>
                {registrationBusy ? "Submitting..." : "Submit Registration"}
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
