import { useCallback, useState } from 'react'

function useGeolocation() {
  const [coords, setCoords] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const supported =
    typeof window !== 'undefined' && 'geolocation' in navigator

  const requestLocation = useCallback(() => {
    if (!supported) {
      setError('Geolocation is not supported in this browser.')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
        setLoading(false)
      },
      (locationError) => {
        const message =
          locationError.code === locationError.PERMISSION_DENIED
            ? 'Location permission was denied.'
            : locationError.code === locationError.POSITION_UNAVAILABLE
              ? 'Your location is currently unavailable.'
              : locationError.code === locationError.TIMEOUT
                ? 'Location request timed out.'
                : 'Unable to fetch your current location.'

        setError(message)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }, [supported])

  return {
    coords,
    error,
    loading,
    requestLocation,
    supported,
  }
}

export default useGeolocation
