function RestaurantCardSkeleton() {
  return (
    <article className="restaurant-card overflow-hidden">
      <div className="image-shell bg-emerald-950/5">
        <div className="absolute right-4 top-4 h-6 w-28 animate-pulse rounded-full bg-emerald-950/10"></div>
        <div className="absolute inset-x-10 bottom-8 h-24 animate-pulse rounded-[28px] bg-emerald-950/8"></div>
      </div>

      <div className="space-y-3 px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-5 w-48 animate-pulse rounded-xl bg-emerald-950/10"></div>
            <div className="h-4 w-64 max-w-full animate-pulse rounded-xl bg-emerald-950/8"></div>
          </div>
          <div className="h-7 w-14 animate-pulse rounded-xl bg-emerald-950/10"></div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <span
              key={`tag-skel-${index + 1}`}
              className="h-6 w-20 animate-pulse rounded-lg bg-emerald-950/8"
            ></span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default RestaurantCardSkeleton

