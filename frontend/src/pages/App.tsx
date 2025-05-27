import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { 
  HomePage, 
  CatalogPage, 
  ProductPage, 
  CartPage, 
  ProfilePage 
} from './pages'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App