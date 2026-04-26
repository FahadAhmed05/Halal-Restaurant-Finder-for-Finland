import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PlateArt from '../components/PlateArt'
import RestaurantDetailMap from '../components/RestaurantDetailMap'
import useAppData from '../hooks/useAppData'
import { Icon } from '../components/icons'

function DetailInfoCard({ label, children, compact = false }) {
  return (
    <div className={`detail-info-card ${compact ? 'detail-info-card-compact' : ''}`}>
      <p className="detail-info-label">{label}</p>
      <div className="mt-3 text-[1.05rem] font-semibold leading-8 text-emerald-950">
        {children}
      </div>
    </div>
  )
}

function RestaurantDetailPage() {
  const { slug } = useParams()
  const { error, getRestaurantBySlug, loading, setSelectedRestaurantId } = useAppData()
  const restaurant = getRestaurantBySlug(slug)

  useEffect(() => {
    if (restaurant) {
      setSelectedRestaurantId(restaurant.id)
    }
  }, [restaurant, setSelectedRestaurantId])

  if (!loading && !restaurant) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="detail-page-shell mx-auto min-h-[calc(100vh-2rem)] max-w-[1280px] overflow-hidden rounded-[28px] border border-white/60 bg-[var(--shell-bg)] shadow-[0_25px_80px_rgba(31,52,38,0.12)]">
      <div className="detail-page-grid">
        <section className="detail-page-map-panel">
          <RestaurantDetailMap restaurant={restaurant} />
        </section>

        <section className="detail-page-content">
          {loading && !restaurant ? (
            <div className="p-8">
              <div className="h-72 animate-pulse rounded-[30px] bg-white/65"></div>
            </div>
          ) : null}

          {restaurant ? (
            <>
              <div className={`detail-hero bg-gradient-to-br ${restaurant.accent}`}>
                <Link to="/" className="detail-back-button" aria-label="Back to restaurants">
                  <Icon className="h-4 w-4">
                    <path d="m15 18-6-6 6-6" />
                  </Icon>
                </Link>
                <PlateArt variant={restaurant.plate} />
              </div>

              <div className="detail-content-inner">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="verified-pill detail-top-pill">
                    <span className="verified-dot"></span>
                    Verified Halal
                  </span>
                  {restaurant.halalStatus ? (
                    <span className="detail-meta-inline">{restaurant.halalStatus}</span>
                  ) : null}
                </div>

                <h1 className="mt-4 text-[3rem] font-semibold leading-[0.95] tracking-[-0.08em] text-emerald-950">
                  {restaurant.name}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-emerald-950/72">
                  {restaurant.cuisine ? <span>{restaurant.cuisine}</span> : null}
                  {restaurant.city ? <span className="detail-dot-divider">{restaurant.city}</span> : null}
                  {restaurant.phone ? <span className="detail-dot-divider">{restaurant.phone}</span> : null}
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <DetailInfoCard label="Location">
                    <p>{restaurant.address}</p>
                    <p>{restaurant.city}</p>
                    {restaurant.website ? (
                      <a
                        href={restaurant.website}
                        target="_blank"
                        rel="noreferrer"
                        className="detail-card-link"
                      >
                        Visit Website
                      </a>
                    ) : null}
                  </DetailInfoCard>

                  <DetailInfoCard label="Opening Hours" compact>
                    <p>{restaurant.hours || 'Hours not available'}</p>
                  </DetailInfoCard>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <DetailInfoCard label="Cuisine">
                    <p>{restaurant.cuisine || 'Cuisine not available'}</p>
                  </DetailInfoCard>

                  <DetailInfoCard label="Halal Status">
                    <p>{restaurant.halalStatus || 'Status not available'}</p>
                  </DetailInfoCard>
                </div>

                {error ? (
                  <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {error}
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </section>
      </div>
    </div>
  )
}

export default RestaurantDetailPage
