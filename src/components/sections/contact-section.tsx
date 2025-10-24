"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, X } from "lucide-react";
import Script from "next/script";

/**
 * Contact Section Props
 */
interface ContactSectionProps {
  /** Section title */
  title?: string;
  /** Section subtitle/description */
  subtitle?: string;
  /** Calendly URL */
  calendlyUrl?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Contact Section Component
 * 
 * Features:
 * 1. Inline Calendly embed for seamless booking
 * 2. Success message detection from redirect params
 * 3. Intersection Observer for scroll animations
 * 4. Customized Calendly colors to match site theme
 */
export function ContactSection({
  title = "Let's Build Something Amazing",
  subtitle = "Ready to discuss your next project? Schedule a call and let's explore how we can work together.",
  calendlyUrl = "https://calendly.com/ammly-xyz/your-next-project",
  className,
}: ContactSectionProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = React.useState(false);
  const [eventDetails, setEventDetails] = React.useState<{
    inviteeName?: string;
    eventStartTime?: string;
  }>({});
  const sectionRef = React.useRef<HTMLElement>(null);
  const calendlyContainerRef = React.useRef<HTMLDivElement>(null);

  /**
   * Detect dark mode from document class
   */
  React.useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    checkDarkMode();

    // Watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Calendly embed configuration
   * Colors dynamically match site theme (light/dark mode)
   */
  const calendlyEmbedUrl = React.useMemo(() => {
    const bgColor = isDarkMode ? "171717" : "ffffff";
    const textColor = isDarkMode ? "fafafa" : "171717";
    const primaryColor = isDarkMode ? "60a5fa" : "2563eb";
    
    return `${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=${bgColor}&text_color=${textColor}&primary_color=${primaryColor}`;
  }, [calendlyUrl, isDarkMode]);

  /**
   * Reinitialize Calendly widget when theme changes
   */
  React.useEffect(() => {
    if (!calendlyLoaded || !calendlyContainerRef.current) return;

    // Clear the container
    if (calendlyContainerRef.current) {
      calendlyContainerRef.current.innerHTML = "";
      
      // Create new widget element
      const widgetDiv = document.createElement("div");
      widgetDiv.className = "calendly-inline-widget";
      widgetDiv.setAttribute("data-url", calendlyEmbedUrl);
      widgetDiv.style.minWidth = "320px";
      widgetDiv.style.height = "700px";
      
      calendlyContainerRef.current.appendChild(widgetDiv);

      // Reinitialize Calendly
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).Calendly) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Calendly.initInlineWidget({
          url: calendlyEmbedUrl,
          parentElement: widgetDiv,
        });
      }
    }
  }, [calendlyEmbedUrl, calendlyLoaded]);

  /**
   * Intersection Observer for animations
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
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Check for Calendly redirect parameters
   * Detects successful booking and displays confirmation
   */
  React.useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    
    // Calendly redirects with event_type_uuid when booking is successful
    const eventTypeUuid = params.get("event_type_uuid");
    const inviteeName = params.get("invitee_full_name") || params.get("invitee_first_name");
    const eventStartTime = params.get("event_start_time");

    // If event_type_uuid exists, it means booking was successful
    if (eventTypeUuid) {
      setShowSuccess(true);
      setEventDetails({
        inviteeName: inviteeName || undefined,
        eventStartTime: eventStartTime || undefined,
      });

      // Scroll to contact section
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);

      // Clean URL without reloading page
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  /**
   * Format event start time for display
   */
  const formatEventTime = (isoString?: string): string => {
    if (!isoString) return "";
    
    try {
      const date = new Date(isoString);
      return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      });
    } catch {
      return "";
    }
  };

  return (
    <>
      {/* Load Calendly widget script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setCalendlyLoaded(true)}
      />

      <section
        ref={sectionRef}
        id="contact"
        className={cn(
          "relative py-20 md:py-32 px-4 sm:px-6 lg:px-8",
          "bg-muted/30",
          className
        )}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted/30 to-background" />

        <div className="container mx-auto max-w-6xl">
          {/* Success Message Modal */}
          {showSuccess && (
            <div
              className={cn(
                "mb-8 transition-all duration-500 ease-out",
                "opacity-100 translate-y-0"
              )}
            >
              <Card className="relative overflow-hidden border-2 border-green-500 dark:border-green-600 bg-success-50 dark:bg-success-950/30 shadow-lg shadow-green-500/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-success-500 to-success-600" />
                
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success-100 dark:bg-success-900/50">
                          <CheckCircle2 className="h-6 w-6 text-success-600 dark:text-success-400" />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-semibold text-success-900 dark:text-success-100">
                          Meeting Scheduled! 🎉
                        </h3>
                        
                        <p className="text-success-800 dark:text-success-200">
                          {eventDetails.inviteeName && (
                            <>Thanks, <span className="font-medium">{eventDetails.inviteeName}</span>! </>
                          )}
                          Your meeting has been confirmed.
                        </p>
                        
                        {eventDetails.eventStartTime && (
                          <p className="text-sm text-success-700 dark:text-success-300 flex items-start gap-2 mt-3">
                            <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{formatEventTime(eventDetails.eventStartTime)}</span>
                          </p>
                        )}
                        
                        <div className="pt-3 space-y-1 text-sm text-success-700 dark:text-success-300">
                          <p>✓ Calendar invitation sent to your email</p>
                          <p>✓ You&apos;ll receive reminders before the meeting</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSuccess(false)}
                      className="shrink-0 text-success-600 hover:text-success-700 hover:bg-success-100 dark:text-success-400 dark:hover:bg-success-900/50"
                      aria-label="Close success message"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Header */}
          <div
            className={cn(
              "text-center max-w-3xl mx-auto mb-12 md:mb-16",
              "transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            <Badge variant="primary" size="lg" className="mb-4">
              Get In Touch
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {title}
            </h2>
            
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {/* Calendly Embed */}
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
            <Card className="overflow-hidden">
              <div
                ref={calendlyContainerRef}
                className="calendly-inline-widget"
                data-url={calendlyEmbedUrl}
                style={{
                  minWidth: "320px",
                  height: "700px",
                }}
              />
            </Card>
          </div>

          {/* Additional Info */}
          <div
            className={cn(
              "mt-8 text-center text-sm text-muted-foreground",
              "transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: "400ms",
            }}
          >
            <p>
              Prefer email?{" "}
              <a
                href="mailto:hello@ammly.xyz"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium underline-offset-4 hover:underline"
              >
                hello@ammly.xyz
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
