import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { FiShare2 } from 'react-icons/fi'
import PlateArt from '../components/PlateArt'
import RestaurantDetailMap from '../components/RestaurantDetailMap'
import useAppData from '../hooks/useAppData'
import { Icon } from '../components/icons'

function DetailInfoCard({ label, children, compact = false }) {
  return (
    <div className={`detail-info-card ${compact ? 'detail-info-card-compact' : ''}`}>
      <p className="detail-info-label">{label}</p>
      <div className="mt-3 text-[0.96rem] font-semibold leading-7 text-emerald-950">
        {children}
      </div>
    </div>
  )
}

function RestaurantDetailPage() {
  const { slug } = useParams()
  const {
    error,
    getRestaurantBySlug,
    isFavorite,
    loading,
    setSelectedRestaurantId,
    toggleFavorite,
  } = useAppData()
  const restaurant = getRestaurantBySlug(slug)

  useEffect(() => {
    if (restaurant) {
      setSelectedRestaurantId(restaurant.id)
    }
  }, [restaurant, setSelectedRestaurantId])

  if (!loading && !restaurant) {
    return <Navigate to="/" replace />
  }

  async function handleShare() {
    if (!restaurant || typeof window === 'undefined') {
      return
    }

    const shareUrl = `${window.location.origin}/${restaurant.slug}`
    const shareData = {
      title: restaurant.name,
      text: `Check out ${restaurant.name} on Verdant Halal`,
      url: shareUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }

      await navigator.clipboard.writeText(shareUrl)
      window.alert('Restaurant link copied to clipboard.')
    } catch (shareError) {
      if (shareError?.name === 'AbortError') {
        return
      }

      try {
        await navigator.clipboard.writeText(shareUrl)
        window.alert('Restaurant link copied to clipboard.')
      } catch {
        window.alert('Unable to share this restaurant right now.')
      }
    }
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
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="verified-pill detail-top-pill">
                      <span className="verified-dot"></span>
                      Verified Halal
                    </span>
                    <span className="detail-meta-inline">
                      {restaurant.halalStatus || 'Halal Friendly'}
                    </span>
                  </div>

                  <span className="detail-meta-inline detail-meta-inline-muted">
                    4.8 | 124 reviews
                  </span>
                </div>

                <h1 className="mt-3 text-[2.45rem] font-semibold leading-[0.95] tracking-[-0.07em] text-emerald-950 md:text-[2.7rem]">
                  {restaurant.name}
                </h1>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3 text-[0.88rem] text-emerald-950/72">
                    <span>{restaurant.cuisine || 'Middle Eastern'}</span>
                    <span className="detail-dot-divider">{restaurant.city || 'Helsinki'}</span>
                    <span className="detail-dot-divider">{restaurant.phone || '$$'}</span>
                  </div>

                  <div className="flex items-center justify-start gap-3 sm:justify-end">
                    <button
                      type="button"
                      className="detail-action-button detail-action-button-primary"
                      onClick={() => toggleFavorite(restaurant.id)}
                      aria-label={
                        isFavorite(restaurant.id)
                          ? 'Remove from favorites'
                          : 'Add to favorites'
                      }
                    >
                      {isFavorite(restaurant.id) ? (
                        <FaHeart className="h-4 w-4" />
                      ) : (
                        <FaRegHeart className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      className="detail-action-button"
                      onClick={handleShare}
                      aria-label="Share restaurant"
                    >
                      <FiShare2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <DetailInfoCard label="Location">
                    <p>{restaurant.address || 'Street address not available'}</p>
                    <p>{restaurant.city || 'Helsinki'}</p>
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
                    <p>{restaurant.hours || 'Mon - Sun | 11:00 - 21:00'}</p>
                  </DetailInfoCard>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <DetailInfoCard label="Cuisine">
                    <p>{restaurant.cuisine || 'Middle Eastern'}</p>
                  </DetailInfoCard>

                  <DetailInfoCard label="Halal Status">
                    <p>{restaurant.halalStatus || 'Halal Friendly'}</p>
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
