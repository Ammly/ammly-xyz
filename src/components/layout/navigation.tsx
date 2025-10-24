"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";

/**
 * Navigation Link Interface
 * 
 * Defines the structure for navigation items
 * TypeScript ensures all links have required properties
 */
interface NavLink {
  label: string;
  href: string;
  /** Optional: External link opens in new tab */
  external?: boolean;
}

/**
 * Navigation Props
 * 
 * Configurable navigation with sensible defaults
 */
interface NavigationProps {
  /** Brand name/logo text */
  brandName?: string;
  /** Navigation links array */
  links?: NavLink[];
  /** Custom logo component (overrides brandName) */
  logo?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Default navigation links
 * Smooth scroll anchors for single-page applications
 */
const defaultLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/**
 * Navigation Component
 * 
 * Features:
 * 1. Responsive: Desktop horizontal menu, mobile hamburger
 * 2. Scroll-based transparency: Becomes opaque on scroll
 * 3. Dark mode toggle: Uses class-based dark mode strategy
 * 4. Smooth scroll: Animated anchor navigation
 * 5. Accessible: ARIA labels, keyboard navigation
 */
export function Navigation({
  brandName = "Ammly",
  links = defaultLinks,
  logo,
  className,
}: NavigationProps) {
  /** Mobile menu open/close state */
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  /** Dark mode state - reads from localStorage on mount */
  const [darkMode, setDarkMode] = React.useState(false);
  
  /** 
   * Scroll position state for transparency effect
   * true = scrolled down (opaque background)
   * false = at top (transparent background)
   */
  const [isScrolled, setIsScrolled] = React.useState(false);

  /**
   * SCROLL POSITION DETECTION LOGIC
   * 
   * useEffect hook monitors window scroll events
   * Updates state when scroll position crosses threshold
   * 
   * How it works:
   * 1. Attach scroll event listener on component mount
   * 2. On each scroll, check if scrollY > 10px
   * 3. Update state only if value changed (prevents unnecessary re-renders)
   * 4. Cleanup listener on unmount (prevent memory leaks)
   * 
   * Performance optimization:
   * - Uses passive listener (better scroll performance)
   * - State update only when threshold crossed (not on every pixel)
   * - Single event listener for entire component
   */
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const threshold = 10; // Pixels from top before triggering effect
      
      // Only update state if crossing threshold
      // Prevents re-renders on small scroll movements
      if (scrollTop > threshold && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollTop <= threshold && isScrolled) {
        setIsScrolled(false);
      }
    };

    // Initial check in case page loads scrolled down
    handleScroll();

    // Add scroll listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup function runs on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]); // Re-run only when isScrolled changes

  /**
   * DARK MODE INITIALIZATION
   * 
   * Reads dark mode preference from:
   * 1. localStorage (user's previous choice)
   * 2. System preference (prefers-color-scheme)
   * 
   * Applies dark class to document root
   */
  React.useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    
    // Check system preference if no saved preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  /**
   * Toggle dark mode
   * Persists preference to localStorage
   */
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  /**
   * Smooth scroll to anchor
   * 
   * Native smooth scroll behavior for internal links
   * Closes mobile menu after navigation
   */
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle internal anchor links
    if (href.startsWith("#")) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      
      // Close mobile menu after navigation
      setMobileMenuOpen(false);
    }
  };

  /**
   * Close mobile menu when clicking outside
   */
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={cn(
        // Base styles
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Scroll-based transparency effect
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Brand Name */}
          <div className="shrink-0">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center space-x-2 text-xl md:text-2xl font-bold text-foreground hover:text-primary-600 transition-colors"
            >
              {logo || brandName}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "px-4 py-2 rounded-base text-sm font-medium transition-colors",
                  "text-foreground/80 hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Dark mode toggle + Mobile menu button */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-full"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden rounded-full"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-4 pt-2 pb-6 space-y-1 bg-background border-b border-border shadow-lg">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "block px-4 py-3 rounded-base text-base font-medium transition-colors",
                  "text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
