"use client";

import { Twitter, Linkedin, Link2 } from "lucide-react";

interface ShareButtonsProps {
  postUrl: string;
  shareText: string;
  shareUrl: string;
  variant?: "inline" | "card";
}

export function ShareButtons({ postUrl, shareText, shareUrl, variant = "inline" }: ShareButtonsProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
  };

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2 pt-4 pb-4 border-b border-border">
        <span className="text-sm text-muted-foreground mr-2">Share:</span>
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          aria-label="Copy link"
        >
          <Link2 className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors w-full"
      >
        <Twitter className="h-5 w-5" />
        <span className="text-sm">Share on Twitter</span>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors w-full"
      >
        <Linkedin className="h-5 w-5" />
        <span className="text-sm">Share on LinkedIn</span>
      </a>
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors w-full text-left"
      >
        <Link2 className="h-5 w-5" />
        <span className="text-sm">Copy Link</span>
      </button>
    </div>
  );
}
