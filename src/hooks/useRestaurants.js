import { useEffect, useState } from 'react'
import { sheetSourceUrl } from '../data/appData'
import { buildGoogleSheetCsvUrl, sheetParser } from '../utils/sheetParser'

function useRestaurants(sourceUrl = sheetSourceUrl) {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadRestaurants() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(buildGoogleSheetCsvUrl(sourceUrl), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load sheet data (${response.status}).`)
        }

        const csvText = await response.text()
        const parsedRestaurants = sheetParser(csvText)

        setRestaurants(parsedRestaurants)
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'Unable to load restaurant data.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRestaurants()

    return () => controller.abort()
  }, [sourceUrl])

  return { restaurants, loading, error }
}

export default useRestaurants
