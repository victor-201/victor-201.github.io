"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

interface State {
  hasError: boolean;
  isWebGLError: boolean;
}

export class SplineErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, isWebGLError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      isWebGLError: error.message?.includes("WebGL") || error.message?.toLowerCase().includes("webgl"),
    };
  }

  componentDidCatch(error: Error) {
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      return null;
    }
    return this.props.children;
  }
}
