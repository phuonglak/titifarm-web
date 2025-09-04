"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";

  const variants: Record<string, string> = {
    primary: "bg-foreground text-background hover:opacity-90",
    secondary:
      "bg-transparent border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10",
    ghost: "bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button className={[baseStyles, variants[variant], width, className].join(" ")} {...props}>
      {children}
    </button>
  );
}


