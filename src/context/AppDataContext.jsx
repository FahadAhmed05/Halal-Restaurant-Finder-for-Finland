import { createContext, useEffect, useMemo, useState } from 'react'
import { fallbackCategories } from '../data/appData'
import useRestaurants from '../hooks/useRestaurants'

export const AppDataContext = createContext(null)

const FAVORITES_STORAGE_KEY = 'verdant-halal:favorites'

function readFavoritesFromStorage() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id) => typeof id === 'string' || typeof id === 'number')
  } catch {
    return []
  }
}

function buildCategories(restaurants) {
  const dynamicCategories = Array.from(
    new Set(
      restaurants
        .map((restaurant) => restaurant.cuisine)
        .filter(Boolean),
    ),
  )

  if (dynamicCategories.length === 0) {
    return fallbackCategories
  }

  return ['All', ...dynamicCategories]
}

function AppDataProvider({ children }) {
  const { restaurants, loading, error } = useRestaurants()
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchScope, setSearchScope] = useState('all')
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [favoriteIds, setFavoriteIds] = useState(() =>
    typeof window === 'undefined' ? [] : readFavoritesFromStorage(),
  )

  const filteredRestaurants = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return restaurants.filter((restaurant) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        (searchScope === 'all' &&
          (restaurant.name.toLowerCase().includes(normalizedQuery) ||
            restaurant.city.toLowerCase().includes(normalizedQuery))) ||
        (searchScope === 'cuisine' &&
          restaurant.cuisine.toLowerCase().includes(normalizedQuery))

      const matchesCuisine =
        selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine

      return matchesSearch && matchesCuisine
    })
  }, [restaurants, searchQuery, searchScope, selectedCuisine])

  useEffect(() => {
    if (filteredRestaurants.length === 0) {
      setSelectedRestaurantId(null)
      return
    }

    const hasSelectedRestaurant = filteredRestaurants.some(
      (restaurant) => restaurant.id === selectedRestaurantId,
    )

    if (!hasSelectedRestaurant) {
      setSelectedRestaurantId(filteredRestaurants[0].id)
    }
  }, [filteredRestaurants, selectedRestaurantId])

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
    } catch {
      // ignore storage failures (quota / privacy mode)
    }
  }, [favoriteIds])

  const selectedRestaurant =
    filteredRestaurants.find((restaurant) => restaurant.id === selectedRestaurantId) ||
    null

  const favoritesSet = useMemo(() => new Set(favoriteIds), [favoriteIds])

  const isFavorite = (restaurantId) => favoritesSet.has(restaurantId)

  const toggleFavorite = (restaurantId) => {
    setFavoriteIds((current) => {
      const set = new Set(current)
      if (set.has(restaurantId)) {
        set.delete(restaurantId)
      } else {
        set.add(restaurantId)
      }
      return Array.from(set)
    })
  }

  const removeFavorite = (restaurantId) => {
    setFavoriteIds((current) => current.filter((id) => id !== restaurantId))
  }

  const state = {
    restaurants,
    filteredRestaurants,
    loading,
    error,
    categories: buildCategories(restaurants),
    searchQuery,
    setSearchQuery,
    searchScope,
    setSearchScope,
    selectedCuisine,
    setSelectedCuisine,
    selectedRestaurant,
    setSelectedRestaurantId,
    favoriteIds,
    favoritesCount: favoriteIds.length,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    getRestaurantBySlug: (slug) =>
      restaurants.find((restaurant) => restaurant.slug === slug) || null,
  }

  return <AppDataContext.Provider value={state}>{children}</AppDataContext.Provider>
}

export { AppDataProvider }
