import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "ghost" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-drift-accent hover:bg-drift-accent-hover text-white",
  ghost: "hover:bg-drift-surface text-drift-text",
  secondary: "bg-drift-surface-hover hover:bg-drift-border-light text-drift-text border border-drift-border",
  danger: "bg-red-500/90 hover:bg-red-500 text-white",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "md", icon, fullWidth, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 select-none",
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && "w-full",
          disabled && "opacity-40 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
