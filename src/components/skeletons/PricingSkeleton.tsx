import React from 'react';
import {
  Skeleton,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonCard
} from './SkeletonBase';

export const PricingSkeleton: React.FC = () => {
  return (
    <div className="w-full relative bg-[#07090F] text-slate-200 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] pt-16 sm:pt-20 pb-12 min-h-screen">
      {/* Ambient background glow matching PricingPage */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-10 space-y-10 sm:space-y-14">
        {/* ========================================================================= */}
        {/* 1. HERO & CATEGORY SWITCHER SKELETON */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center justify-center">
            <SkeletonBadge width="w-44" className="h-6" />
          </div>

          <div className="space-y-2.5 flex flex-col items-center">
            <Skeleton className="h-10 sm:h-12 w-4/5 sm:w-3/5" rounded="rounded-xl" />
            <Skeleton className="h-4 sm:h-5 w-3/4 max-w-lg" rounded="rounded-md" />
          </div>

          {/* 3 Category Selector Tabs Skeleton */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <Skeleton className="w-36 h-10" rounded="rounded-xl" />
            <Skeleton className="w-40 h-10" rounded="rounded-xl" />
            <Skeleton className="w-36 h-10" rounded="rounded-xl" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. PLANS SUBHEADER & CURRENCY SWITCHER SKELETON */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-56" rounded="rounded-lg" />
              <Skeleton className="h-4 w-72" rounded="rounded-md" />
            </div>

            {/* Currency Pill */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0B0F19]/90 border border-slate-800">
              <Skeleton className="w-16 h-7" rounded="rounded-lg" />
              <Skeleton className="w-16 h-7" rounded="rounded-lg" />
            </div>
          </div>

          {/* 4 Pricing Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {[0, 1, 2, 3].map((cardIdx) => {
              const isPro = cardIdx === 1;
              return (
                <div
                  key={cardIdx}
                  className={`p-6 rounded-2xl flex flex-col justify-between border relative overflow-hidden ${
                    isPro
                      ? 'bg-gradient-to-b from-[#11192e] to-[#0a0f1c] border-cyan-500/50 shadow-xl'
                      : 'bg-[#0B0F19]/90 border-slate-800/80'
                  }`}
                >
                  {isPro && (
                    <div className="absolute top-0 right-0">
                      <Skeleton className="w-24 h-6" rounded="rounded-bl-xl" />
                    </div>
                  )}

                  <div className="space-y-5 text-left">
                    {/* Icon & Plan Name */}
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 shrink-0" rounded="rounded-xl" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="w-24 h-5" rounded="rounded-md" />
                        <Skeleton className="w-16 h-3" rounded="rounded-sm" />
                      </div>
                    </div>

                    {/* Price Tag */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <Skeleton className="w-28 h-9" rounded="rounded-lg" />
                        <Skeleton className="w-14 h-4" rounded="rounded-sm" />
                      </div>
                      <Skeleton className="w-36 h-3" rounded="rounded-sm" />
                    </div>

                    <SkeletonText lines={2} lineHeight="h-3" lastLineWidth="w-4/5" />

                    {/* Features Checklist */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                      {[0, 1, 2, 3, 4, 5].map((itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2.5">
                          <Skeleton className="w-4 h-4 shrink-0" rounded="rounded-full" />
                          <Skeleton
                            className={`h-3 ${
                              itemIdx % 2 === 0 ? 'w-4/5' : 'w-3/5'
                            }`}
                            rounded="rounded-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-5 mt-5 border-t border-slate-800/80">
                    <SkeletonButton width="w-full" className="h-10" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. WHY CHOOSE GLOBAL INFOSOFT SKELETON */}
        {/* ========================================================================= */}
        <div className="space-y-6 text-center">
          <div className="max-w-2xl mx-auto space-y-2 flex flex-col items-center">
            <Skeleton className="h-8 w-64" rounded="rounded-lg" />
            <Skeleton className="h-4 w-96 max-w-full" rounded="rounded-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 text-left">
            {[0, 1, 2].map((idx) => (
              <SkeletonCard key={idx} className="p-5 space-y-3">
                <Skeleton className="w-10 h-10" rounded="rounded-xl" />
                <Skeleton className="w-40 h-5" rounded="rounded-md" />
                <SkeletonText lines={2} lineHeight="h-3.5" lastLineWidth="w-4/5" />
              </SkeletonCard>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. NOT SURE WHICH PLAN FITS SKELETON */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/90 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-left">
          <div className="space-y-2.5 max-w-2xl">
            <Skeleton className="h-7 w-72" rounded="rounded-lg" />
            <SkeletonText lines={2} lineHeight="h-3.5" lastLineWidth="w-5/6" />
          </div>
          <div className="flex flex-wrap gap-3">
            <SkeletonButton width="w-36" className="h-11" />
            <SkeletonButton width="w-40" className="h-11" />
          </div>
        </div>
      </div>
    </div>
  );
};
