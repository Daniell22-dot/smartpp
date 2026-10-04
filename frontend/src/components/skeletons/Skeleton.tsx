import "./Skeleton.css";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: "pulse" | "wave" | "none";
}

export default function Skeleton({
  width = "100%",
  height = "1rem",
  className = "",
  animation = "pulse",
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${animation !== "none" ? `skeleton--${animation}` : ""} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}