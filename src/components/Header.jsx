import { Link } from 'react-router-dom'
import { headerLinks } from '../data/appData'
import useAppData from '../hooks/useAppData'
import { Icon, MapPinIcon, SearchIcon } from './icons'

function Header() {
  const {
    geolocationError,
    geolocationLoading,
    requestNearMe,
    searchQuery,
    searchScope,
    setSearchQuery,
    setSearchScope,
  } =
    useAppData()

  const searchPlaceholder =
    searchScope === 'cuisine'
      ? 'Search by cuisine type...'
      : 'Search by restaurant name or city...'

  return (
    <header className="border-b border-black/5 px-6 py-3.5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <nav className="hidden items-center gap-6 text-sm font-medium text-emerald-950/45 md:flex">
          {headerLinks.map((link) => (
            <Link
              key={link.id}
              to={link.redirectUrl}
              className={link.active ? 'text-emerald-950' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-search-wrap lg:ml-auto">
          <div className="header-search-bar">
            <label className="search-inline-mode">
              <select
                value={searchScope}
                onChange={(event) => setSearchScope(event.target.value)}
                className="search-inline-select"
                aria-label="Choose search type"
              >
                <option value="all">All</option>
                <option value="cuisine">Cuisine Type</option>
              </select>
            </label>

            <span className="search-inline-divider"></span>

            <label className="search-shell search-shell-inline">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-sm text-emerald-950 placeholder:text-emerald-950/35 focus:outline-none"
              />
              <SearchIcon />
            </label>

            <button
              type="button"
              className="near-button near-button-compact cursor-pointer"
              onClick={requestNearMe}
              disabled={geolocationLoading}
              title={geolocationError || 'Find restaurants near your location'}
            >
              <MapPinIcon className="h-4 w-4" />
              {geolocationLoading ? 'Locating...' : 'Near Me'}
            </button>

            <button type="button" className="profile-button" aria-label="Open profile">
              <Icon className="h-4 w-4">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20a7 7 0 0 1 14 0" />
              </Icon>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
