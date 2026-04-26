import RestaurantMap from '../components/RestaurantMap'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantCardSkeleton from '../components/RestaurantCardSkeleton'
import Sidebar from '../components/Sidebar'
import { menuData } from '../data/appData'
import useAppData from '../hooks/useAppData'

function FavoritesPage() {
  const {
    restaurants,
    loading,
    error,
    favoriteIds,
    favoritesCount,
    selectedRestaurant,
    setSelectedRestaurantId,
    isFavorite,
    toggleFavorite,
  } = useAppData()

  const favorites = restaurants.filter((restaurant) => favoriteIds.includes(restaurant.id))
  const menuItems = menuData.map((item) =>
    item.id === 3 ? { ...item, badge: favoritesCount } : item,
  )

  return (
    <div className="app-shell mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1280px] overflow-hidden rounded-[28px] border border-white/60 bg-[var(--shell-bg)] shadow-[0_25px_80px_rgba(31,52,38,0.12)]">
      <Sidebar
        title="Verdant Halal"
        subtitle="Halal Finder Finland"
        menuItems={menuItems}
        actionLabel="Add Restaurant"
      />

      <main className="min-w-0 border-l border-r border-black/5 bg-[var(--content-bg)]">
        <section className="h-full px-6 pb-6 pt-5">
          <div className="mb-5">
            <h1 className="text-[2rem] font-semibold tracking-[-0.05em] text-emerald-950">
              Favorites
            </h1>
            <p className="mt-2 text-sm text-emerald-950/55">
              Your saved halal spots ({favoritesCount}).
            </p>
          </div>

          {error ? (
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {error}
            </div>
          ) : null}

          <div className="restaurant-feed">
            {loading && favorites.length === 0 ? (
              <div className="grid gap-5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <RestaurantCardSkeleton key={`fav-skeleton-${index + 1}`} />
                ))}
              </div>
            ) : favorites.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-emerald-900/16 bg-white/55 px-5 py-8 text-center text-sm text-emerald-950/65">
                No favorites yet. Tap the heart on any restaurant to save it here.
              </div>
            ) : (
              favorites.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isSelected={selectedRestaurant?.id === restaurant.id}
                  onSelect={setSelectedRestaurantId}
                  isFavorited={isFavorite(restaurant.id)}
                  onFavoriteAction={toggleFavorite}
                />
              ))
            )}
          </div>
        </section>
      </main>

      <RestaurantMap />
    </div>
  )
}

export default FavoritesPage

