import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, Shield, LogOut, Gamepad2, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar(){
  const { count } = useCart()
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#0a0a0c]/90 border-b border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center"><Gamepad2 size={18}/></div>
          <span className="hidden sm:inline">GIFT<span className="text-violet-500">CARD</span> SHOP</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 ml-6 text-sm text-white/70">
          <Link to="/catalog" className="hover:text-white">Catalogue</Link>
          <Link to="/catalog?cat=valorant" className="hover:text-white">Valorant</Link>
          <Link to="/catalog?cat=fc26" className="hover:text-white">FC 26</Link>
          <Link to="/catalog?cat=netflix" className="hover:text-white">Netflix</Link>
        </nav>
        <div className="flex-1" />
        <Link to="/cart" className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10">
          <ShoppingCart size={18}/>
          {count>0 && <span className="absolute -top-1.5 -right-1.5 bg-violet-600 text-white text-[11px] font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">{count}</span>}
        </Link>
        {user ? (
          <div className="flex items-center gap-2">
            <Link to="/orders" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10"><Package size={16}/>Commandes</Link>
            {user.isAdmin && <Link to="/admin" className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400"><Shield size={18}/></Link>}
            <button onClick={logout} className="p-2.5 rounded-xl bg-white/5 border border-white/10"><LogOut size={16}/></button>
            <div className="hidden lg:block text-xs leading-tight">
              <div className="text-white font-medium truncate max-w-[120px]">{user.principal}</div>
              <div className="text-white/50">Internet Identity</div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold">
            <User size={16}/> Connexion
          </Link>
        )}
      </div>
    </header>
  )
}
