"use client";
import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import React, { useEffect, useRef } from "react";
import SkyElements from "./sky-elements";
import { useLocale } from "@/locales/use-locale";

const EASTER_EGG_NAMES = ["naresh", "Naresh", "NARESH", "Thắng", "thắng", "Victor", "victor", "VICTOR"];
const S1 = "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px";
const S2 = "color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px";
const S3 = "color: #FF4500; font-size: 18px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:10px";
const S4 = "color: #FF69B4; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  const { t } = useLocale();
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!isDevToolsOpen) return;
    if (typeof console === "undefined") return;
    if ((window as any).__easterEggShown) return;
    (window as any).__easterEggShown = true;

    console.clear();
    console.log(t("common", "easterEgg.intro")!, S1, S2, S1);

    EASTER_EGG_NAMES.forEach((name) => {
      if ((window as any).__easterEggInstalled?.has(name)) return;
      if (!(window as any).__easterEggInstalled) (window as any).__easterEggInstalled = new Set();
      (window as any).__easterEggInstalled.add(name);

      Object.defineProperty(window, name, {
        get() {
          console.log(t("common", "easterEgg.summon")!, S3);
          const timer = setTimeout(() => console.log(t("common", "easterEgg.hint")!, S4), 7000);
          timersRef.current.push(timer);
          return "";
        },
        configurable: true,
      });
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [isDevToolsOpen, t]);

  return <SkyElements />;
};

export default EasterEggs;
