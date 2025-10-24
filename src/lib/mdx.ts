import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogFrontmatter } from "@/types/blog";

// Blog posts directory
const POSTS_PATH = path.join(process.cwd(), "content/blog");

/**
 * Get all blog post slugs
 * 
 * Reads the blog directory and returns all MDX file slugs
 */
export function getAllPostSlugs(): string[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(POSTS_PATH)) {
    fs.mkdirSync(POSTS_PATH, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(POSTS_PATH);
  
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get blog post by slug
 * 
 * Reads MDX file and parses frontmatter
 * 
 * @param slug - Post slug (filename without extension)
 * @returns Blog post with frontmatter and content
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(POSTS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    
    // Parse frontmatter using gray-matter
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts
 * 
 * Returns all posts sorted by date (newest first)
 * Optionally filters by published status
 * 
 * @param includeUnpublished - Whether to include unpublished posts
 * @returns Array of blog posts
 */
export function getAllPosts(includeUnpublished = false): BlogPost[] {
  const slugs = getAllPostSlugs();
  
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => includeUnpublished || post.frontmatter.published !== false)
    .sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
  
  return posts;
}

/**
 * Get posts by category
 * 
 * @param category - Category to filter by
 * @returns Array of posts in the category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(
    (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get posts by tag
 * 
 * @param tag - Tag to filter by
 * @returns Array of posts with the tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Calculate reading time
 * 
 * Estimates reading time based on word count
 * Average reading speed: 200 words per minute
 * 
 * @param content - MDX content string
 * @returns Reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min read`;
}
