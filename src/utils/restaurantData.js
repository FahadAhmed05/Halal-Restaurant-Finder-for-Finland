import Papa from 'papaparse'
import { fallbackCategories, restaurantCardThemes } from '../data/appData'

function sanitizeText(value) {
  return String(value ?? '')
    .replace(/^\uFEFF/, '')
    .replace(/\u202f/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeHeader(header) {
  return sanitizeText(header).toLowerCase().replace(/\s+/g, '_')
}

function buildGoogleSheetCsvUrl(sourceUrl) {
  const url = new URL(sourceUrl)
  const gidFromHash = url.hash.match(/gid=(\d+)/)?.[1]
  const gidFromQuery = url.searchParams.get('gid')
  const gid = gidFromHash || gidFromQuery || '0'

  url.hash = ''
  url.search = ''

  if (url.pathname.endsWith('/pubhtml')) {
    url.pathname = url.pathname.replace(/\/pubhtml$/, '/pub')
  } else if (!url.pathname.endsWith('/pub')) {
    url.pathname = `${url.pathname.replace(/\/$/, '')}/pub`
  }

  url.searchParams.set('output', 'csv')
  url.searchParams.set('gid', gid)

  return url.toString()
}

function parseCsvText(csvText) {
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: normalizeHeader,
  })

  if (parsed.errors.length > 0) {
    const message = parsed.errors[0]?.message || 'Failed to parse CSV data.'
    throw new Error(message)
  }

  return parsed.data
}

function parseCoordinate(value) {
  const parsed = Number.parseFloat(sanitizeText(value))
  return Number.isFinite(parsed) ? parsed : null
}

function normalizePhone(value) {
  const sanitized = sanitizeText(value)
  return sanitized ? sanitized.replace(/\s+/g, ' ') : ''
}

function normalizeWebsite(value) {
  const sanitized = sanitizeText(value)

  if (!sanitized) {
    return ''
  }

  if (/^https?:\/\//i.test(sanitized)) {
    return sanitized
  }

  return `https://${sanitized}`
}

function createSlug(parts) {
  return parts
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildTags({ cuisine, city, halalStatus }) {
  return [cuisine, city, halalStatus].filter(Boolean)
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

  return ['All', ...dynamicCategories.slice(0, 3)]
}

function normalizeRestaurant(row, index) {
  const name = sanitizeText(row.name)
  const address = sanitizeText(row.address)
  const city = sanitizeText(row.city)
  const cuisine = sanitizeText(row.cuisine)
  const halalStatus = sanitizeText(row.halal_status)
  const phone = normalizePhone(row.phone)
  const website = normalizeWebsite(row.website)
  const hours = sanitizeText(row.hours)
  const lat = parseCoordinate(row.lat)
  const lng = parseCoordinate(row.lng)
  const theme = restaurantCardThemes[index % restaurantCardThemes.length]

  return {
    id: createSlug([name, city, index + 1]) || `restaurant-${index + 1}`,
    name,
    address,
    city,
    cuisine,
    halalStatus,
    phone,
    website,
    hours,
    coordinates: { lat, lng },
    tags: buildTags({ cuisine, city, halalStatus }),
    badgeText: halalStatus || city || 'Halal Spot',
    accent: theme.accent,
    plate: theme.plate,
  }
}

function normalizeRestaurants(rows) {
  return rows
    .map((row, index) => normalizeRestaurant(row, index))
    .filter((restaurant) => restaurant.name)
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

async function fetchRestaurantSheet(sourceUrl, signal) {
  const response = await fetch(buildGoogleSheetCsvUrl(sourceUrl), { signal })

  if (!response.ok) {
    throw new Error(`Failed to load sheet data (${response.status}).`)
  }

  const csvText = await response.text()
  const rows = parseCsvText(csvText)
  const restaurants = normalizeRestaurants(rows)

  return {
    rawRows: rows,
    restaurants,
    categories: buildCategories(restaurants),
    featuredRestaurant: buildFeaturedRestaurant(restaurants),
  }
}

export { buildGoogleSheetCsvUrl, fetchRestaurantSheet }
