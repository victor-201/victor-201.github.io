"use client";

import { useLocation } from "react-router-dom";
import Particles from "@/components/Particles";
import RemoteCursors from "@/components/realtime/remote-cursors";
import EasterEggs from "@/components/easter-eggs";
import ElasticCursor from "@/components/ui/ElasticCursor";
import RadialMenu from "@/components/radial-menu/index";

export default function AppOverlays() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <Particles
        className="fixed inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <RemoteCursors />
      {isHome && <EasterEggs />}
      <ElasticCursor />
      {isHome && <RadialMenu />}
    </>
  );
}
