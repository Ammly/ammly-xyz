/**
 * Experience Interface
 * 
 * Type definition for professional work experience
 */
export interface Experience {
  /** Unique identifier */
  id: string;
  
  /** Job title */
  title: string;
  
  /** Company name */
  company: string;
  
  /** Start date (formatted string) */
  startDate: string;
  
  /** End date (formatted string or "Present") */
  endDate: string;
  
  /** Whether this is the current role */
  current: boolean;
  
  /** Role description and achievements */
  description: string;
  
  /** Key achievements (bullet points) */
  achievements?: string[];
  
  /** Technology stack used */
  technologies: string[];
  
  /** Optional: Company logo or icon */
  icon?: string;
}
