import { Icon, MapPinIcon } from './icons'

function DetailRow({ label, value }) {
  if (!value) {
    return null
  }

  return (
    <div className="flex items-start gap-3">
      <span className="map-card-bullet mt-1.5"></span>
      <div>
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-emerald-950/45">
          {label}
        </p>
        <p className="mt-1 text-sm leading-6 text-emerald-950/78">{value}</p>
      </div>
    </div>
  )
}

function SelectedRestaurantCard({ restaurant, loading }) {
  if (loading && !restaurant) {
    return (
      <div className="map-card">
        <div className="space-y-4">
          <div className="h-5 w-28 animate-pulse rounded-full bg-emerald-950/10"></div>
          <div className="h-10 w-52 animate-pulse rounded-2xl bg-emerald-950/10"></div>
          <div className="space-y-3 pt-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`detail-skeleton-${index + 1}`}
                className="h-12 animate-pulse rounded-2xl bg-emerald-950/8"
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="map-card">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-emerald-950/45">
          Selected Result
        </p>
        <h2 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em] text-emerald-950">
          No restaurant selected
        </h2>
        <p className="mt-3 text-sm leading-6 text-emerald-950/68">
          Click any marker pin on the map to view full restaurant details here.
        </p>
      </div>
    )
  }

  return (
    <div className="map-card">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-900 text-white shadow-[0_12px_24px_rgba(17,72,47,0.28)]">
          <Icon className="h-5 w-5">
            <path d="M8 4h8" />
            <path d="M10 4v6" />
            <path d="M14 4v6" />
            <path d="M8 10c0 2.5 1.8 4 4 4s4-1.5 4-4" />
            <path d="M12 14v6" />
          </Icon>
        </div>

        <div>
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-emerald-950/50">
            Selected Result
          </p>
          <h2 className="mt-1 text-[1.65rem] font-semibold tracking-[-0.04em] text-emerald-950">
            {restaurant.name}
          </h2>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <DetailRow label="Address" value={restaurant.address} />
        <DetailRow label="City" value={restaurant.city} />
        <DetailRow label="Cuisine" value={restaurant.cuisine} />
        <DetailRow label="Halal Status" value={restaurant.halalStatus} />
        <DetailRow label="Opening Hours" value={restaurant.hours} />
      </div>

      {restaurant.website ? (
        <a
          href={restaurant.website}
          target="_blank"
          rel="noreferrer"
          className="direction-button mt-6"
        >
          <MapPinIcon className="h-4 w-4" />
          Visit Website
        </a>
      ) : null}
    </div>
  )
}

export default SelectedRestaurantCard
