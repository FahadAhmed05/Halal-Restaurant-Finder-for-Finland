import { divIcon } from 'leaflet'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import useAppData from '../hooks/useAppData'
import { MapPinIcon } from './icons'
import SelectedRestaurantCard from './SelectedRestaurantCard'

const finlandCenter = [64.5, 26]

const restaurantPinIcon = divIcon({
  className: 'restaurant-marker-wrapper',
  html: '<div class="restaurant-marker-pin"></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -18],
})

const userLocationPinIcon = divIcon({
  className: 'restaurant-marker-wrapper',
  html: '<div class="user-location-pin"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

function MapControls({
  hasRestaurants,
  isNearMeActive,
  selectedRestaurant,
  userLocation,
}) {
  const map = useMap()

  return (
    <>
      <div className="zoom-controls">
        <button type="button" onClick={() => map.zoomIn()}>
          +
        </button>
        <button type="button" onClick={() => map.zoomOut()}>
          -
        </button>
      </div>

      <button
        type="button"
        className="target-control"
        aria-label="Center map on Finland"
        onClick={() => {
          if (
            isNearMeActive &&
            Number.isFinite(userLocation?.lat) &&
            Number.isFinite(userLocation?.lng)
          ) {
            map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 0.9 })
            return
          }

          if (
            hasRestaurants &&
            selectedRestaurant?.coordinates?.lat &&
            selectedRestaurant?.coordinates?.lng
          ) {
            map.flyTo(
              [selectedRestaurant.coordinates.lat, selectedRestaurant.coordinates.lng],
              12,
              { duration: 0.9 },
            )
            return
          }

          map.flyTo(finlandCenter, 5.5, { duration: 0.9 })
        }}
      >
        <MapPinIcon className="h-4 w-4" />
      </button>
    </>
  )
}

function MapViewport({ isNearMeActive, selectedRestaurant, userLocation }) {
  const map = useMap()

  useEffect(() => {
    if (
      isNearMeActive &&
      Number.isFinite(userLocation?.lat) &&
      Number.isFinite(userLocation?.lng)
    ) {
      map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 0.9 })
      return
    }

    if (
      selectedRestaurant?.coordinates?.lat &&
      selectedRestaurant?.coordinates?.lng
    ) {
      map.flyTo(
        [selectedRestaurant.coordinates.lat, selectedRestaurant.coordinates.lng],
        11,
        { duration: 0.9 },
      )
      return
    }

    map.flyTo(finlandCenter, 5.5, { duration: 0.9 })
  }, [isNearMeActive, map, selectedRestaurant, userLocation])

  return null
}

function RestaurantMap() {
  const {
    filteredRestaurants,
    isNearMeActive,
    loading,
    selectedRestaurant,
    setSelectedRestaurantId,
    userLocation,
  } = useAppData()

  const mapRestaurants = useMemo(
    () =>
      filteredRestaurants.filter(
        (restaurant) =>
          Number.isFinite(restaurant.coordinates?.lat) &&
          Number.isFinite(restaurant.coordinates?.lng),
      ),
    [filteredRestaurants],
  )

  return (
    <section className="map-panel">
      <div className="map-illustration">
        <MapContainer
          center={finlandCenter}
          zoom={5.5}
          minZoom={5}
          maxZoom={18}
          zoomControl={false}
          scrollWheelZoom
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapViewport
            isNearMeActive={isNearMeActive}
            selectedRestaurant={selectedRestaurant}
            userLocation={userLocation}
          />

          {Number.isFinite(userLocation?.lat) && Number.isFinite(userLocation?.lng) ? (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={userLocationPinIcon}
            >
              <Popup className="restaurant-popup">
                <div className="min-w-[150px]">
                  <h3 className="text-sm font-semibold text-emerald-950">Your Location</h3>
                  <p className="mt-1 text-xs text-slate-600">Centered from Near Me</p>
                </div>
              </Popup>
            </Marker>
          ) : null}

          {mapRestaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={[restaurant.coordinates.lat, restaurant.coordinates.lng]}
              icon={restaurantPinIcon}
              eventHandlers={{
                click: () => setSelectedRestaurantId(restaurant.id),
              }}
            >
              <Popup className="restaurant-popup">
                <div className="min-w-[160px]">
                  <h3 className="text-sm font-semibold text-emerald-950">
                    {restaurant.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">{restaurant.city}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          <MapControls
            hasRestaurants={mapRestaurants.length > 0}
            isNearMeActive={isNearMeActive}
            selectedRestaurant={selectedRestaurant}
            userLocation={userLocation}
          />
        </MapContainer>

        <SelectedRestaurantCard restaurant={selectedRestaurant} loading={loading} />
      </div>
    </section>
  )
}

export default RestaurantMap
