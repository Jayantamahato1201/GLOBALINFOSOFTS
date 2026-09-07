import React from 'react';
import {
  Skeleton,
  SkeletonText,
  SkeletonBadge,
  SkeletonButton,
  SkeletonCard
} from './SkeletonBase';

export const AboutSkeleton: React.FC = () => {
  return (
    <div className="w-full relative bg-[#07090F] text-slate-200 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] pt-16 sm:pt-20 pb-12 min-h-screen">
      {/* Ambient background glows */}
      <div className="absolute top-16 -left-32 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-10 space-y-12 sm:space-y-16 lg:space-y-20">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION SKELETON */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <Skeleton className="w-5 h-[2px]" rounded="rounded-none" />
              <SkeletonBadge width="w-36" className="h-4" />
            </div>

            {/* Giant Headline */}
            <div className="space-y-3">
              <Skeleton className="h-10 sm:h-12 w-4/5" rounded="rounded-xl" />
              <Skeleton className="h-10 sm:h-12 w-3/5" rounded="rounded-xl" />
            </div>

            {/* Paragraph Text */}
            <SkeletonText lines={4} lineHeight="h-4" gap="space-y-2.5" lastLineWidth="w-4/5" />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <SkeletonButton width="w-36" className="h-12" />
              <SkeletonButton width="w-36" className="h-12" />
            </div>
          </div>

          {/* Right Column Boardroom Image Skeleton (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="w-full h-[340px] sm:h-[400px] lg:h-[430px] rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-10 right-8 flex items-center gap-3">
                <Skeleton className="w-10 h-10" rounded="rounded-full" />
                <Skeleton className="w-28 h-5" rounded="rounded-md" />
              </div>

              <div className="self-end mt-auto w-[240px] p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <Skeleton className="w-32 h-4" rounded="rounded-md" />
                <Skeleton className="w-24 h-3" rounded="rounded-md" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OUR STORY SECTION SKELETON */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <SkeletonBadge width="w-28" className="h-4" />

            <div className="space-y-3">
              <Skeleton className="h-9 sm:h-11 w-3/4" rounded="rounded-xl" />
              <Skeleton className="h-9 sm:h-11 w-1/2" rounded="rounded-xl" />
            </div>

            <SkeletonText lines={3} lineHeight="h-4" gap="space-y-2.5" lastLineWidth="w-5/6" />

            {/* 3 Horizontal Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#0B101D]/90 border border-slate-800/80"
                >
                  <Skeleton className="w-10 h-10 shrink-0" rounded="rounded-lg" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="w-3/4 h-3.5" rounded="rounded-sm" />
                    <Skeleton className="w-full h-2.5" rounded="rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="w-full h-[320px] sm:h-[380px] rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute bottom-6 right-6 w-36 h-40 rounded-2xl bg-slate-950/90 border border-slate-800 p-3 flex flex-col justify-center items-center space-y-2">
                <Skeleton className="w-20 h-3" rounded="rounded-sm" />
                <Skeleton className="w-24 h-4" rounded="rounded-sm" />
                <Skeleton className="w-16 h-3" rounded="rounded-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. OUR PHILOSOPHY SECTION SKELETON */}
        {/* ========================================================================= */}
        <section className="rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-[#090D18]/95 p-6 sm:p-10 lg:p-12 text-left space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <SkeletonBadge width="w-32" className="h-4" />
              <Skeleton className="h-10 w-64" rounded="rounded-xl" />
            </div>
            <SkeletonText lines={2} className="max-w-md" lineHeight="h-3.5" />
          </div>

          <div className="border-t border-slate-800/80 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="space-y-3">
                <Skeleton className="w-12 h-9" rounded="rounded-lg" />
                <Skeleton className="w-32 h-5" rounded="rounded-md" />
                <SkeletonText lines={2} lineHeight="h-3" lastLineWidth="w-2/3" />
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. WHY GLOBAL INFOSOFT 2x2 GRID SKELETON */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 text-left space-y-4">
            <Skeleton className="h-10 sm:h-12 w-4/5" rounded="rounded-xl" />
            <Skeleton className="h-5 w-3/4" rounded="rounded-md" />
            <SkeletonText lines={2} lineHeight="h-3.5" />
            <SkeletonButton width="w-44" className="h-11 pt-2" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[0, 1, 2, 3].map((idx) => (
              <SkeletonCard key={idx} className="p-5 flex items-start gap-4">
                <Skeleton className="w-11 h-11 shrink-0" rounded="rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="w-36 h-4" rounded="rounded-md" />
                  <SkeletonText lines={2} lineHeight="h-3" lastLineWidth="w-4/5" />
                </div>
              </SkeletonCard>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. BOTTOM CTA BANNER SKELETON */}
        {/* ========================================================================= */}
        <section className="rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-[#090D18] p-6 sm:p-10 lg:p-12 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <SkeletonBadge width="w-36" className="h-4" />
              <Skeleton className="h-8 sm:h-10 w-4/5" rounded="rounded-xl" />
              <SkeletonText lines={2} lineHeight="h-3.5" lastLineWidth="w-3/4" />
            </div>
            <div className="lg:col-span-5 flex lg:justify-end gap-3">
              <SkeletonButton width="w-40" className="h-12" />
              <SkeletonButton width="w-40" className="h-12" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
