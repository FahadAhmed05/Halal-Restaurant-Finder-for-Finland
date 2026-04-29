# Halal Restaurant Finder Finland

A React + Vite front-end application for exploring halal restaurants across Finland on an interactive map.

The app loads restaurant data from a public Google Sheet CSV, shows the results on a Leaflet map, and lets users search, filter, and browse individual restaurant detail pages.

## Features

- Interactive Finland map built with `react-leaflet`
- Live restaurant data fetched directly from a published Google Sheet CSV
- CSV parsing and normalization into reusable restaurant objects
- Search by restaurant name or city
- Search by cuisine type
- Cuisine chips for quick filtering
- Clickable map pins with popups
- Selected restaurant detail card on the listing page
- Dynamic single restaurant pages using `/:slug`
- Favorites / wishlist support in local storage
- `Near Me` support using the browser geolocation API
- Responsive layout for desktop and smaller screens

## Tech Stack

- React
- Vite
- React Router
- React Leaflet
- Tailwind CSS v4
- Papa Parse

## Data Source

Restaurant data comes from a public Google Sheet that is converted to CSV in the browser.

The app fetches the sheet directly with `fetch()` and then parses it into JavaScript objects using:

- `useRestaurants` for loading data
- `sheetParser` for CSV to object conversion

## Project Structure

```text
src/
  components/   Reusable UI and map components
  context/      Global app state provider
  hooks/        Custom hooks such as useRestaurants and useGeolocation
  pages/        Route-level pages
  data/         Static app config and menu data
  utils/        Parsing, geo, and helper utilities
```

## How to Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Then open the local URL shown by Vite in your terminal.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Builds the production version of the app.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint on the project.

## Main User Flow

- Open the listing page at `/`
- Browse restaurants from the list or the map
- Click a map marker to see the selected restaurant
- Click a restaurant name to open its detail page at `/:slug`
- Use search and cuisine filters together to narrow results
- Use `Near Me` to center the map around the current user location and highlight the closest restaurant

## Notes

- This is a front-end only project
- No backend, authentication, or database is used
- Some UI values and visual assets are enhanced for presentation where sheet data is limited

## Live Preview

https://halal-restaurant-finder-for-finland.netlify.app/
