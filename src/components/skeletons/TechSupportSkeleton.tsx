import React from 'react';
import {
  Skeleton,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonCard
} from './SkeletonBase';

export const TechSupportSkeleton: React.FC = () => {
  return (
    <div className="w-full relative bg-[#07090F] text-slate-200 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] pt-16 sm:pt-20 pb-12 min-h-screen">
      {/* Ambient background glow */}
      <div className="absolute top-16 left-1/3 w-[550px] h-[550px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-10 space-y-10 sm:space-y-14">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER SKELETON */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center justify-center">
            <SkeletonBadge width="w-56" className="h-6" />
          </div>

          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-10 sm:h-12 w-4/5 sm:w-2/3" rounded="rounded-xl" />
            <Skeleton className="h-4 sm:h-5 w-3/4 max-w-lg" rounded="rounded-md" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <SkeletonButton width="w-44" className="h-11" />
            <SkeletonButton width="w-48" className="h-11" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. STATS / SLA HIGHLIGHTS ROW SKELETON */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[0, 1, 2, 3].map((idx) => (
            <SkeletonCard key={idx} className="p-4 flex items-center gap-3">
              <Skeleton className="w-10 h-10 shrink-0" rounded="rounded-xl" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="w-16 h-5" rounded="rounded-md" />
                <Skeleton className="w-24 h-3" rounded="rounded-sm" />
              </div>
            </SkeletonCard>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 3. CATEGORY TABS SKELETON */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <Skeleton className="h-7 w-48" rounded="rounded-lg" />
            <Skeleton className="h-3.5 w-64" rounded="rounded-sm" />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['w-16', 'w-20', 'w-20', 'w-20', 'w-20'].map((w, idx) => (
              <Skeleton key={idx} className={`h-8 ${w}`} rounded="rounded-lg" />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. 6-CARD SERVICES GRID SKELETON */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 text-left">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <SkeletonCard key={idx} className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="w-10 h-10" rounded="rounded-xl" />
                  <SkeletonBadge width="w-20" className="h-5" />
                </div>
                <Skeleton className="w-48 h-5" rounded="rounded-md" />
                <SkeletonText lines={2} lineHeight="h-3" lastLineWidth="w-4/5" />

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-3.5 h-3.5 shrink-0" rounded="rounded-full" />
                    <Skeleton className="w-3/4 h-3" rounded="rounded-sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-3.5 h-3.5 shrink-0" rounded="rounded-full" />
                    <Skeleton className="w-2/3 h-3" rounded="rounded-sm" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <Skeleton className="w-full h-9" rounded="rounded-xl" />
              </div>
            </SkeletonCard>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 5. REMOTE ASSISTANCE / EMERGENCY BANNER SKELETON */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-left">
          <div className="space-y-2.5 max-w-2xl">
            <Skeleton className="h-7 w-64" rounded="rounded-lg" />
            <SkeletonText lines={2} lineHeight="h-3.5" lastLineWidth="w-4/5" />
          </div>
          <div className="flex flex-wrap gap-3">
            <SkeletonButton width="w-40" className="h-11" />
            <SkeletonButton width="w-44" className="h-11" />
          </div>
        </div>
      </div>
    </div>
  );
};
