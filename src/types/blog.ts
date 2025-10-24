/**
 * Blog Post Interface
 * 
 * Type definition for blog post metadata and content
 */
export interface BlogPost {
  /** Post slug (URL identifier) */
  slug: string;
  
  /** Frontmatter metadata */
  frontmatter: BlogFrontmatter;
  
  /** Raw MDX content */
  content: string;
}

/**
 * Blog Frontmatter Interface
 * 
 * Metadata extracted from MDX frontmatter
 */
export interface BlogFrontmatter {
  /** Post title */
  title: string;
  
  /** Post description/excerpt */
  description: string;
  
  /** Publication date (ISO string) */
  date: string;
  
  /** Post author */
  author: string;
  
  /** Category/topic */
  category: string;
  
  /** Tags for filtering */
  tags: string[];
  
  /** Cover image URL */
  coverImage?: string;
  
  /** Reading time in minutes */
  readingTime?: string;
  
  /** Whether post is published */
  published?: boolean;
}
