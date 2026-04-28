import sampleImage1 from "../assets/images/sampleImage1.jpg";
import sampleImage2 from "../assets/images/sampleImage2.jpg";
import sampleImage3 from "../assets/images/sampleImage3.jpg";
import sampleImage4 from "../assets/images/sampleImage4.jpg";
import sampleImage5 from "../assets/images/sampleImage5.jpg";
import sampleImage6 from "../assets/images/sampleImage6.jpg";
import sampleImage7 from "../assets/images/sampleImage7.jpg";
import sampleImage9 from "../assets/images/sampleImage9jpg";

const plateImages = {
  'smoky-grill-feast': sampleImage1,
  'mix-grill': sampleImage2,
  'rice-bowl': sampleImage3,
  'curry-platter': sampleImage4,
  'midnight-bbq-board': sampleImage5,
  'fusion-grill-platter': sampleImage6,
  'oceanic-rice-bowl': sampleImage7,
  'garden-fresh-bowl': sampleImage9,
  'royal-curry-platter': sampleImage1,
  'tandoori-delight': sampleImage2,
  'spice-route-special': sampleImage4,
  'Fusion': sampleImage7,
};

function PlateArt({ variant }) {
  return (
    <img
      src={plateImages[variant] || sampleImage3}
      alt={variant}
      className="w-full h-full object-contain"
    />
  );
}

export default PlateArt
