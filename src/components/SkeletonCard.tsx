export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-beige-100 animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[4/3] skeleton bg-beige-200" />

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <div className="h-4 skeleton bg-beige-200 rounded-full w-3/4" />
        <div className="h-4 skeleton bg-beige-200 rounded-full w-1/2" />
        <div className="h-3 skeleton bg-beige-100 rounded-full w-1/3 mt-4" />

        <div className="flex gap-2 pt-2">
          <div className="flex-1 h-10 skeleton bg-beige-200 rounded-full" />
          <div className="flex-1 h-10 skeleton bg-green-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}
