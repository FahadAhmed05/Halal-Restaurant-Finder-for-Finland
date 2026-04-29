import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { FiExternalLink, FiX } from "react-icons/fi";
import PlateArt from "./PlateArt";
import TagChip from "./TagChip";

function RestaurantCard({
  restaurant,
  isSelected = false,
  onSelect,
  favoriteVariant = "toggle",
  isFavorited = false,
  onFavoriteAction,
}) {
  return (
    <article
      className={`restaurant-card cursor-pointer transition duration-200 hover:-translate-y-0.5 ${
        isSelected ? "restaurant-card-selected" : ""
      }`}
      onClick={() => onSelect?.(restaurant.id)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(restaurant.id);
        }
      }}
    >
      <div className={`image-shell bg-gradient-to-br ${restaurant.accent}`}>
        {favoriteVariant ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onFavoriteAction?.(restaurant.id);
            }}
            className={`absolute left-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
              favoriteVariant === "remove"
                ? "border-rose-200 bg-white/90 text-rose-600 shadow-[0_18px_32px_rgba(185,28,28,0.12)] hover:bg-rose-50"
                : isFavorited
                  ? "border-emerald-950/10 bg-white/92 text-rose-600 shadow-[0_18px_32px_rgba(20,66,40,0.14)] hover:bg-white"
                  : "border-emerald-950/10 bg-white/82 text-emerald-950/60 shadow-[0_18px_32px_rgba(20,66,40,0.12)] hover:bg-white"
            }`}
            aria-label={
              favoriteVariant === "remove"
                ? "Remove from wishlist"
                : isFavorited
                  ? "Remove from favorites"
                  : "Add to favorites"
            }
          >
            {favoriteVariant === "remove" ? (
              <FiX className="h-4 w-4" />
            ) : isFavorited ? (
              <FaHeart className="h-4 w-4" />
            ) : (
              <FaRegHeart className="h-4 w-4" />
            )}
          </button>
        ) : null}
        {restaurant.halalStatus && (
          <span className="verified-pill">
            <span className="verified-dot"></span>
            {restaurant.halalStatus}
          </span>
        )}
        <PlateArt variant={restaurant.plate} />
      </div>

      <div className="space-y-3 px-4 pb-4 pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Link
              to={`/${restaurant.slug}`}
              onClick={(event) => event.stopPropagation()}
              className="flex items-center justify-start gap-1 truncate text-[1.07rem] font-semibold leading-tight text-slate-900 transition hover:text-emerald-800"
            >
              {restaurant.name}
              <FiExternalLink size={15} className="flex-shrink-0" />
            </Link>
            <p className="mt-1.5 line-clamp-1 text-[0.78rem] text-slate-500">
              {[restaurant.cuisine, restaurant.address]
                .filter(Boolean)
                .join(" - ")}
            </p>
          </div>

          <span className="rating-badge">
            <IoStar className="h-3.5 w-3.5 text-lime-700" />
            {restaurant.badgeText}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-0.5">
          {restaurant.tags.map((tag) => (
            <TagChip
              key={tag}
              label={tag}
              className={`tag-chip ${
                tag === restaurant.city ? 'tag-chip-city' : ''
              }`}
              onClick={(event) => {
                event.stopPropagation();
                onSelect?.(restaurant.id);
              }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default RestaurantCard;
