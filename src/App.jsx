import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import Sidebar from './components/Sidebar'
import TagChip from './components/TagChip'
import { menuData } from './data/appData'
import { Icon, MapPinIcon } from './components/icons'
import { useAppData } from './context/AppDataContext'

function App() {
  const { categories, featuredRestaurant, loading, error, restaurants } = useAppData()

  return (
    <div className="min-h-screen bg-[var(--page-bg)] px-4 py-4 text-slate-900 antialiased sm:px-5">
      <div className="app-shell mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1280px] overflow-hidden rounded-[28px] border border-white/60 bg-[var(--shell-bg)] shadow-[0_25px_80px_rgba(31,52,38,0.12)]">
        <Sidebar
          title="Verdant Halal"
          subtitle="Halal Finder Finland"
          menuItems={menuData}
          actionLabel="Add Restaurant"
        />

        <main className="min-w-0 border-l border-r border-black/5 bg-[var(--content-bg)]">
          <Header />

          <section className="h-full px-6 pb-6 pt-5">
            <div className="mb-5">
              <h1 className="text-[2rem] font-semibold tracking-[-0.05em] text-emerald-950">
                Top Halal Restaurants
              </h1>

              <div className="mt-4 flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <TagChip
                    key={category}
                    label={category}
                    isActive={index === 0}
                    className="filter-chip px-4 py-2 text-sm"
                    activeClassName="filter-chip-active"
                    inactiveClassName="filter-chip-idle"
                  />
                ))}
              </div>
            </div>

            {error ? (
              <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </div>
            ) : null}

            <div className="restaurant-feed">
              {loading && restaurants.length === 0 ? (
                <div className="grid gap-5">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`skeleton-${index + 1}`}
                      className="h-[310px] animate-pulse rounded-[24px] bg-white/70"
                    ></div>
                  ))}
                </div>
              ) : (
                restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))
              )}
            </div>
          </section>
        </main>

        <section className="map-panel">
          <div className="map-illustration">
            <div className="map-grid"></div>
            <div className="map-lines map-lines-a"></div>
            <div className="map-lines map-lines-b"></div>
            <div className="map-lines map-lines-c"></div>

            <div className="map-card">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-900 text-white shadow-[0_12px_24px_rgba(17,72,47,0.28)]">
                  <Icon className="h-5 w-5">
                    <path d="m7 7 10 10" />
                    <path d="m17 7-10 10" />
                  </Icon>
                </div>

                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-emerald-950/50">
                    Selected Result
                  </p>
                  <h2 className="mt-1 text-[1.65rem] font-semibold tracking-[-0.04em] text-emerald-950">
                    {featuredRestaurant.title}
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-emerald-950/70">
                {featuredRestaurant.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-3">
                    <span className="map-card-bullet"></span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <button type="button" className="direction-button">
                <MapPinIcon className="h-4 w-4" />
                Get Directions
              </button>
            </div>

            <button type="button" className="map-pin map-pin-top" aria-label="Pinned location">
              <MapPinIcon className="h-4 w-4" />
            </button>
            <button type="button" className="map-pin map-pin-left" aria-label="Pinned location">
              <MapPinIcon className="h-4 w-4" />
            </button>
            <button type="button" className="map-pin map-pin-bottom" aria-label="Pinned location">
              <MapPinIcon className="h-4 w-4" />
            </button>

            <div className="zoom-controls">
              <button type="button">+</button>
              <button type="button">-</button>
            </div>

            <button type="button" className="target-control" aria-label="Target location">
              <MapPinIcon className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
