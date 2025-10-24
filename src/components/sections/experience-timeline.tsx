import { getAllExperiences } from "@/lib/experiences";
import type { Experience } from "@/types/experience";
import { ExperienceTimelineClient } from "./experience-timeline-client";

/**
 * ExperienceTimeline Props
 */
interface ExperienceTimelineProps {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Convert MDX experience to component experience format
 */
function convertMdxExperience(mdxExp: ReturnType<typeof getAllExperiences>[number]): Experience {
  return {
    id: mdxExp.slug,
    title: mdxExp.frontmatter.title,
    company: mdxExp.frontmatter.company,
    startDate: mdxExp.frontmatter.startDate,
    endDate: mdxExp.frontmatter.endDate,
    current: mdxExp.frontmatter.current,
    description: mdxExp.frontmatter.description,
    achievements: mdxExp.frontmatter.achievements,
    technologies: mdxExp.frontmatter.technologies,
  };
}

/**
 * ExperienceTimeline Component (Server Component)
 * 
 * Loads experiences from MDX files and passes to client component for animations
 */
export function ExperienceTimeline({
  title,
  subtitle,
  className,
}: ExperienceTimelineProps) {
  // Load experiences from MDX (server-side)
  const mdxExperiences = getAllExperiences();
  const experiences = mdxExperiences.map(convertMdxExperience);

  return (
    <ExperienceTimelineClient
      title={title}
      subtitle={subtitle}
      experiences={experiences}
      className={className}
    />
  );
}
