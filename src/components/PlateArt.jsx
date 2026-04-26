import sampleImage1 from "../assets/images/sampleImage1.jpg";
import sampleImage2 from "../assets/images/sampleImage2.jpg";
import sampleImage3 from "../assets/images/sampleImage3.jpg";

function PlateArt({ variant }) {
  if (variant === 'rice-bowl') {
    return (
      <img src={sampleImage2} alt={variant} className="w-full h-full object-contain" />
      // <div className="plate-art rice-bowl">
      //   <div className="plate"></div>
      //   <div className="food rice"></div>
      //   <div className="food stew"></div>
      // </div>
    )
  }

  if (variant === 'curry-platter') {
    return (
      <img src={sampleImage1} alt={variant} className="w-full h-full object-contain" />
      // <div className="plate-art curry-platter">
      //   <div className="plate"></div>
      //   <div className="food naan"></div>
      //   <div className="food curry"></div>
      //   <div className="food garnish"></div>
      // </div>
    )
  }

  return (
    <img src={sampleImage3} alt={variant} className="w-full h-full object-contain" />
    // <div className="plate-art mix-grill">
    //   <div className="board"></div>
    //   <div className="skewer skewer-1"></div>
    //   <div className="skewer skewer-2"></div>
    //   <div className="bowl bowl-1"></div>
    //   <div className="bowl bowl-2"></div>
    // </div>
  )
}

export default PlateArt
