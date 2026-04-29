import { Icon, MapPinIcon } from './icons'

function DetailRow({ icon, value }) {
  if (!value) {
    return null
  }

  return (
    <div className="map-card-row">
      <span className="map-card-row-icon">{icon}</span>
      <p className="text-[0.79rem] leading-5 text-emerald-950/70">{value}</p>
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

  const directionsUrl =
    Number.isFinite(restaurant.coordinates?.lat) &&
    Number.isFinite(restaurant.coordinates?.lng)
      ? `https://www.google.com/maps/search/?api=1&query=${restaurant.coordinates.lat},${restaurant.coordinates.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          [restaurant.name, restaurant.address, restaurant.city].filter(Boolean).join(', '),
        )}`

  return (
    <div className="map-card">
      <div className="flex items-start gap-3">
        <div className="map-card-brand">
          <Icon className="h-5 w-5">
            <path d="M8 4h8" />
            <path d="M10 4v6" />
            <path d="M14 4v6" />
            <path d="M8 10c0 2.5 1.8 4 4 4s4-1.5 4-4" />
            <path d="M12 14v6" />
          </Icon>
        </div>

        <div>
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-emerald-950/50">
            Selected Result
          </p>
          <h2 className="mt-1 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em] text-emerald-950">
            {restaurant.name}
          </h2>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <DetailRow
          value={restaurant.hours || 'Open until 22:00'}
          icon={
            <Icon className="h-3.5 w-3.5">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l2.5 1.5" />
            </Icon>
          }
        />
        <DetailRow
          value={restaurant.phone || '+358 40 123 4567'}
          icon={
            <Icon className="h-3.5 w-3.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.29a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92Z" />
            </Icon>
          }
        />
        <DetailRow
          value={restaurant.address && restaurant.city ? `${restaurant.address} • ${restaurant.city}` : restaurant.city || restaurant.address || '4 min • 1.2km'}
          icon={<MapPinIcon className="h-3.5 w-3.5" />}
        />
      </div>

      <div className="map-card-actions">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="direction-button map-card-action-primary"
        >
          <MapPinIcon className="h-4 w-4" />
          Directions
        </a>

        <a
          href={restaurant.website || directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="direction-button map-card-action-secondary"
        >
          Website
        </a>
      </div>
    </div>
  )
}

export default SelectedRestaurantCard
