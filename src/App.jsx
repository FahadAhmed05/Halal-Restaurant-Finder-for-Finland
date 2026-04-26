import Header from "./components/Header";
import RestaurantMap from "./components/RestaurantMap";
import RestaurantCard from "./components/RestaurantCard";
import Sidebar from "./components/Sidebar";
import TagChip from "./components/TagChip";
import { menuData } from "./data/appData";
import useAppData from "./hooks/useAppData";

function App() {
  const {
    categories,
    filteredRestaurants,
    loading,
    error,
    searchQuery,
    selectedCuisine,
    selectedRestaurant,
    setSelectedCuisine,
    setSelectedRestaurantId,
  } = useAppData();

  return (
    <div className="min-h-screen bg-[var(--page-bg)] px-4 py-4 text-slate-900 antialiased sm:px-5">
      <Header />

      <div className="app-shell mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1280px] overflow-hidden rounded-[28px] border border-white/60 bg-[var(--shell-bg)] shadow-[0_25px_80px_rgba(31,52,38,0.12)]">
        <Sidebar
          title="Verdant Halal"
          subtitle="Halal Finder Finland"
          menuItems={menuData}
          actionLabel="Add Restaurant"
        />

        <main className="min-w-0 border-l border-r border-black/5 bg-[var(--content-bg)]">
          <section className="h-full px-6 pb-6 pt-5">
            <div className="mb-5">
              <h1 className="text-[2rem] font-semibold tracking-[-0.05em] text-emerald-950">
                Top Halal Restaurants
              </h1>

              <div className="mt-4 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <TagChip
                    key={category}
                    label={category}
                    isActive={selectedCuisine === category}
                    onClick={() => setSelectedCuisine(category)}
                    className="filter-chip px-4 py-2 text-sm cursor-pointer"
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
              {loading && filteredRestaurants.length === 0 ? (
                <div className="grid gap-5">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`skeleton-${index + 1}`}
                      className="h-[310px] animate-pulse rounded-[24px] bg-white/70"
                    ></div>
                  ))}
                </div>
              ) : filteredRestaurants.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-emerald-900/16 bg-white/55 px-5 py-8 text-center text-sm text-emerald-950/65">
                  No restaurants match your current search and cuisine filter.
                  {searchQuery ? ` Search: "${searchQuery}".` : ""}
                </div>
              ) : (
                filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    isSelected={selectedRestaurant?.id === restaurant.id}
                    onSelect={setSelectedRestaurantId}
                  />
                ))
              )}
            </div>
          </section>
        </main>

        <RestaurantMap />
      </div>
    </div>
  );
}

export default App;
