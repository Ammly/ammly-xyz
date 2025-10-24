"use client";

import * as React from "react";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Scale, 
  Wallet, 
  Church, 
  ExternalLink, 
  TrendingUp,
  Zap,
  Users,
  Leaf,
  Heart,
  BookOpen
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Venture } from "@/types/venture";
import { statusConfig } from "@/types/venture";

/**
 * Icon Map
 * 
 * Maps string identifiers to Lucide React components
 * Enables dynamic icon rendering from data
 */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  scale: Scale,
  wallet: Wallet,
  church: Church,
  trending: TrendingUp,
  zap: Zap,
  users: Users,
  leaf: Leaf,
  heart: Heart,
  book: BookOpen,
};

/**
 * VentureCard Props Interface
 */
interface VentureCardProps {
  venture: Venture;
  /** Additional CSS classes */
  className?: string;
}

/**
 * VentureCard Component
 * Displays information about a single venture project
 */
export function VentureCard({ venture, className }: VentureCardProps) {
  const Icon = iconMap[venture.icon] || Scale;
  const statusInfo = statusConfig[venture.status];

  /**
   * Extract first 3 metrics for display
   * Dynamically reads all metric keys from the venture object
   */
  const displayMetrics = React.useMemo(() => {
    const metrics = [];
    
    // Map of common metric keys to icons
    const iconMapping: Record<string, React.ComponentType<{ className?: string }>> = {
      users: Users,
      accuracy: TrendingUp,
      speed: Zap,
      savings: TrendingUp,
      farmers: Users,
      consultations: Users,
      students: Users,
      improvement: TrendingUp,
      yield: TrendingUp,
      response: Zap,
      subjects: TrendingUp,
    };
    
    // Convert all metrics to display format
    Object.entries(venture.metrics).forEach(([key, value]) => {
      // Skip customLabel/customValue (legacy format)
      if (key === 'customLabel' || key === 'customValue') return;
      
      // Capitalize first letter of key for label
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      const icon = iconMapping[key.toLowerCase()] || TrendingUp;
      
      metrics.push({ 
        label, 
        value: String(value),
        icon 
      });
    });
    
    // Handle legacy customLabel/customValue format
    if (venture.metrics.customLabel && venture.metrics.customValue) {
      metrics.push({ 
        label: String(venture.metrics.customLabel), 
        value: String(venture.metrics.customValue),
        icon: TrendingUp 
      });
    }
    
    return metrics.slice(0, 3); // Max 3 metrics
  }, [venture.metrics]);

  return (
    <Link href={`/projects/${venture.id}`}>
      <Card
        className={cn(
          // Base styles
          "group relative overflow-hidden cursor-pointer",
          // Hover animation - GPU-accelerated transform
          "transition-all duration-300 ease-out",
          "hover:scale-[1.02] hover:-translate-y-1",
          // Shadow progression for depth
          "hover:shadow-xl",
          className
        )}
      >
        {/* Cover Image or Gradient Background */}
        {venture.coverImage ? (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={venture.coverImage}
              alt={venture.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Status Badge on Image */}
            <div className="absolute top-4 right-4 z-10">
              <Badge variant={statusInfo.variant} size="sm">
                {statusInfo.label}
              </Badge>
            </div>

            {/* Project Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300">
                {venture.name}
              </h3>
            </div>
          </div>
        ) : (
          // Fallback: Gradient with Icon
          <div className="relative h-48 w-full bg-linear-to-br from-primary-500/20 to-primary-600/30 dark:from-primary-900/30 dark:to-primary-800/40">
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="h-24 w-24 text-primary-600/30 dark:text-primary-400/30" />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge variant={statusInfo.variant} size="sm">
                {statusInfo.label}
              </Badge>
            </div>

            {/* Project Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300">
                {venture.name}
              </h3>
            </div>
          </div>
        )}

        <CardHeader>
          {/* Description */}
          <CardDescription className="line-clamp-2">
            {venture.description}
          </CardDescription>
        </CardHeader>

      <CardContent>
        {/* Metrics Display */}
        {displayMetrics.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {displayMetrics.map((metric, index) => {
              const MetricIcon = metric.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <MetricIcon className="h-3 w-3" />
                    <span className="text-xs">{metric.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {metric.value}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Technology Stack */}
        <div className="flex flex-wrap gap-2">
          {venture.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {venture.technologies.length > 4 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
              +{venture.technologies.length - 4}
            </span>
          )}
        </div>
      </CardContent>

      {/* Action Buttons - appear on hover */}
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          View Details
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
    </Link>
  );
}
