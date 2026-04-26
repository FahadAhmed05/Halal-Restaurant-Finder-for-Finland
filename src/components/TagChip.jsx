function TagChip({
  label,
  isActive = false,
  onClick,
  className = '',
  activeClassName = '',
  inactiveClassName = '',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`.trim()}
    >
      {label}
    </button>
  )
}

export default TagChip
