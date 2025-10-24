/**
 * Venture Data Interface
 * 
 * Comprehensive type definition for AI venture projects
 * Ensures type safety across components
 */
export interface Venture {
  /** Unique identifier for the venture */
  id: string;
  
  /** Project name */
  name: string;
  
  /** Brief description of the venture */
  description: string;
  
  /** Icon identifier (lucide-react icon name or component) */
  icon: string;
  
  /** Current development status */
  status: VentureStatus;
  
  /** Project metrics and statistics */
  metrics: VentureMetrics;
  
  /** Technology stack used */
  technologies: string[];
  
  /** Optional: Cover image for the project card */
  coverImage?: string;
  
  /** Optional: Array of screenshot URLs */
  screenshots?: string[];
  
  /** Optional: Link to project */
  link?: string;
  
  /** Optional: GitHub repository */
  github?: string;
}

/**
 * Venture Status Type
 * 
 * Discriminated union for type-safe status handling
 */
export type VentureStatus = "building" | "concept" | "research" | "live";

/**
 * Venture Metrics Interface
 * 
 * Quantifiable project achievements
 */
export interface VentureMetrics {
  /** Number of users/customers */
  users?: string;
  
  /** Accuracy/performance metric */
  accuracy?: string;
  
  /** Processing speed or time saved */
  speed?: string;
  
  /** Cost reduction or savings */
  savings?: string;
  
  /** Custom metric label */
  customLabel?: string;
  
  /** Custom metric value */
  customValue?: string;
}

/**
 * Status Configuration
 * 
 * Maps status to badge variant for consistent styling
 */
export const statusConfig: Record<VentureStatus, {
  variant: "success" | "warning" | "primary" | "default";
  label: string;
}> = {
  building: {
    variant: "warning",
    label: "Building",
  },
  concept: {
    variant: "primary",
    label: "Concept",
  },
  research: {
    variant: "default",
    label: "Research",
  },
  live: {
    variant: "success",
    label: "Live",
  },
};
