function TagChip({
  label,
  isActive = false,
  className = '',
  activeClassName = '',
  inactiveClassName = '',
}) {
  return (
    <button
      type="button"
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`.trim()}
    >
      {label}
    </button>
  )
}

export default TagChip
