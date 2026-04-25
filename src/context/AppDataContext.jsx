import { createContext } from 'react'
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

function buildFeaturedRestaurant(restaurants) {
  const featured = restaurants[0]

  if (!featured) {
    return {
      title: 'No restaurant selected',
      details: ['Waiting for sheet data'],
    }
  }

  return {
    title: featured.name,
    details: [featured.hours, featured.phone, featured.address].filter(Boolean),
  }
}

function AppDataProvider({ children }) {
  const { restaurants, loading, error } = useRestaurants()

  const state = {
    restaurants,
    loading,
    error,
    categories: buildCategories(restaurants),
    featuredRestaurant: loading && restaurants.length === 0
      ? {
          title: 'Loading restaurants',
          details: ['Fetching published sheet data...'],
        }
      : buildFeaturedRestaurant(restaurants),
  }

  return <AppDataContext.Provider value={state}>{children}</AppDataContext.Provider>
}

export { AppDataProvider }
