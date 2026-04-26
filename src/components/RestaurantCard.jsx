import { Link } from 'react-router-dom'
import PlateArt from './PlateArt'
import TagChip from './TagChip'

function RestaurantCard({ restaurant, isSelected = false, onSelect }) {
  return (
    <article
      className={`restaurant-card cursor-pointer transition duration-200 hover:-translate-y-0.5 ${
        isSelected ? 'restaurant-card-selected' : ''
      }`}
    >
      <div className={`image-shell bg-gradient-to-br ${restaurant.accent}`}>
        <span className="verified-pill">
          <span className="verified-dot"></span>
          Verified Halal
        </span>
        <PlateArt variant={restaurant.plate} />
      </div>

      <button
        type="button"
        onClick={() => onSelect?.(restaurant.id)}
        className="block w-full text-left"
        aria-pressed={isSelected}
      >
        <div className="space-y-2 px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/${restaurant.slug}`}
              onClick={(event) => event.stopPropagation()}
              className="block truncate text-[1.08rem] font-semibold text-slate-900 transition hover:text-emerald-800"
            >
              {restaurant.name}
            </Link>
            <p className="mt-1 text-[0.78rem] text-slate-500">
              {[restaurant.cuisine, restaurant.address].filter(Boolean).join(' - ')}
            </p>
          </div>

          <span className="rating-badge">
            {restaurant.badgeText}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {restaurant.tags.map((tag) => (
            <TagChip
              key={tag}
              label={tag}
              className="tag-chip"
            />
          ))}
        </div>
        </div>
      </button>
    </article>
  )
}

export default RestaurantCard
