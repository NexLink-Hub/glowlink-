// Reusable skeleton loader component for loading states
export function SkeletonLoader({ width = "w-full", height = "h-4", count = 1, className = "" }: { width?: string; height?: string; count?: number; className?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${width} ${height} bg-gray-200 rounded animate-pulse ${className}`}></div>
      ))}
    </>
  );
}

export function SkeletonFormField() {
  return (
    <div className="space-y-2">
      <SkeletonLoader width="w-24" height="h-4" />
      <SkeletonLoader width="w-full" height="h-10" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-3 p-4 bg-white rounded-xl border border-gray-200">
      <SkeletonLoader width="w-3/4" height="h-6" />
      <SkeletonLoader width="w-full" height="h-4" count={3} className="mb-1" />
      <SkeletonLoader width="w-1/2" height="h-10" />
    </div>
  );
}

export function SkeletonImage() {
  return <SkeletonLoader width="w-full" height="h-64" className="rounded-xl" />;
}
