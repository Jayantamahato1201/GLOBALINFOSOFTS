import React from 'react';
import { PageId } from '../../types';
import { AboutSkeleton } from './AboutSkeleton';
import { PricingSkeleton } from './PricingSkeleton';
import { TechSupportSkeleton } from './TechSupportSkeleton';
import {
  Skeleton,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonCard
} from './SkeletonBase';

interface SectionSkeletonProps {
  page?: PageId;
  variant?: 'about' | 'pricing' | 'support' | 'generic' | 'cards' | 'article';
}

export const GenericPageSkeleton: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-20 pb-12 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-8 min-h-screen">
      {/* Header Banner */}
      <div className="space-y-3 max-w-2xl text-left">
        <SkeletonBadge width="w-36" />
        <Skeleton className="h-9 sm:h-11 w-4/5" rounded="rounded-xl" />
        <SkeletonText lines={2} lineHeight="h-4" lastLineWidth="w-3/5" />
      </div>

      {/* Filter / Action bar */}
      <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {['w-20', 'w-28', 'w-24', 'w-32'].map((w, idx) => (
            <Skeleton key={idx} className={`h-8 ${w}`} rounded="rounded-lg" />
          ))}
        </div>
        <Skeleton className="w-56 h-8 hidden md:block" rounded="rounded-lg" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <SkeletonCard key={idx} className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="w-10 h-10" rounded="rounded-xl" />
              <SkeletonBadge width="w-20" />
            </div>
            <Skeleton className="w-3/4 h-5" rounded="rounded-md" />
            <SkeletonText lines={3} lineHeight="h-3.5" lastLineWidth="w-2/3" />
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex gap-1">
                <Skeleton className="w-12 h-4" rounded="rounded-sm" />
                <Skeleton className="w-14 h-4" rounded="rounded-sm" />
              </div>
              <Skeleton className="w-24 h-4" rounded="rounded-sm" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  );
};

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({
  page,
  variant
}) => {
  if (page === 'about' || variant === 'about') {
    return <AboutSkeleton />;
  }

  if (page === 'pricing' || variant === 'pricing') {
    return <PricingSkeleton />;
  }

  if (page === 'support' || variant === 'support') {
    return <TechSupportSkeleton />;
  }

  return <GenericPageSkeleton />;
};
