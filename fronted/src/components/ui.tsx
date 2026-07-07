import React from 'react';
import { cn } from '../lib/utils';

export function Button({ className, variant = 'primary', size = 'default', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost', size?: 'default' | 'sm' | 'lg' }) {
  const baseStyles = "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    primary: "bg-[var(--color-snow-white)] text-[var(--color-graphite)] border border-white hover:bg-[var(--color-bone)] hover:-translate-y-0.5 shadow-none",
    secondary: "bg-[rgba(212,212,212,0.1)] backdrop-blur-md border border-white/15 text-[var(--color-bone)] hover:bg-white/15 shadow-none",
    outline: "border border-white/15 bg-transparent text-[var(--color-bone)] hover:bg-white/10 shadow-none",
    ghost: "text-[var(--color-ash)] hover:bg-white/10 hover:text-[var(--color-bone)] shadow-none",
  };
  const sizes = {
    default: "h-10 px-5",
    sm: "h-8 px-4 text-xs",
    lg: "h-12 px-8 text-base",
  };
  return <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props} />;
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[24px] border border-white/15 bg-[rgba(212,212,212,0.1)] backdrop-blur-md shadow-none", className)} {...props} />;
}

export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'success' | 'warning' | 'outline' }) {
  const variants = {
    default: "bg-white/10 text-[var(--color-bone)] border border-white/15",
    success: "bg-white/10 text-[var(--color-bone)] border border-white/15",
    warning: "bg-white/10 text-[var(--color-ash)] border border-white/15",
    outline: "border border-white/15 text-[var(--color-ash)] bg-transparent backdrop-blur-sm",
  };
  return <div className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)} {...props} />;
}
