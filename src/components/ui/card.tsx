import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card Variants Configuration
 * 
 * Compound component pattern for flexible card composition
 * Each sub-component can be used independently or together
 */
const cardVariants = cva(
  // Base card styles - elevation, border, background
  "rounded-lg border border-border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      /**
       * Visual Variants:
       * - default: Standard card with subtle border
       * - elevated: Raised appearance with shadow
       * - outline: Emphasized border, no shadow
       * - ghost: Minimal styling, blend with background
       */
      variant: {
        default: "shadow-sm",
        elevated: "shadow-md hover:shadow-lg",
        outline: "border-2 border-neutral-300 dark:border-neutral-700",
        ghost: "border-transparent shadow-none",
      },
      /**
       * Hover States:
       * - none: Static card (default for content display)
       * - lift: Elevates on hover (interactive cards)
       * - glow: Border glow effect (premium feel)
       */
      hover: {
        none: "",
        lift: "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
        glow: "hover:ring-2 hover:ring-primary-500 hover:ring-opacity-50 cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "none",
    },
  }
);

/**
 * Card Root Component Props
 * 
 * Extends native div attributes for maximum flexibility
 * VariantProps provides type-safe variant options
 */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card - Root Container
 * 
 * Main wrapper for card content. Use with sub-components:
 * <Card>
 *   <CardHeader>...</CardHeader>
 *   <CardContent>...</CardContent>
 *   <CardFooter>...</CardFooter>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, hover, className }))}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

/**
 * CardHeader - Top Section
 * 
 * Typical use: Title, subtitle, and optional actions
 * Consistent padding provides visual rhythm
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * CardTitle - Heading Element
 * 
 * Semantic h3 by default for accessibility
 * Can be overridden with 'as' prop pattern if needed
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * CardDescription - Subtitle/Summary
 * 
 * Muted color for visual hierarchy
 * Complements CardTitle with supporting information
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * CardContent - Main Body
 * 
 * Primary content area with consistent padding
 * Most flexible section - can contain any content
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * CardFooter - Bottom Section
 * 
 * Typical use: Actions, metadata, timestamps
 * Flexbox layout for horizontal button groups
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/**
 * Example Usage:
 * 
 * <Card variant="elevated" hover="lift">
 *   <CardHeader>
 *     <CardTitle>Project Name</CardTitle>
 *     <CardDescription>Brief project description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <img src="..." alt="Project preview" />
 *     <p>Detailed information...</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>View Project</Button>
 *   </CardFooter>
 * </Card>
 */

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
