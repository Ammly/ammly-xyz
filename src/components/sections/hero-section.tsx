"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Github, 
  Linkedin, 
  Rocket, 
  Users, 
  Award, 
  TrendingUp 
} from "lucide-react";

/**
 * Hero Section Props
 * 
 * Fully customizable hero with sensible defaults
 */
interface HeroSectionProps {
  /** Main headline text */
  headline?: string;
  /** Gradient text within headline (optional) */
  gradientText?: string;
  /** Introduction paragraph */
  introduction?: string;
  /** Achievement highlights array */
  achievements?: Achievement[];
  /** CTA buttons configuration */
  ctaButtons?: CTAButton[];
  /** Additional CSS classes */
  className?: string;
}

interface Achievement {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
  external?: boolean;
}

/**
 * Default achievements with icons
 */
const defaultAchievements: Achievement[] = [
  {
    icon: <Rocket className="h-5 w-5" />,
    value: "10+",
    label: "Projects Launched",
  },
  {
    icon: <Users className="h-5 w-5" />,
    value: "50K+",
    label: "Users Reached",
  },
  {
    icon: <Award className="h-5 w-5" />,
    value: "15+",
    label: "Awards Won",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    value: "200%",
    label: "Growth Rate",
  },
];

/**
 * Default CTA buttons
 */
const defaultCTAButtons: CTAButton[] = [
  {
    label: "View Ventures",
    href: "#projects",
    variant: "outline",
  },
  {
    label: "GitHub",
    href: "https://github.com/ammly",
    variant: "outline",
    icon: <Github className="h-4 w-4" />,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ammly",
    variant: "outline",
    icon: <Linkedin className="h-4 w-4" />,
    external: true,
  },
];

export function HeroSection({
  headline = "Building the Future of",
  gradientText = "Digital Innovation",
  introduction = "I'm a full-stack developer and entrepreneur passionate about creating products that make a difference. Specializing in modern web technologies, AI integration, and scalable solutions.",
  achievements = defaultAchievements,
  ctaButtons = defaultCTAButtons,
  className,
}: HeroSectionProps) {
  /**
   * Animation trigger state
   * Uses Intersection Observer for performance
   */
  const [isVisible, setIsVisible] = React.useState(false);
  const heroRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect after first trigger (one-time animation)
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "50px", // Start 50px before entering viewport
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Smooth scroll handler for internal links
   */
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "px-4 sm:px-6 lg:px-8 py-20 md:py-32",
        className
      )}
    >
      {/* Background gradient - subtle, professional */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary-50 via-background to-primary-50/30 dark:from-primary-950/20 dark:via-background dark:to-primary-900/10" />
      
      {/* Grid pattern overlay - adds depth */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
          
          {/* Status Badge - Stagger delay: 0ms */}
          <div
            className={cn(
              "transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: "0ms",
            }}
          >
            <Badge variant="success" size="lg" dot dotColor="#10b981">
              Available for new opportunities
            </Badge>
          </div>

          {/* Headline with Gradient Text - Stagger delay: 100ms */}
          <div
            className={cn(
              "transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: "100ms",
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              {headline}
              <br />
              <span
                className={cn(
                  "inline-block bg-linear-to-r from-primary-600 via-primary-500 to-primary-700",
                  "dark:from-primary-400 dark:via-primary-300 dark:to-primary-500",
                  "bg-clip-text",
                  "animate-gradient bg-size-[200%_auto]"
                )}
                style={{
                  
                  willChange: "background-position",
                }}
              >
                {gradientText}
              </span>
            </h1>
          </div>

          {/* Introduction Paragraph - Stagger delay: 200ms */}
          <div
            className={cn(
              "transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: "200ms",
            }}
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {introduction}
            </p>
          </div>

          {/* CTA Buttons - Stagger delay: 300ms */}
          <div
            className={cn(
              "transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: "300ms",
            }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  onClick={(e) => handleCTAClick(e, button.href)}
                  target={button.external ? "_blank" : undefined}
                  rel={button.external ? "noopener noreferrer" : undefined}
                >
                  <Button
                    variant={button.variant}
                    size="lg"
                    className="min-w-40"
                  >
                    {button.icon}
                    {button.label}
                  </Button>
                </a>
              ))}
            </div>
          </div>

          {/* Achievement Highlights - Stagger delay: 400ms */}
          <div
            className={cn(
              "transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: "400ms",
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8 md:mt-12">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col items-center space-y-2 p-4 rounded-lg",
                    "hover:bg-muted/50 transition-colors duration-200",
                    "group"
                  )}
                >
                  {/* Icon with hover effect */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-200">
                    {achievement.icon}
                  </div>
                  
                  {/* Value - large, bold */}
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {achievement.value}
                  </div>
                  
                  {/* Label - muted, small */}
                  <div className="text-sm text-muted-foreground text-center">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Stagger delay: 500ms */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2",
          "transition-all duration-700 ease-out",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        )}
        style={{
          transitionDelay: "500ms",
        }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
