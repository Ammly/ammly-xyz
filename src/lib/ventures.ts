import fs from "fs";
import path from "path";
import matter from "gray-matter";

const venturesDirectory = path.join(process.cwd(), "content/ventures");

export interface VentureFrontmatter {
  title: string;
  description: string;
  icon: string;
  status: "building" | "live" | "concept";
  github?: string;
  demo?: string;
  link?: string;
  technologies: string[];
  featured?: boolean;
  order?: number;
  coverImage?: string;
  screenshots?: string[];
  metrics?: {
    [key: string]: string | number;
  };
}

export interface Venture {
  slug: string;
  frontmatter: VentureFrontmatter;
  content: string;
}

/**
 * Get all venture slugs
 */
export function getAllVentureSlugs(): string[] {
  if (!fs.existsSync(venturesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(venturesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

/**
 * Get a single venture by slug
 */
export function getVentureBySlug(slug: string): Venture | null {
  try {
    const fullPath = path.join(venturesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as VentureFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading venture ${slug}:`, error);
    return null;
  }
}

/**
 * Get all ventures, sorted by order or date
 */
export function getAllVentures(): Venture[] {
  const slugs = getAllVentureSlugs();
  const ventures = slugs
    .map((slug) => getVentureBySlug(slug))
    .filter((venture): venture is Venture => venture !== null)
    .sort((a, b) => {
      // Sort by order if specified, otherwise alphabetically
      const orderA = a.frontmatter.order ?? 999;
      const orderB = b.frontmatter.order ?? 999;
      return orderA - orderB;
    });

  return ventures;
}

/**
 * Get featured ventures only
 */
export function getFeaturedVentures(): Venture[] {
  return getAllVentures().filter(
    (venture) => venture.frontmatter.featured === true
  );
}
