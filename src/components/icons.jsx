function Icon({ children, className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function SidebarIcon({ type }) {
  const common = 'h-4 w-4'

  if (type === 'restaurant') {
    return (
      <Icon className={common}>
        <path d="M6 3v8" />
        <path d="M10 3v8" />
        <path d="M6 7h4" />
        <path d="M18 3v18" />
        <path d="M14 12h8" />
      </Icon>
    )
  }

  if (type === 'mosque') {
    return (
      <Icon className={common}>
        <path d="M4 20h16" />
        <path d="M6 20v-6l6-4 6 4v6" />
        <path d="M12 6V3" />
        <path d="M9 10V8a3 3 0 0 1 6 0v2" />
      </Icon>
    )
  }

  if (type === 'heart') {
    return (
      <Icon className={common}>
        <path d="m12 20-1.4-1.27C5.4 14 2 10.92 2 7.16 2 4.08 4.42 2 7.3 2c1.82 0 3.56.9 4.7 2.3C13.14 2.9 14.88 2 16.7 2 19.58 2 22 4.08 22 7.16c0 3.76-3.4 6.84-8.6 11.57Z" />
      </Icon>
    )
  }

  return (
    <Icon className={common}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 1-2 0 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 1 0-2 1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 1 2 0 1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c0 .38.22.74.6 1a1.7 1.7 0 0 1 0 2c-.38.26-.6.62-.6 1" />
    </Icon>
  )
}

function SearchIcon() {
  return (
    <Icon className="h-3.5 w-3.5 text-emerald-900/45">
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
    </Icon>
  )
}

function MapPinIcon({ className = 'h-4 w-4' }) {
  return (
    <Icon className={className}>
      <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Icon>
  )
}

export { Icon, MapPinIcon, SearchIcon, SidebarIcon }
