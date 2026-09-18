import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Login from './pages/Login'
import Admin from './pages/Admin'

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#0a0a0c]">
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/catalog" element={<Catalog/>}/>
              <Route path="/product/:id" element={<ProductDetail/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/checkout" element={<Checkout/>}/>
              <Route path="/orders" element={<Orders/>}/>
              <Route path="/orders/:id" element={<OrderDetail/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/admin" element={<Admin/>}/>
            </Routes>
            <footer className="border-t border-white/10 mt-8 py-6 text-center text-xs text-white/40">
              © 2026 GIFT CARD SHOP • Codes promo & avis clients reportés • Démo locale (pas de vrai paiement)
            </footer>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
