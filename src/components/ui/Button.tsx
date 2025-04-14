
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "link" | "success" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className, children, loading = false, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        variant={variant as any}
        size={size}
        className={cn(
          "rounded-full transition-all duration-200",
          {
            "cursor-not-allowed opacity-70": loading,
            "bg-[hsl(var(--success))] text-white hover:bg-[hsl(var(--success))]/90": variant === "success",
          },
          className
        )}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
