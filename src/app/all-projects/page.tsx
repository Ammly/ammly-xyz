import { getAllVentures } from "@/lib/ventures";
import { VentureCard } from "@/components/ui/venture-card";
import { Badge } from "@/components/ui/badge";
import type { Venture } from "@/types/venture";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

export default function AllProjectsPage() {
  // Load all ventures from MDX
  const mdxVentures = getAllVentures();
  const ventures = mdxVentures.map(convertMdxVenture);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-linear-to-b from-background via-muted/30 to-background py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          {/* Page Header */}
          <div className="text-center">
            <Badge variant="primary" size="lg" className="mb-4">
              Portfolio
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              All AI Ventures
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore all {ventures.length} AI-powered projects building solutions for African markets
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ventures.map((venture) => (
              <VentureCard key={venture.id} venture={venture} />
            ))}
          </div>

          {/* Empty State */}
          {ventures.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
