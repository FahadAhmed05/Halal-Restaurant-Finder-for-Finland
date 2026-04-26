import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'
import WishlistPage from './pages/WishlistPage'
import RestaurantDetailPage from './pages/RestaurantDetailPage'

function App() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] px-4 py-4 text-slate-900 antialiased sm:px-5">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/:slug" element={<RestaurantDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
