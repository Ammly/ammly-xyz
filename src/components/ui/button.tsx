import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button Variants Configuration
 * 
 * Using class-variance-authority (CVA) for type-safe variant management
 * - Provides excellent TypeScript inference
 * - Allows multiple variant combinations
 * - Ensures only valid combinations are used
 */
const buttonVariants = cva(
  // Base styles - applied to ALL button variants
  "inline-flex items-center justify-center gap-2 rounded-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      /**
       * Visual Variants:
       * - primary: Main CTA buttons (high emphasis)
       * - secondary: Alternative actions (medium emphasis)
       * - outline: Less prominent actions (low emphasis)
       * - ghost: Minimal visual weight (text-like)
       * - destructive: Delete/remove actions (danger)
       */
      variant: {
        primary:
          "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
        outline:
          "border-2 border-neutral-300 bg-transparent hover:bg-neutral-50 active:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900 dark:active:bg-neutral-800",
        ghost:
          "hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
        destructive:
          "bg-error-600 text-white hover:bg-error-700 active:bg-error-800 shadow-sm hover:shadow-md",
      },
      /**
       * Size Variants:
       * - sm: Compact buttons for tight spaces
       * - md: Default size for most use cases
       * - lg: Prominent CTAs, hero sections
       * - icon: Square buttons for icons only
       */
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-13 px-7 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Button Props Interface
 * 
 * Extends native HTML button attributes for full compatibility
 * VariantProps extracts variant types from CVA configuration
 * This ensures type safety when using variant/size props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/**
 * Button Component
 * 
 * TypeScript Benefits:
 * - Full autocomplete for all native button props
 * - Type-safe variant and size props
 * - Proper ref forwarding for accessibility
 * - Discriminated union for variant/size combinations
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
