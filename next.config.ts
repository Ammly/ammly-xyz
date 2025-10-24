import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Configure remote image sources
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    rehypePlugins: [
      "rehype-highlight", // Syntax highlighting for code blocks
      "rehype-slug", // Add IDs to headings
      ["rehype-autolink-headings", { behavior: "wrap" }], // Add anchor links to headings
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
