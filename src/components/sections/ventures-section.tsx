import { getAllVentures } from "@/lib/ventures";
import type { Venture } from "@/types/venture";
import { VenturesSectionClient } from "./ventures-section-client";

/**
 * Ventures Section Props
 */
interface VenturesSectionProps {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Convert MDX venture to component venture format
 */
function convertMdxVenture(mdxVenture: ReturnType<typeof getAllVentures>[number]): Venture {
  return {
    id: mdxVenture.slug,
    name: mdxVenture.frontmatter.title,
    description: mdxVenture.frontmatter.description,
    icon: mdxVenture.frontmatter.icon,
    status: mdxVenture.frontmatter.status,
    metrics: mdxVenture.frontmatter.metrics || {},
    technologies: mdxVenture.frontmatter.technologies,
    coverImage: mdxVenture.frontmatter.coverImage,
    screenshots: mdxVenture.frontmatter.screenshots,
    link: mdxVenture.frontmatter.link,
    github: mdxVenture.frontmatter.github,
  };
}

/**
 * VenturesSection Component (Server Component)
 * 
 * Loads ventures from MDX files and passes to client component for animations
 */
export function VenturesSection({
  title,
  subtitle,
  className,
}: VenturesSectionProps) {
  // Load ventures from MDX (server-side)
  const mdxVentures = getAllVentures();
  const ventures = mdxVentures.map(convertMdxVenture);

  return (
    <VenturesSectionClient
      title={title}
      subtitle={subtitle}
      ventures={ventures}
      className={className}
    />
  );
}
