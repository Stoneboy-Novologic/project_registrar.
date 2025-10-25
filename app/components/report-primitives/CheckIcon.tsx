"use client";

import clsx from "clsx";

export interface CheckIconProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CheckIcon({ size = "md", className }: CheckIconProps) {
  // Console log for debugging icon rendering
  console.log("CheckIcon rendering:", { size });

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  return (
    <div className={clsx("inline-flex items-center justify-center", className)}>
      <svg
        className={clsx(sizeClasses[size], "text-green-600")}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Green circular background */}
        <circle cx="10" cy="10" r="9" fill="#10B981" />
        {/* White checkmark */}
        <path
          fill="white"
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
