import React from 'react';

export interface SkeletonProps {
  className?: string;
  rounded?: string;
  id?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  rounded = 'rounded-lg',
  id
}) => {
  return (
    <div
      id={id}
      className={`relative overflow-hidden bg-slate-200/80 dark:bg-slate-800/80 ${rounded} ${className}`}
    >
      {/* Moving shimmer light wave */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 dark:via-cyan-400/10 to-transparent pointer-events-none" />
    </div>
  );
};

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineHeight?: string;
  gap?: string;
  lastLineWidth?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
  lineHeight = 'h-3.5',
  gap = 'space-y-2',
  lastLineWidth = 'w-3/4'
}) => {
  return (
    <div className={`w-full ${gap} ${className}`}>
      {Array.from({ length: lines }).map((_, idx) => {
        const isLast = idx === lines - 1;
        const widthClass = isLast ? lastLineWidth : 'w-full';
        return (
          <Skeleton
            key={idx}
            className={`${lineHeight} ${widthClass}`}
            rounded="rounded-md"
          />
        );
      })}
    </div>
  );
};

export const SkeletonBadge: React.FC<{ className?: string; width?: string }> = ({
  className = '',
  width = 'w-24'
}) => {
  return <Skeleton className={`h-6 ${width} ${className}`} rounded="rounded-full" />;
};

export const SkeletonButton: React.FC<{ className?: string; width?: string }> = ({
  className = '',
  width = 'w-36'
}) => {
  return <Skeleton className={`h-11 ${width} ${className}`} rounded="rounded-full" />;
};

export const SkeletonCard: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div
      className={`p-5 rounded-2xl bg-white/70 dark:bg-[#090D18]/90 border border-slate-200/80 dark:border-slate-800/80 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};
