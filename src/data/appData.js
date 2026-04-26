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
]
