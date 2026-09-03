"use client";
import { ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import emailjs from "@emailjs/browser";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useLocale } from "@/locales/use-locale";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = () => {
  const { t } = useLocale();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast({
        title: t("common", "contact.errorTitle"),
        description: t("common", "contact.errorDesc"),
        variant: "destructive",
        className: cn(
          "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
        ),
      });
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      toast({
        title: t("common", "contact.errorTitle"),
        description: t("common", "contact.errorDesc"),
        variant: "destructive",
        className: cn(
          "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
        ),
      });
      return;
    }

    setLoading(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS service configuration is missing");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: trimmedName,
          from_email: trimmedEmail,
          message: trimmedMessage,
        },
        publicKey
      );

      toast({
        title: t("common", "contact.successTitle"),
        description: t("common", "contact.successDesc"),
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });

      setFullName("");
      setEmail("");
      setMessage("");

      const timer = setTimeout(() => {
        navigate("/");
        clearTimeout(timer);
      }, 1000);
    } catch (err) {
      console.error("EmailJS submission error:", err);
      toast({
        title: t("common", "contact.errorTitle"),
        description: t("common", "contact.errorDesc"),
        className: cn(
          "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
        ),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} aria-live="polite">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">{t("common", "contact.fullName")}</Label>
          <Input
            id="fullname"
            placeholder={t("common", "contact.yourName")}
            type="text"
            required
            aria-required="true"
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-33"
        />
        <p className="text-sm text-muted-foreground">
          {t("common", "contact.privacy")}
        </p>
      </div>
      <Button
        disabled={loading}
        aria-busy={loading}
        className="bg-linear-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>{t("common", "contact.pleaseWait")}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {t("common", "contact.sendMessage")} <ChevronRight className="w-4 h-4 ml-4" />
          </div>
        )}
        <BottomGradient />
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
