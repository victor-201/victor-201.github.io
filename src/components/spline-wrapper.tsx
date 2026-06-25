import React, { Suspense } from "react";
import { SplineErrorBoundary } from "./spline-error-boundary";

const SplineScene = React.lazy(() => import("@splinetool/react-spline"));

type Props = {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: (app: any) => void;
  fallback?: React.ReactNode;
};

export function SplineWrapper({ scene, className, style, onLoad, fallback }: Props) {
  if (!scene.endsWith(".spline")) {
    return fallback ?? null;
  }

  return (
    <SplineErrorBoundary>
      <Suspense fallback={null}>
        <SplineScene
          className={className}
          style={style}
          scene={scene}
          onLoad={onLoad}
        />
      </Suspense>
    </SplineErrorBoundary>
  );
}
