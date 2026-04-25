import { createContext, useEffect, useState } from 'react'
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

  return ['All', ...dynamicCategories.slice(0, 3)]
}

function AppDataProvider({ children }) {
  const { restaurants, loading, error } = useRestaurants()
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null)

  useEffect(() => {
    if (restaurants.length === 0) {
      setSelectedRestaurantId(null)
      return
    }

    const hasSelectedRestaurant = restaurants.some(
      (restaurant) => restaurant.id === selectedRestaurantId,
    )

    if (!hasSelectedRestaurant) {
      setSelectedRestaurantId(restaurants[0].id)
    }
  }, [restaurants, selectedRestaurantId])

  const selectedRestaurant =
    restaurants.find((restaurant) => restaurant.id === selectedRestaurantId) || null

  const state = {
    restaurants,
    loading,
    error,
    categories: buildCategories(restaurants),
    selectedRestaurant,
    setSelectedRestaurantId,
  }

  return <AppDataContext.Provider value={state}>{children}</AppDataContext.Provider>
}

export { AppDataProvider }
