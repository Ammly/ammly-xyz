"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Briefcase, Calendar } from "lucide-react";
import type { Experience } from "@/types/experience";

/**
 * ExperienceTimeline Props
 */
interface ExperienceTimelineClientProps {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Array of experience items */
  experiences: Experience[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * ExperienceItem Component
 * 
 * Individual timeline item with connecting line
 */
interface ExperienceItemProps {
  experience: Experience;
  isLast: boolean;
  index: number;
  isVisible: boolean;
}

function ExperienceItem({ experience, isLast, index, isVisible }: ExperienceItemProps) {
  return (
    <div className="relative flex gap-6 md:gap-8">
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center">
        {/* Timeline Dot */}
        <div
          className={cn(
            "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-background shadow-md transition-all duration-500",
            experience.current
              ? "bg-primary-500 ring-4 ring-primary-500/20"
              : "bg-muted"
          )}
        >
          <Briefcase
            className={cn(
              "h-5 w-5 transition-colors duration-500",
              experience.current ? "text-white" : "text-muted-foreground"
            )}
          />
        </div>

        {/* Connecting Line */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-linear-to-b from-border to-transparent min-h-full" />
        )}
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-12 md:pb-16">
        <Card
          className={cn(
            "transition-all duration-700 ease-out",
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          )}
          style={{
            transitionDelay: `${index * 150}ms`,
          }}
        >
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              {/* Date Range */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {experience.startDate} - {experience.endDate}
                </span>
              </div>

              {/* Current Badge */}
              {experience.current && (
                <Badge variant="success" size="sm" dot dotColor="#10b981">
                  Current
                </Badge>
              )}
            </div>

            <CardTitle className="text-xl md:text-2xl">
              {experience.title}
            </CardTitle>

            <CardDescription className="text-base font-medium text-foreground/80">
              {experience.company}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {experience.description}
            </p>

            {/* Achievements */}
            {experience.achievements && experience.achievements.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Key Achievements:
                </h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary-500 mt-1 shrink-0">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">
                Tech Stack:
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * ExperienceTimelineClient Component
 * 
 * Client component handling animations and interactions
 */
export function ExperienceTimelineClient({
  title = "Work Experience",
  subtitle = "Building scalable systems and leading technical initiatives",
  experiences,
  className,
}: ExperienceTimelineClientProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  /**
   * Intersection Observer for scroll-in animation
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
      id="experience"
      className={cn(
        "relative py-20 md:py-32 px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-12 md:mb-16 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Badge variant="primary" size="lg" className="mb-4">
            Career
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceItem
              key={experience.id}
              experience={experience}
              isLast={index === experiences.length - 1}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
