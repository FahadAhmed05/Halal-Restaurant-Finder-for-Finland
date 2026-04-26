import { divIcon } from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useEffect } from 'react'

const finlandCenter = [64.5, 26]

const detailPinIcon = divIcon({
  className: 'restaurant-marker-wrapper',
  html: '<div class="restaurant-marker-pin restaurant-marker-pin-large"></div>',
  iconSize: [26, 26],
  iconAnchor: [13, 26],
})

function DetailViewport({ restaurant }) {
  const map = useMap()

  useEffect(() => {
    if (
      restaurant?.coordinates?.lat &&
      restaurant?.coordinates?.lng
    ) {
      map.flyTo([restaurant.coordinates.lat, restaurant.coordinates.lng], 13, {
        duration: 0.9,
      })
      return
    }

    map.flyTo(finlandCenter, 5.5, { duration: 0.9 })
  }, [map, restaurant])

  return null
}

function RestaurantDetailMap({ restaurant }) {
  const hasCoordinates =
    Number.isFinite(restaurant?.coordinates?.lat) &&
    Number.isFinite(restaurant?.coordinates?.lng)

  return (
    <div className="detail-map-shell">
      <MapContainer
        center={finlandCenter}
        zoom={5.5}
        minZoom={5}
        maxZoom={18}
        zoomControl
        scrollWheelZoom
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <DetailViewport restaurant={restaurant} />

        {hasCoordinates ? (
          <Marker
            position={[restaurant.coordinates.lat, restaurant.coordinates.lng]}
            icon={detailPinIcon}
          />
        ) : null}
      </MapContainer>

      {restaurant ? (
        <div className="detail-map-label">
          <span className="map-card-bullet"></span>
          <span>{restaurant.name}</span>
        </div>
      ) : null}
    </div>
  )
}

export default RestaurantDetailMap
