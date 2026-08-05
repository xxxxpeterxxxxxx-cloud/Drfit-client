import { forwardRef, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "3d" | "ghost" | "secondary" | "flat" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
  xl: "h-16 px-10 text-xl",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-drift-accent hover:bg-drift-accent-hover text-white shadow-lg shadow-drift-accent/20",
  "3d": "bg-drift-accent hover:bg-drift-accent-hover text-white border-2 border-b-4 border-drift-accent-dark shadow-3d hover:shadow-3d-hover active:translate-y-0.5",
  ghost: "hover:bg-drift-surface text-drift-text",
  secondary: "bg-drift-surface-hover hover:bg-drift-border-light text-drift-text border border-drift-border",
  flat: "bg-drift-accent/10 hover:bg-drift-accent/20 text-drift-accent border border-drift-accent/30",
  danger: "bg-red-500/90 hover:bg-red-500 text-white shadow-lg shadow-red-500/20",
};

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "md", icon, iconPosition = "left", fullWidth, disabled, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const rippleId = useRef(0);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const id = rippleId.current++;
      setRipples((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 850);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 select-none",
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && "w-full",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="ripple-effect"
            style={{
              left: r.x,
              top: r.y,
              width: 0,
              height: 0,
              animation: "ripple 0.85s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          />
        ))}
      </button>
    );
  }
);

Button.displayName = "Button";
