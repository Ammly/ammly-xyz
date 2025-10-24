"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

interface BlogSectionClientProps {
  posts: BlogPost[];
  totalPosts: number;
}

/**
 * Blog Section Client Component
 * 
 * Displays recent blog posts with animations
 */
export function BlogSectionClient({ posts, totalPosts }: BlogSectionClientProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  /**
   * Intersection Observer for scroll animations
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
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 md:mb-16",
            "transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Badge variant="primary" size="lg" className="mb-4">
            Latest Articles
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            From the Blog
          </h2>

          <p className="text-lg text-muted-foreground">
            Insights, tutorials, and stories from building scalable solutions
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div
                className={cn(
                  "transition-all duration-700 ease-out",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: `${(index + 1) * 100}ms`,
                }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  {/* Cover Image Header */}
                  {post.frontmatter.coverImage ? (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.frontmatter.coverImage}
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Category Badge on Image */}
                      <div className="absolute top-3 left-3">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-white/20">
                          {post.frontmatter.category}
                        </Badge>
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white line-clamp-2 drop-shadow-lg">
                          {post.frontmatter.title}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    // Fallback gradient with icon if no cover image
                    <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-primary-500/20 via-primary-600/30 to-primary-700/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-primary-600/30 dark:text-primary-400/30" />
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                          {post.frontmatter.category}
                        </Badge>
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white line-clamp-2 drop-shadow-lg">
                          {post.frontmatter.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  <CardContent className="p-6 flex flex-col">
                    {/* Description */}
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.frontmatter.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.frontmatter.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.frontmatter.readingTime}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium group-hover:gap-3 transition-all">
                      <span>Read article</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        {totalPosts > 3 && (
          <div
            className={cn(
              "text-center transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: "400ms",
            }}
          >
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View all {totalPosts} articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
