"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { SkillNames, SKILLS } from "@/lib/app-config";
import type { Skill } from "@/lib/app-config";
import { useLocale } from "@/locales/use-locale";
import { sleep, cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { Section, getKeyboardState } from "./animated-background-config";
import { useSounds } from "./realtime/hooks/use-sounds";
import { SplineErrorBoundary } from "./spline-error-boundary";

gsap.registerPlugin(ScrollTrigger);

const checkWebGLSupport = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

const WebGLFallback = ({ theme }: { theme?: string }) => {
  const isDark = theme === "dark";
  return (
    <div className={cn(
      "fixed inset-0 w-full h-full -z-50 overflow-hidden transition-colors duration-500",
      isDark ? "bg-[#030712]" : "bg-slate-50"
    )}>
      {/* Space gradient */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-500",
        isDark 
          ? "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]"
          : "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]"
      )} />
      <div className={cn(
        "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] transition-all duration-500",
        isDark ? "bg-indigo-900/10" : "bg-indigo-200/20"
      )} />
      <div className={cn(
        "absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-all duration-500",
        isDark ? "bg-blue-950/15" : "bg-blue-200/30"
      )} />
      
      {/* Subtle pulsing stars / particles */}
      <div className="absolute inset-0 opacity-40">
        <div className={cn("absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full animate-pulse", isDark ? "bg-white" : "bg-blue-400")} style={{ animationDuration: '3s' }} />
        <div className={cn("absolute top-[35%] left-[75%] w-2 h-2 rounded-full animate-pulse", isDark ? "bg-white" : "bg-indigo-400")} style={{ animationDuration: '4s' }} />
        <div className={cn("absolute top-[65%] left-[10%] w-1.5 h-1.5 rounded-full animate-pulse", isDark ? "bg-white" : "bg-blue-400")} style={{ animationDuration: '2.5s' }} />
        <div className={cn("absolute top-[80%] left-[55%] w-2.5 h-2.5 rounded-full animate-pulse", isDark ? "bg-white" : "bg-indigo-400")} style={{ animationDuration: '5s' }} />
        <div className={cn("absolute top-[48%] left-[30%] w-1.5 h-1.5 rounded-full animate-pulse", isDark ? "bg-white" : "bg-blue-400")} style={{ animationDuration: '3.5s' }} />
        <div className={cn("absolute top-[72%] left-[88%] w-1.5 h-1.5 rounded-full animate-pulse", isDark ? "bg-white" : "bg-indigo-400")} style={{ animationDuration: '4.5s' }} />
        <div className={cn("absolute top-[25%] left-[45%] w-1.5 h-1.5 rounded-full animate-pulse", isDark ? "bg-white" : "bg-blue-400")} style={{ animationDuration: '3s' }} />
      </div>
    </div>
  );
};

const AnimatedBackground = () => {
  const { t } = useLocale();
  const tRef = useRef(t);
  tRef.current = t;
  const { isLoading, bypassLoading } = usePreloader();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean>(true);
  const selectedSkillRef = useRef<Skill | null>(null);

  const { playPressSound, playReleaseSound } = useSounds();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const suppressSoundRef = useRef(false);

  // Animation controllers refs
  const keycapAnimationsRef = useRef<{ start: () => void; stop: () => void } | undefined>(undefined);
  const handAnimationRef = useRef<{ start: () => void; stop: () => void } | undefined>(undefined);
  const rotateKeyboardRef = useRef<gsap.core.Tween | undefined>(undefined);
  const teardownKeyboardRef = useRef<gsap.core.Tween | undefined>(undefined);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);
  const sectionVersionRef = useRef(0);

  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const navigate = useNavigate();

  // --- Event Handlers ---

  const isInSkillsSection = () => {
    const el = document.getElementById("skills");
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
  };

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp || selectedSkillRef.current?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      if (selectedSkillRef.current) playReleaseSound();
      setSelectedSkill(null);
      selectedSkillRef.current = null;
      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
    } else if (isInSkillsSection()) {
      if (!selectedSkillRef.current || selectedSkillRef.current.name !== e.target.name) {
        const skill = SKILLS[e.target.name as SkillNames];
        if (skill) {
          if (selectedSkillRef.current) playReleaseSound();
          playPressSound();
          setSelectedSkill(skill);
          selectedSkillRef.current = skill;
        }
      }
    }
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    splineApp.addEventListener("keyUp", () => {
      if (!splineApp || isInputFocused()) return;
      if (!suppressSoundRef.current) playReleaseSound();
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    });
    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp || isInputFocused()) return;
      if (isDraggingRef.current) isDraggingRef.current = false;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill && isInSkillsSection()) {
        if (!suppressSoundRef.current) playPressSound();
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
        splineApp.setVariable("heading", tRef.current("skills", skill.name + ".label"));
        const p = Number(tRef.current("skills", skill.name + ".percentage"));
        const bar = Array.from({ length: 10 }, (_, i) => i < Math.round(p / 10) ? "•" : "◦").join(" ");
        splineApp.setVariable("desc", bar + "   " + p + "%\n" + tRef.current("skills", skill.name + ".shortDescription"));
      }
    });
    splineApp.addEventListener("mouseHover", handleMouseHover);

    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    splineApp.addEventListener("mouseDown", (e) => {
      const name = e.target.name;
      if (!name) return;
      if (activeSectionRef.current !== "hero") return;
      if (!SKILLS[name as SkillNames]) {
        isDraggingRef.current = true;
        rotateKeyboardRef.current?.pause();
      }
    });

    splineApp.addEventListener("mouseUp", () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const heroState = getKeyboardState({ section: "hero", isMobile: isMobileRef.current });
      gsap.to(kbd.rotation, {
        x: heroState.rotation.x,
        y: heroState.rotation.y,
        z: heroState.rotation.z,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          rotateKeyboardRef.current?.kill();
          const rk = gsap.to(kbd.rotation, {
            y: Math.PI * 2 + kbd.rotation.y,
            duration: 10,
            repeat: -1,
            yoyo: true,
            yoyoEase: true,
            ease: "back.inOut",
          });
          rotateKeyboardRef.current = rk;
        },
      });
    });
  };

  // --- Animation Setup Helpers ---

  const createSectionTimeline = (
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start: string = "top 50%",
    end: string = "bottom bottom"
  ) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        scrub: true,
        onEnter: () => {
          setActiveSection(targetSection);
          const state = getKeyboardState({ section: targetSection, isMobile });
          if (targetSection === "about") {
            gsap.to(kbd.scale, { ...state.scale, duration: 1 });
            gsap.to(kbd.position, { ...state.position, duration: 1 });
            gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
            requestAnimationFrame(() => splineApp.emitEvent('keyDown', 'drawer-button'));
          } else {
            if (targetSection === "contact") handAnimationRef.current?.stop();
            if (prevSection === "about") {
              setTimeout(() => {
                gsap.to(kbd.scale, { ...state.scale, duration: 1 });
                gsap.to(kbd.position, { ...state.position, duration: 1 });
                gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
              }, 150);
            } else {
              gsap.to(kbd.scale, { ...state.scale, duration: 1 });
              gsap.to(kbd.position, { ...state.position, duration: 1 });
              gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
            }
          }
        },
        onLeave: () => {
          if (targetSection === "about") splineApp.emitEvent('keyUp', 'drawer-button');
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          if (targetSection === "about") {
            splineApp.emitEvent('keyUp', 'drawer-button');
            setTimeout(() => {
              const state = getKeyboardState({ section: prevSection, isMobile, });
              gsap.to(kbd.scale, { ...state.scale, duration: 1 });
              gsap.to(kbd.position, { ...state.position, duration: 1 });
              gsap.to(kbd.rotation, {
                ...state.rotation,
                duration: 1,
                onComplete: () => {
                  if (activeSectionRef.current === "hero") {
                    rotateKeyboardRef.current?.kill();
                    const rk = gsap.to(kbd.rotation, {
                      y: Math.PI * 2 + kbd.rotation.y,
                      duration: 10,
                      repeat: -1,
                      yoyo: true,
                      yoyoEase: true,
                      ease: "back.inOut",
                    });
                    rotateKeyboardRef.current = rk;
                  }
                }
              });
            }, 150);
          } else {
            const state = getKeyboardState({ section: prevSection, isMobile, });
            if (targetSection === "projects") handAnimationRef.current?.stop();
            gsap.to(kbd.scale, { ...state.scale, duration: 1 });
            gsap.to(kbd.position, { ...state.position, duration: 1 });
            gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
            if (prevSection === "about") {
              requestAnimationFrame(() => splineApp.emitEvent('keyDown', 'drawer-button'));
            }
          }
        },
      },
    });
    timelinesRef.current.push(tl);
  };

  const setupScrollAnimations = () => {
    if (!splineApp || !splineContainer.current) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // Initial state
    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);

    // Section transitions
    createSectionTimeline("#about", "about", "hero");
    createSectionTimeline("#skills", "skills", "about");
    createSectionTimeline("#experience", "experience", "skills");
    createSectionTimeline("#projects", "projects", "experience", "top 70%");
    createSectionTimeline("#contact", "contact", "projects", "top 30%");
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => { }, stop: () => { } };

    let tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => tweens.forEach((t) => t.kill());

    const start = () => {
      removePrevTweens();
      Object.values(SKILLS)
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          const t = gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          });
          tweens.push(t);
        });
    };

    const stop = () => {
      removePrevTweens();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap.position, {
          y: 0,
          duration: 4,
          repeat: 1,
          ease: "elastic.out(1,0.7)",
        });
        tweens.push(t);
      });
      setTimeout(removePrevTweens, 1000);
    };

    return { start, stop };
  };

  const getHandAnimation = () => {
    if (!splineApp) return { start: () => { }, stop: () => { } };

    const parent = splineApp.findObjectByName("keyboard-hand");
    const frameCount = 40;
    const frames = Array.from({ length: frameCount }, (_, i) =>
      splineApp.findObjectByName(`frame-${i + 1}`)
    );

    if (!parent || frames.some((f) => !f)) {
      return { start: () => { }, stop: () => { } };
    }

    let interval: ReturnType<typeof setInterval>;
    let frameIndex = 0;
    let direction = 1;

    const start = () => {
      parent.visible = true;
      frames.forEach((f) => f!.visible = false);
      frames[0]!.visible = true;
      frameIndex = 0;
      direction = 1;
      interval = setInterval(() => {
        frames.forEach((f) => f!.visible = false);
        frameIndex += direction;
        if (frameIndex >= frameCount) {
          direction = -1;
          frameIndex = frameCount - 2;
        } else if (frameIndex < 0) {
          direction = 1;
          frameIndex = 1;
        }
        frames[frameIndex]!.visible = true;
      }, 100);
    };

    const stop = () => {
      clearInterval(interval);
      parent.visible = false;
      frames.forEach((f) => f!.visible = false);
    };

    return { start, stop };
  };

  const updateKeyboardTransform = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    setKeyboardRevealed(true);

    const currentState = getKeyboardState({ section: activeSection, isMobile });
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        ...currentState.scale,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");

    await sleep(900);

    if (isMobile) {
      const mobileKeyCaps = allObjects.filter((obj) => obj.name === "keycap-mobile");
      mobileKeyCaps.forEach((keycap) => { keycap.visible = true; });
    } else {
      const desktopKeyCaps = allObjects.filter((obj) => obj.name === "keycap-desktop");
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
    }

    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
    });
  };

  // --- Effects ---

  // We rely on Spline's native initialization, SplineErrorBoundary, and the timeout fallback
  // instead of an upfront canvas WebGL check, to prevent dummy context creation failures on some browsers.

  // WebGL Spline loading timeout fallback
  useEffect(() => {
    if (!isWebGLAvailable) return;

    const timer = setTimeout(() => {
      if (!splineApp) {
        console.warn("Spline background loading timed out after 15 seconds. Falling back.");
        setIsWebGLAvailable(false);
        bypassLoading();
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [splineApp, isWebGLAvailable]);

  // Initialize GSAP and Spline interactions
  useEffect(() => {
    if (!splineApp) return;
    handleSplineInteractions();
    setupScrollAnimations();
    keycapAnimationsRef.current = getKeycapsAnimation();
    handAnimationRef.current = getHandAnimation();
    return () => {
      keycapAnimationsRef.current?.stop()
      handAnimationRef.current?.stop()
      timelinesRef.current.forEach(tl => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
      timelinesRef.current = [];
    }

  }, [splineApp, isMobile]);

  // Track pointer for drag-to-rotate
  useEffect(() => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;
    const canvas = splineContainer.current?.querySelector("canvas");

    const snapBack = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const state = getKeyboardState({ section: activeSectionRef.current, isMobile: isMobileRef.current });
      gsap.to(kbd.rotation, {
        x: state.rotation.x,
        y: state.rotation.y,
        z: state.rotation.z,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          if (activeSectionRef.current !== "hero") return;
          rotateKeyboardRef.current?.kill();
          const rk = gsap.to(kbd.rotation, {
            y: Math.PI * 2 + kbd.rotation.y,
            duration: 10,
            repeat: -1,
            yoyo: true,
            yoyoEase: true,
            ease: "back.inOut",
          });
          rotateKeyboardRef.current = rk;
        },
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      if (activeSectionRef.current !== "hero") return;
      if (!(e.buttons & 1)) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      kbd.rotation.y += dx * 0.005;
      kbd.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, kbd.rotation.x + dy * 0.005));
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!canvas || !canvas.contains(e.target as Node)) return;
      if (activeSectionRef.current !== "hero") return;
      if (!(e.buttons & 1)) return;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      isDraggingRef.current = true;
      rotateKeyboardRef.current?.pause();
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", snapBack);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", snapBack);
    };
  }, [splineApp]);

  // Auto-press keyboard keys: postgres, nodejs, express, linux (only on projects section)
  useEffect(() => {
    if (!splineApp) return;

    if (activeSection !== "projects") {
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
      return;
    }

    suppressSoundRef.current = true;

    const skillNames = [SkillNames.POSTGRES, SkillNames.NODEJS, SkillNames.EXPRESS, SkillNames.LINUX];
    let index = 0;
    let pressing = false;

    const press = (name: SkillNames) => {
      const skill = SKILLS[name];
      if (!skill) return;
      splineApp.emitEvent('keyDown', name);
      setSelectedSkill(skill);
      selectedSkillRef.current = skill;
      splineApp.setVariable("heading", tRef.current("skills", skill.name + ".label"));
      const p = Number(tRef.current("skills", skill.name + ".percentage"));
      const bar = Array.from({ length: 10 }, (_, i) => i < Math.round(p / 10) ? "•" : "◦").join(" ");
      splineApp.setVariable("desc", bar + "   " + p + "%\n" + tRef.current("skills", skill.name + ".shortDescription"));
    };

    const release = (name: SkillNames) => {
      splineApp.emitEvent('keyUp', name);
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    };

    const interval = setInterval(() => {
      if (pressing) {
        release(skillNames[index]);
        pressing = false;
        index = (index + 1) % skillNames.length;
      } else {
        press(skillNames[index]);
        pressing = true;
      }
    }, 100);

    return () => {
      clearInterval(interval);
      suppressSoundRef.current = false;
    };
  }, [splineApp, activeSection]);

  // Handle keyboard text visibility based on theme and section
  useEffect(() => {
    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");

    if (!textDesktopDark || !textDesktopLight || !textMobileDark || !textMobileLight) return;

    const setVisibility = (
      dDark: boolean,
      dLight: boolean,
      mDark: boolean,
      mLight: boolean
    ) => {
      textDesktopDark.visible = dDark;
      textDesktopLight.visible = dLight;
      textMobileDark.visible = mDark;
      textMobileLight.visible = mLight;
    };

    if (activeSection !== "skills") {
      setVisibility(false, false, false, false);
    } else if (theme === "dark") {
      isMobile
        ? setVisibility(false, false, false, true)
        : setVisibility(false, true, false, false);
    } else {
      isMobile
        ? setVisibility(false, false, true, false)
        : setVisibility(true, false, false, false);
    }
  }, [theme, splineApp, isMobile, activeSection, selectedSkill]);

  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    if (!isInSkillsSection()) return;
    splineApp.setVariable("heading", tRef.current("skills", selectedSkill.name + ".label"));
    const p = Number(tRef.current("skills", selectedSkill.name + ".percentage"));
    const bar = Array.from({ length: 10 }, (_, i) => i < Math.round(p / 10) ? "•" : "◦").join(" ");
    splineApp.setVariable("desc", bar + "   " + p + "%\n" + tRef.current("skills", selectedSkill.name + ".shortDescription"));
  }, [selectedSkill, splineApp]);

  // Handle rotation and teardown animations based on active section
  useEffect(() => {
    if (!splineApp) return;
    const currentVersion = ++sectionVersionRef.current;

    let rotateKeyboard: gsap.core.Tween | undefined;
    let teardownKeyboard: gsap.core.Tween | undefined;

    const kbd = splineApp.findObjectByName("keyboard");

    if (kbd) {
      const rk = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        paused: true,
      });
      rotateKeyboardRef.current = rk;
      rotateKeyboard = rk;

      const tk = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );
      teardownKeyboardRef.current = tk;
      teardownKeyboard = tk;
    }

    const manageAnimations = async () => {
      if (activeSection !== "skills") {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
        setSelectedSkill(null);
        selectedSkillRef.current = null;
      }

      if (activeSection === "hero") {
        if (!keyboardRevealed) {
          rotateKeyboard?.restart();
        }
        teardownKeyboard?.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard?.pause();
      } else {
        rotateKeyboard?.pause();
        teardownKeyboard?.pause();
      }

      if (activeSection === "contact") {
        await sleep(600);
        if (currentVersion !== sectionVersionRef.current) return;
        teardownKeyboard?.restart();
        keycapAnimationsRef.current?.start();
      } else {
        await sleep(600);
        if (currentVersion !== sectionVersionRef.current) return;
        teardownKeyboard?.pause();
        keycapAnimationsRef.current?.stop();
      }

      if (activeSection === "projects") {
        await sleep(300);
        if (currentVersion !== sectionVersionRef.current) return;
        handAnimationRef.current?.start();
      } else {
        await sleep(200);
        if (currentVersion !== sectionVersionRef.current) return;
        handAnimationRef.current?.stop();
      }
    };

    manageAnimations();

    return () => {
      rotateKeyboard?.kill();
      teardownKeyboard?.kill();
      rotateKeyboardRef.current?.kill();
      teardownKeyboardRef.current?.kill();
      rotateKeyboardRef.current = undefined;
      teardownKeyboardRef.current = undefined;
    };
  }, [activeSection, splineApp]);

  // Reveal keyboard on load/route change
  useEffect(() => {
    const hash = activeSection === "hero" ? "#" : `#${activeSection}`;
    navigate("/" + hash, { replace: true });

    if (!splineApp || isLoading || keyboardRevealed) return;
    updateKeyboardTransform();
  }, [splineApp, isLoading, activeSection]);

  if (!isWebGLAvailable) {
    return <WebGLFallback theme={theme} />;
  }

  return (
    <SplineErrorBoundary
      fallback={<WebGLFallback theme={theme} />}
      onError={(err) => {
        console.warn("Spline/WebGL error occurred, falling back to CSS background:", err);
        setIsWebGLAvailable(false);
        bypassLoading();
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          className="w-full h-full fixed"
          ref={splineContainer}
          onLoad={(app: Application) => {
            setSplineApp(app);
            bypassLoading();
          }}
          scene="/assets/skills_keyboard.spline"
        />
      </Suspense>
    </SplineErrorBoundary>
  );
};

export default AnimatedBackground;
