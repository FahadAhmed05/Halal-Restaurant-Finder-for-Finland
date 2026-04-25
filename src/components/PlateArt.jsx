function PlateArt({ variant }) {
  if (variant === 'rice-bowl') {
    return (
      <div className="plate-art rice-bowl">
        <div className="plate"></div>
        <div className="food rice"></div>
        <div className="food stew"></div>
      </div>
    )
  }

  if (variant === 'curry-platter') {
    return (
      <div className="plate-art curry-platter">
        <div className="plate"></div>
        <div className="food naan"></div>
        <div className="food curry"></div>
        <div className="food garnish"></div>
      </div>
    )
  }

  return (
    <div className="plate-art mix-grill">
      <div className="board"></div>
      <div className="skewer skewer-1"></div>
      <div className="skewer skewer-2"></div>
      <div className="bowl bowl-1"></div>
      <div className="bowl bowl-2"></div>
    </div>
  )
}

export default PlateArt
