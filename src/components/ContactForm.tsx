"use client";
import { Check, ChevronRight, Clock, Loader2, X } from "lucide-react";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useLocale } from "@/locales/use-locale";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COOLDOWN_DURATION_MS = 30_000; // 30s anti-spam cooldown between sends

type SubmitStatus = "idle" | "loading" | "success" | "error" | "cooldown";

const ContactForm = () => {
  const { t } = useLocale();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Anti-spam trap field
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const formMountTime = useRef(Date.now());
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetStatusAfterDelay = (delay = 3500) => {
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => {
      setStatus("idle");
    }, delay);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    // 1. Anti-spam Honeypot check: If the hidden trap field is filled, silently discard (bot detected)
    if (honeypot.trim().length > 0) {
      setFullName("");
      setEmail("");
      setMessage("");
      setStatus("success");
      resetStatusAfterDelay(3000);
      return;
    }

    // 2. Anti-spam Speed check: Human submission takes at least 1.5s to type and review
    if (Date.now() - formMountTime.current < 1500) {
      setStatus("error");
      resetStatusAfterDelay(2500);
      return;
    }

    // 3. Anti-spam Cooldown check: Prevent rapid repeated mail blasts
    const lastSent = Number(localStorage.getItem("contact_last_sent") || 0);
    const elapsedSinceLastSent = Date.now() - lastSent;
    if (elapsedSinceLastSent < COOLDOWN_DURATION_MS) {
      setStatus("cooldown");
      resetStatusAfterDelay(3000);
      return;
    }

    // 4. Input validation
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage || !EMAIL_REGEX.test(trimmedEmail)) {
      setStatus("error");
      resetStatusAfterDelay(2500);
      return;
    }

    setStatus("loading");

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_apqmip3";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_e668qu5";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "sUYdRg-0wXj8LbVzB";

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS service configuration is missing");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          title: "New message from Portfolio",
          from_name: trimmedName,
          from_email: trimmedEmail,
          time: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
          message: trimmedMessage,
        },
        publicKey
      );

      // Record successful send timestamp for anti-spam rate limiting
      localStorage.setItem("contact_last_sent", String(Date.now()));

      // Reset form fields only on success
      setFullName("");
      setEmail("");
      setMessage("");

      // Gentle green tick status on the button
      setStatus("success");
      resetStatusAfterDelay(4000);
    } catch (err) {
      console.error("EmailJS submission error:", err);
      // Gentle red error status on the button, preserve user input so they can retry
      setStatus("error");
      resetStatusAfterDelay(3500);
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";
  const isCooldown = status === "cooldown";

  return (
    <form className="w-full" onSubmit={handleSubmit} aria-live="polite">
      {/* Invisible Anti-spam Honeypot field (hidden from real users, bots fill this) */}
      <div
        className="opacity-0 absolute -z-50 pointer-events-none h-0 w-0 overflow-hidden"
        aria-hidden="true"
        tabIndex={-1}
      >
        <label htmlFor="hp_company_field">Leave this empty</label>
        <input
          id="hp_company_field"
          type="text"
          name="company_name_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">{t("common", "contact.fullName")}</Label>
          <Input
            id="fullname"
            placeholder={t("common", "contact.yourName")}
            type="text"
            required
            aria-required="true"
            disabled={isLoading}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">{t("common", "contact.emailAddress")}</Label>
          <Input
            id="email"
            placeholder={t("common", "contact.emailPlaceholder")}
            type="email"
            required
            aria-required="true"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
      </div>

      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">{t("common", "contact.yourMessage")}</Label>
        <Textarea
          placeholder={t("common", "contact.messagePlaceholder")}
          id="content"
          required
          aria-required="true"
          disabled={isLoading}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-33"
        />
        <p className="text-sm text-muted-foreground">
          {t("common", "contact.privacy")}
        </p>
      </div>

      {/* Button with in-place soft visual feedback */}
      <Button
        disabled={isLoading || isSuccess}
        aria-busy={isLoading}
        className={cn(
          "relative group/btn w-full md:w-auto px-6 rounded-md h-10 font-medium transition-all duration-300",
          // Normal state
          status === "idle" &&
            "bg-linear-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
          // Loading state
          isLoading &&
            "bg-zinc-800 text-zinc-300 border border-zinc-700 cursor-wait",
          // Soft green tick success state
          isSuccess &&
            "bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.18)] cursor-default",
          // Soft red cross error state
          isError &&
            "bg-rose-950/40 border border-rose-500/40 text-rose-300 shadow-[0_0_16px_rgba(244,63,94,0.18)]",
          // Cooldown state
          isCooldown &&
            "bg-amber-950/40 border border-amber-500/40 text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.18)]"
        )}
        type="submit"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-zinc-300" />
            <span>{t("common", "contact.pleaseWait")}...</span>
          </div>
        ) : isSuccess ? (
          <div className="flex items-center justify-center animate-in zoom-in-75 duration-200">
            <Check className="w-4 h-4 mr-2 text-emerald-400 stroke-[2.5]" />
            <span className="font-medium text-emerald-300">
              {t("common", "contact.sentSuccess")}
            </span>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center animate-in zoom-in-75 duration-200">
            <X className="w-4 h-4 mr-2 text-rose-400 stroke-[2.5]" />
            <span className="font-medium text-rose-300">
              {t("common", "contact.sendFailed")}
            </span>
          </div>
        ) : isCooldown ? (
          <div className="flex items-center justify-center animate-in zoom-in-75 duration-200">
            <Clock className="w-4 h-4 mr-2 text-amber-400" />
            <span className="font-medium text-amber-300">
              {t("common", "contact.waitCooldown")}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {t("common", "contact.sendMessage")}
            <ChevronRight className="w-4 h-4 ml-3 group-hover/btn:translate-x-1 transition duration-200" />
          </div>
        )}

        {status === "idle" && <BottomGradient />}
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-linear-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-linear-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
