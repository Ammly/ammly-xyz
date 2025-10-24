import { getAllPostSlugs, getPostBySlug, calculateReadingTime, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Twitter, Linkedin, Link2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Import syntax highlighting CSS
import "highlight.js/styles/github-dark.css";

/**
 * MDX Components
 * 
 * Custom components for MDX content
 * Enhances default HTML elements with Tailwind styling
 */
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold tracking-tight mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-bold tracking-tight mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-bold tracking-tight mt-6 mb-3" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-bold tracking-tight mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-lg leading-relaxed mb-4 text-foreground/90" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-lg text-foreground/90" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-4 transition-colors"
      {...props}
    />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary-500 pl-4 italic my-4 text-muted-foreground"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-neutral-900 dark:bg-neutral-950 p-4 rounded-lg overflow-x-auto my-4"
      {...props}
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg my-4 w-full" alt="" {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
};

/**
 * Generate Static Params
 * 
 * Generates static paths for all blog posts at build time
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate Metadata
 * 
 * Generates SEO metadata for each blog post
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    authors: [{ name: post.frontmatter.author }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      images: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [],
    },
  };
}

/**
 * Extract Table of Contents from MDX content
 * Parses h2 and h3 headings for navigation
 */
function extractTableOfContents(content: string): { id: string; title: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: { id: string; title: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    
    toc.push({ id, title, level });
  }

  return toc;
}

/**
 * Get Previous and Next Posts
 */
function getAdjacentPosts(currentSlug: string) {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);
  
  return {
    previous: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
  };
}

/**
 * Blog Post Page
 * 
 * Enhanced template with:
 * - Author info
 * - Social sharing
 * - Table of contents
 * - Previous/next navigation
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const readingTime = frontmatter.readingTime || calculateReadingTime(content);
  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Extract table of contents
  const tableOfContents = extractTableOfContents(content);

  // Get adjacent posts
  const { previous, next } = getAdjacentPosts(slug);

  // Current URL for sharing
  const postUrl = `https://ammly.xyz/blog/${slug}`;
  const shareText = encodeURIComponent(frontmatter.title);
  const shareUrl = encodeURIComponent(postUrl);

  return (
    <article className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            {/* Article Header */}
            <header className="mb-8 space-y-4">
              {/* Category Badge */}
              <Badge variant="primary" size="lg">
                {frontmatter.category}
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {frontmatter.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground">
                {frontmatter.description}
              </p>

              {/* Author & Metadata */}
              <div className="flex items-start gap-4 pt-4 border-t border-border">
                {/* Author Avatar */}
                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                    {frontmatter.author.charAt(0)}
                  </div>
                </div>

                {/* Author Info & Metadata */}
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="font-semibold text-foreground">{frontmatter.author}</div>
                    <div className="text-sm text-muted-foreground">Software Engineer @ Safaricom</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{readingTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {frontmatter.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Social Sharing */}
              <div className="flex items-center gap-2 pt-4 pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground mr-2">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(postUrl)}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                  aria-label="Copy link"
                >
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Cover Image */}
            {frontmatter.coverImage && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
                <Image
                  src={frontmatter.coverImage}
                  alt={frontmatter.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* MDX Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote source={content} components={components} />
            </div>

            {/* Previous/Next Navigation */}
            {(previous || next) && (
              <nav className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Continue Reading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previous && (
                    <Link href={`/blog/${previous.slug}`}>
                      <Card className="h-full p-4 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                          <ArrowLeft className="h-4 w-4" />
                          Previous
                        </div>
                        <h4 className="font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {previous.frontmatter.title}
                        </h4>
                      </Card>
                    </Link>
                  )}
                  {next && (
                    <Link href={`/blog/${next.slug}`}>
                      <Card className="h-full p-4 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1 justify-end">
                          Next
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <h4 className="font-semibold text-right group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {next.frontmatter.title}
                        </h4>
                      </Card>
                    </Link>
                  )}
                </div>
              </nav>
            )}

            {/* Footer */}
            <footer className="mt-8 pt-8 border-t border-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all posts
              </Link>
            </footer>
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                          item.level === 3 ? "pl-4 text-muted-foreground" : "font-medium"
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </Card>
              )}

              {/* Share Card */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share Article
                </h3>
                <div className="space-y-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors w-full"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="text-sm">Share on Twitter</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors w-full"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="text-sm">Share on LinkedIn</span>
                  </a>
                  <button
                    onClick={() => navigator.clipboard.writeText(postUrl)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors w-full text-left"
                  >
                    <Link2 className="h-5 w-5" />
                    <span className="text-sm">Copy Link</span>
                  </button>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
