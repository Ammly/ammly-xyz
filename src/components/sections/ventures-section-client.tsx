"use client";

import * as React from "react";
import { VentureCard } from "@/components/ui/venture-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Venture } from "@/types/venture";

/**
 * Ventures Section Props
 */
interface VenturesSectionClientProps {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Array of ventures to display */
  ventures: Venture[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * VenturesSectionClient Component
 * 
 * Client component handling animations and interactions
 */
export function VenturesSectionClient({
  title = "AI Ventures",
  subtitle = "Building the next generation of AI-powered solutions for African markets",
  ventures,
  className,
}: VenturesSectionClientProps) {
  // Show only first 6 featured ventures (2 rows of 3)
  const featuredVentures = ventures.slice(0, 6);
  
  /**
   * Animation trigger for section entrance
   */
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  /**
   * Intersection Observer for staggered card animations
   */
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={cn(
        "relative py-20 md:py-32 px-4 sm:px-6 lg:px-8",
        "bg-linear-to-b from-background via-muted/30 to-background",
        className
      )}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-12 md:mb-16 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Badge variant="primary" size="lg" className="mb-4">
            Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Responsive Grid - 2 rows × 3 columns (6 featured ventures) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredVentures.map((venture, index) => (
            <div
              key={venture.id}
              className={cn(
                "transition-all duration-700 ease-out",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                // Staggered animation delay
                transitionDelay: `${(index + 1) * 100}ms`,
              }}
            >
              <VentureCard venture={venture} />
            </div>
          ))}
        </div>

        {/* View All Button - always show when there are ventures */}
        {ventures.length > 0 && (
          <div
            className={cn(
              "text-center mt-12 transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: `${(featuredVentures.length + 1) * 100}ms`,
            }}
          >
            <a
              href="/all-projects"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
            >
              View all {ventures.length} projects
              <span className="text-xl">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
