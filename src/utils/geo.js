function toRadians(value) {
  return (value * Math.PI) / 180
}

function calculateDistanceInKm(from, to) {
  if (!from || !to) return Number.POSITIVE_INFINITY

  const earthRadiusKm = 6371
  const latDelta = toRadians((to.lat ?? 0) - (from.lat ?? 0))
  const lngDelta = toRadians((to.lng ?? 0) - (from.lng ?? 0))
  const fromLat = toRadians(from.lat ?? 0)
  const toLat = toRadians(to.lat ?? 0)

  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDelta / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return earthRadiusKm * c
}

function findNearestRestaurant(restaurants, userLocation) {
  if (!userLocation || restaurants.length === 0) {
    return null
  }

  return restaurants.reduce((nearest, restaurant) => {
    const { coordinates } = restaurant

    if (!Number.isFinite(coordinates?.lat) || !Number.isFinite(coordinates?.lng)) {
      return nearest
    }

    const distanceKm = calculateDistanceInKm(userLocation, coordinates)

    if (!nearest || distanceKm < nearest.distanceKm) {
      return {
        restaurant,
        distanceKm,
      }
    }

    return nearest
  }, null)
}

export { calculateDistanceInKm, findNearestRestaurant }
