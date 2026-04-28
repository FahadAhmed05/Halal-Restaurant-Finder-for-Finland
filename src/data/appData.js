export const menuData = [
  { id: 1, label: 'Restaurants', icon: 'restaurant', path: '/', active: true },
  { id: 2, label: 'Mosques', icon: 'mosque', active: false },
  { id: 3, label: 'Favorites', icon: 'heart', path: '/favorites', active: false },
  { id: 4, label: 'Settings', icon: 'settings', active: false },
]

export const headerLinks = [
  { id: 1, label: 'Discover', active: true, redirectUrl: "/" },
  { id: 2, label: 'Favorites', active: false, redirectUrl: "/favorites" },
  { id: 3, label: 'Recent', active: false },
]

export const fallbackCategories = ['All', 'Halal Certified', 'Halal Friendly', 'Open Now']

export const sheetSourceUrl = import.meta.env.VITE_GOOGLE_SHEET_URL

export const restaurantCardThemes = [
  { accent: 'from-[#3d2618] via-[#855029] to-[#15110f]', plate: 'mix-grill' },
  { accent: 'from-[#1a2f36] via-[#49697e] to-[#161412]', plate: 'rice-bowl' },
  { accent: 'from-[#562b14] via-[#965227] to-[#16110e]', plate: 'curry-platter' },
  { accent: 'from-[#3d2618] via-[#855029] to-[#15110f]', plate: 'smoky-grill-feast' },
  { accent: 'from-[#1a2f36] via-[#49697e] to-[#161412]', plate: 'oceanic-rice-bowl' },
  { accent: 'from-[#562b14] via-[#965227] to-[#16110e]', plate: 'royal-curry-platter' },
  { accent: 'from-[#2e1f27] via-[#6a3f4f] to-[#120d11]', plate: 'midnight-bbq-board' },
  { accent: 'from-[#1c2b1f] via-[#4e7c59] to-[#0f1411]', plate: 'garden-fresh-bowl' },
  { accent: 'from-[#2a1a12] via-[#7a4b2a] to-[#140e0a]', plate: 'tandoori-delight' },
  { accent: 'from-[#0f2027] via-[#2c5364] to-[#0b1215]', plate: 'fusion-grill-platter' },
  { accent: 'from-[#3a1c71] via-[#d76d77] to-[#1a0f2e]', plate: 'spice-route-special' },
  { accent: 'from-[#0f2027] via-[#2c5364] to-[#0b1215]', plate: 'Fusion' },
]
