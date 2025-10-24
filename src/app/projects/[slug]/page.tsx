import { getAllVentures, getVentureBySlug } from "@/lib/ventures";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, TrendingUp, Zap, Users } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { statusConfig } from "@/types/venture";

/**
 * Generate static paths for all ventures
 */
export async function generateStaticParams() {
  const ventures = getAllVentures();
  return ventures.map((venture) => ({
    slug: venture.slug,
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);
  
  if (!venture) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${venture.frontmatter.title} | Ammly XYZ`,
    description: venture.frontmatter.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);

  if (!venture) {
    notFound();
  }

  const statusInfo = statusConfig[venture.frontmatter.status];

  // Get metrics for display
  const metrics = Object.entries(venture.frontmatter.metrics || {}).map(([key, value]) => {
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    const iconMapping: Record<string, typeof TrendingUp> = {
      users: Users,
      accuracy: TrendingUp,
      speed: Zap,
      farmers: Users,
      consultations: Users,
      students: Users,
      improvement: TrendingUp,
    };
    const Icon = iconMapping[key.toLowerCase()] || TrendingUp;
    
    return { label, value: String(value), Icon };
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Cover Image */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-linear-to-br from-primary-500/20 to-primary-600/30">
        {venture.frontmatter.coverImage && (
          <>
            <Image
              src={venture.frontmatter.coverImage}
              alt={venture.frontmatter.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
          </>
        )}

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-10">
          <Link href="/#projects">
            <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>

        {/* Project Title & Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto max-w-5xl">
            <Badge variant={statusInfo.variant} size="lg" className="mb-4">
              {statusInfo.label}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {venture.frontmatter.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              {venture.frontmatter.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Metrics */}
            {metrics.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    {metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <metric.Icon className="h-4 w-4" />
                          <span className="text-sm">{metric.label}</span>
                        </div>
                        <span className="text-lg font-semibold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tech Stack */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {venture.frontmatter.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="bg-muted/50">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardContent className="p-6 space-y-3">
                {venture.frontmatter.link && (
                  <a href={venture.frontmatter.link} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live Project
                    </Button>
                  </a>
                )}
                {venture.frontmatter.github && (
                  <a href={venture.frontmatter.github} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" size="sm" className="w-full">
                      <Github className="h-4 w-4 mr-2" />
                      View Source Code
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote source={venture.content} />
            </article>

            {/* Screenshots Gallery */}
            {venture.frontmatter.screenshots && venture.frontmatter.screenshots.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venture.frontmatter.screenshots.map((screenshot, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border">
                      <Image
                        src={screenshot}
                        alt={`${venture.frontmatter.title} screenshot ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
