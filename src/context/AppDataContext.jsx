import { createContext, useEffect, useMemo, useState } from 'react'
import { fallbackCategories } from '../data/appData'
import useRestaurants from '../hooks/useRestaurants'

export const AppDataContext = createContext(null)

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
  const [searchMode, setSearchMode] = useState('all')
  const [selectedCuisine, setSelectedCuisine] = useState('All')

  const filteredRestaurants = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return restaurants.filter((restaurant) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        (searchMode === 'restaurant' &&
          restaurant.name.toLowerCase().includes(normalizedQuery)) ||
        (searchMode === 'city' &&
          restaurant.city.toLowerCase().includes(normalizedQuery)) ||
        (searchMode === 'all' &&
          (restaurant.name.toLowerCase().includes(normalizedQuery) ||
            restaurant.city.toLowerCase().includes(normalizedQuery)))

      const matchesCuisine =
        selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine

      return matchesSearch && matchesCuisine
    })
  }, [restaurants, searchQuery, searchMode, selectedCuisine])

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

  const selectedRestaurant =
    filteredRestaurants.find((restaurant) => restaurant.id === selectedRestaurantId) ||
    null

  const state = {
    restaurants,
    filteredRestaurants,
    loading,
    error,
    categories: buildCategories(restaurants),
    searchQuery,
    setSearchQuery,
    searchMode,
    setSearchMode,
    selectedCuisine,
    setSelectedCuisine,
    selectedRestaurant,
    setSelectedRestaurantId,
    getRestaurantBySlug: (slug) =>
      restaurants.find((restaurant) => restaurant.slug === slug) || null,
  }

  return <AppDataContext.Provider value={state}>{children}</AppDataContext.Provider>
}

export { AppDataProvider }
