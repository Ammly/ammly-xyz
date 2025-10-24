import { getAllPosts } from "@/lib/mdx";
import { BlogSectionClient } from "@/components/sections/blog-section-client";

/**
 * Blog Section (Server Component)
 * 
 * Loads blog posts from MDX files and passes to client component
 */
export async function BlogSection() {
  const allPosts = getAllPosts();
  
  // Get 3 most recent posts
  const recentPosts = allPosts.slice(0, 3);

  return <BlogSectionClient posts={recentPosts} totalPosts={allPosts.length} />;
}
