import { headerLinks } from '../data/appData'
import { Icon, MapPinIcon, SearchIcon } from './icons'

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-black/5 px-6 py-4">
      <nav className="hidden items-center gap-6 text-sm font-medium text-emerald-950/45 md:flex">
        {headerLinks.map((link) => (
          <a
            key={link.id}
            href="/"
            onClick={(event) => event.preventDefault()}
            className={link.active ? 'text-emerald-950' : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <label className="search-shell">
          <input
            type="text"
            placeholder="Search Helsinki..."
            className="w-full bg-transparent text-sm text-emerald-950 placeholder:text-emerald-950/35 focus:outline-none"
          />
          <SearchIcon />
        </label>

        <button type="button" className="near-button">
          <MapPinIcon className="h-4 w-4" />
          Near Me
        </button>

        <button type="button" className="profile-button" aria-label="Open profile">
          <Icon className="h-4 w-4">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20a7 7 0 0 1 14 0" />
          </Icon>
        </button>
      </div>
    </header>
  )
}

export default Header
