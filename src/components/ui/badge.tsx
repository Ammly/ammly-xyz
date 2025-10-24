import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge Variants Configuration
 * 
 * Small, inline status indicators with semantic meaning
 * Color-coded for quick visual scanning
 */
const badgeVariants = cva(
  // Base styles - compact, inline, rounded
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      /**
       * Semantic Variants:
       * - default: Neutral information (gray)
       * - primary: Brand-related status (blue)
       * - success: Completed, active, live (green)
       * - warning: Pending, in-progress (amber)
       * - error: Failed, rejected, error (red)
       * - outline: Subtle, minimal emphasis
       */
      variant: {
        default:
          "border-transparent bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
        primary:
          "border-transparent bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300",
        success:
          "border-transparent bg-success-50 text-success-700 dark:bg-success-700/20 dark:text-success-400",
        warning:
          "border-transparent bg-warning-50 text-warning-700 dark:bg-warning-700/20 dark:text-warning-400",
        error:
          "border-transparent bg-error-50 text-error-700 dark:bg-error-700/20 dark:text-error-400",
        outline:
          "border-neutral-300 bg-transparent text-foreground dark:border-neutral-700",
      },
      /**
       * Size Variants:
       * - sm: Compact badges for tight layouts
       * - md: Default size for most use cases
       * - lg: Prominent badges in hero sections
       */
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Badge Props Interface
 * 
 * Extends native div for flexibility (can contain icons, text, etc.)
 * VariantProps ensures type-safe variant usage
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Optional: Show status dot indicator
   * Useful for "live", "active", or real-time status
   */
  dot?: boolean;
  /**
   * Optional: Dot color (overrides variant color)
   * Useful for custom status indicators
   */
  dotColor?: string;
}

/**
 * Badge Component
 * 
 * Versatile status indicator with semantic color coding
 * 
 * TypeScript Benefits:
 * - Autocomplete for all div props (onClick, onHover, etc.)
 * - Type-safe variant and size options
 * - Optional dot prop with color customization
 * - Proper ref forwarding for advanced use cases
 * 
 * Accessibility:
 * - Semantic color coding (don't rely solely on color)
 * - Can include aria-label for screen readers
 * - Focusable if interactive (button-like behavior)
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, dot = false, dotColor, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
            style={{
              backgroundColor: dotColor || "currentColor",
            }}
            aria-hidden="true"
          />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

/**
 * Example Usage:
 * 
 * Status Indicators:
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="error">Failed</Badge>
 * 
 * With Live Indicator:
 * <Badge variant="success" dot>Live</Badge>
 * <Badge variant="warning" dot dotColor="#f59e0b">In Progress</Badge>
 * 
 * Interactive Badge:
 * <Badge 
 *   variant="primary" 
 *   onClick={() => filterByTag('react')}
 *   className="cursor-pointer hover:opacity-80"
 * >
 *   React
 * </Badge>
 * 
 * With Icon:
 * <Badge variant="success">
 *   <CheckIcon className="h-3 w-3" />
 *   Verified
 * </Badge>
 */

export { Badge, badgeVariants };
