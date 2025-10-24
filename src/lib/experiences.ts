import fs from "fs";
import path from "path";
import matter from "gray-matter";

const experiencesDirectory = path.join(process.cwd(), "content/experiences");

export interface ExperienceFrontmatter {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  order?: number;
}

export interface Experience {
  slug: string;
  frontmatter: ExperienceFrontmatter;
  content: string;
}

/**
 * Get all experience slugs
 */
export function getAllExperienceSlugs(): string[] {
  if (!fs.existsSync(experiencesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(experiencesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

/**
 * Get a single experience by slug
 */
export function getExperienceBySlug(slug: string): Experience | null {
  try {
    const fullPath = path.join(experiencesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as ExperienceFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading experience ${slug}:`, error);
    return null;
  }
}

/**
 * Get all experiences, sorted by date (most recent first)
 */
export function getAllExperiences(): Experience[] {
  const slugs = getAllExperienceSlugs();
  const experiences = slugs
    .map((slug) => getExperienceBySlug(slug))
    .filter((exp): exp is Experience => exp !== null)
    .sort((a, b) => {
      // Sort by order if specified
      if (a.frontmatter.order !== undefined && b.frontmatter.order !== undefined) {
        return a.frontmatter.order - b.frontmatter.order;
      }
      // Current roles first
      if (a.frontmatter.current && !b.frontmatter.current) return -1;
      if (!a.frontmatter.current && b.frontmatter.current) return 1;
      return 0;
    });

  return experiences;
}
