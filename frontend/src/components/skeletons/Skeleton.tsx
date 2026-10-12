import type { CSSProperties } from "react";
import "./Skeleton.css";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: "pulse" | "wave" | "none";
  style?: CSSProperties;
}

export default function Skeleton({
  width = "100%",
  height = "1rem",
  className = "",
  animation = "pulse",
  style,
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${animation !== "none" ? `skeleton--${animation}` : ""} ${className}`}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  );
}