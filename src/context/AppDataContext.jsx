import { createContext, useEffect, useState } from 'react'
import { fallbackCategories, sheetSourceUrl } from '../data/appData'
import { fetchRestaurantSheet } from '../utils/restaurantData'

export const AppDataContext = createContext(null)

function AppDataProvider({ children }) {
  const [state, setState] = useState({
    restaurants: [],
    rawRows: [],
    categories: fallbackCategories,
    featuredRestaurant: {
      title: 'Loading restaurants',
      details: ['Fetching published sheet data...'],
    },
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadRestaurantData() {
      try {
        setState((currentState) => ({
          ...currentState,
          loading: true,
          error: null,
        }))

        const result = await fetchRestaurantSheet(sheetSourceUrl, controller.signal)

        setState({
          ...result,
          loading: false,
          error: null,
        })
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        setState((currentState) => ({
          ...currentState,
          loading: false,
          error: error instanceof Error ? error.message : 'Unable to load restaurant data.',
        }))
      }
    }

    loadRestaurantData()

    return () => controller.abort()
  }, [])

  return <AppDataContext.Provider value={state}>{children}</AppDataContext.Provider>
}

export { AppDataProvider }
