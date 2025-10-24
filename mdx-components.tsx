import type { MDXComponents } from "mdx/types";

/**
 * MDX Components Configuration
 * 
 * This file exports custom components used across all MDX content
 * Enhances default HTML elements with Tailwind styling
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => (
      <h1 className="text-4xl font-bold tracking-tight mt-8 mb-4" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-3xl font-bold tracking-tight mt-8 mb-4" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-2xl font-bold tracking-tight mt-6 mb-3" {...props} />
    ),
    p: (props) => (
      <p className="text-lg leading-relaxed mb-4 text-foreground/90" {...props} />
    ),
    a: (props) => (
      <a
        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-4"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="bg-neutral-900 dark:bg-neutral-950 p-4 rounded-lg overflow-x-auto my-4"
        {...props}
      />
    ),
  };
}
