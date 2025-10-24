"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import Image from "next/image";

/**
 * BlogPostList Props
 */
interface BlogPostListProps {
  /** Array of blog posts to display */
  posts: BlogPost[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * BlogPostCard Component
 * 
 * Individual blog post card with hover effects
 */
interface BlogPostCardProps {
  post: BlogPost;
}

function BlogPostCard({ post }: BlogPostCardProps) {
  const { slug, frontmatter } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="group h-full transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl cursor-pointer">
        {/* Cover Image (if provided) */}
        {frontmatter.coverImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <CardHeader>
          {/* Category Badge */}
          <Badge variant="primary" size="sm" className="w-fit mb-2">
            {frontmatter.category}
          </Badge>

          {/* Title */}
          <CardTitle className="text-xl md:text-2xl group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {frontmatter.title}
          </CardTitle>

          {/* Description */}
          <CardDescription className="line-clamp-3 mt-2">
            {frontmatter.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" size="sm">
                {tag}
              </Badge>
            ))}
            {frontmatter.tags.length > 3 && (
              <Badge variant="outline" size="sm">
                +{frontmatter.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {/* Date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>

            {/* Reading Time */}
            {frontmatter.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{frontmatter.readingTime}</span>
              </div>
            )}
          </div>

          {/* Read More Arrow */}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </CardFooter>
      </Card>
    </Link>
  );
}

/**
 * BlogPostList Component
 * 
 * Displays a grid of blog post cards
 * Responsive: 3 columns desktop, 1 mobile
 */
export function BlogPostList({ posts, className }: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-lg text-muted-foreground">
          No blog posts found. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8", className)}>
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
