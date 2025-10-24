import { getAllPosts } from "@/lib/mdx";
import { BlogPostList } from "@/components/ui/blog-post-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Ammly XYZ",
  description: "Thoughts on AI, software development, and building products",
};

/**
 * Blog Index Page
 * 
 * Lists all published blog posts
 */
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <Link href="/#blog" className="inline-block mb-8">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="primary" size="lg" className="mb-4">
            Blog
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Thoughts & Insights
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring AI, software engineering, and building products that matter
          </p>
        </div>

        {/* Blog Posts Grid */}
        <BlogPostList posts={posts} />
      </div>
    </main>
  );
}
