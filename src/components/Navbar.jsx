import { Link } from 'react-router-dom'
import { ShoppingCart, User, Shield, LogOut, Package, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useLang, LANGS } from '../context/LanguageContext'

const providerLabel = { email:'Email', discord:'Discord', facebook:'Facebook', 'Internet Identity':'Internet Identity' }
const providerColor = { email:'bg-emerald-500', discord:'bg-[#5865F2]', facebook:'bg-[#1877F2]', 'Internet Identity':'bg-violet-600' }

export default function Navbar(){
  const { count } = useCart()
  const { user, logout } = useAuth()
  const { lang, setLang, t } = useLang()
  const logoUrl = `${import.meta.env.BASE_URL}logo.svg`
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#0a0a0c]/90 border-b border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
          <img src={logoUrl} alt="ZTC Shop" className="w-10 h-10 rounded-xl object-contain bg-white/5 border border-white/10"/>
          <span className="hidden sm:inline">ZTC<span className="text-violet-500"> SHOP</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 ml-4 text-sm text-white/70">
          <Link to="/catalog" className="hover:text-white">{t('catalog')}</Link>
          <Link to="/catalog?cat=valorant" className="hover:text-white">Valorant</Link>
          <Link to="/catalog?cat=fc26" className="hover:text-white">FC 26</Link>
          <Link to="/catalog?cat=netflix" className="hover:text-white">Netflix</Link>
        </nav>
        <div className="flex-1" />
        {/* Support animé -> page dédiée */}
        <Link to="/support" title={t('support')}
          className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:brightness-110 text-white text-sm font-black animate-support-ring">
          <MessageCircle size={17} className="animate-support-bounce"/>
          <span className="hidden sm:inline">{t('support')}</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#0a0a0c] animate-ping"/>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#0a0a0c]"/>
        </Link>
        {/* Lang switcher */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
          {LANGS.map(l=>(
            <button key={l.id} onClick={()=>setLang(l.id)} title={l.label}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-black ${lang===l.id?'bg-violet-600 text-white':'text-white/60 hover:text-white'}`}>
              {l.id.toUpperCase()}
            </button>
          ))}
        </div>
        <Link to="/cart" className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10">
          <ShoppingCart size={18}/>
          {count>0 && <span key={count} className="badge-pop absolute -top-1.5 -right-1.5 bg-violet-600 text-white text-[11px] font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">{count}</span>}
        </Link>
        {user ? (
          <div className="flex items-center gap-2">
            <Link to="/orders" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10"><Package size={16}/>{t('orders')}</Link>
            {user.isAdmin && <Link to="/admin" className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400"><Shield size={18}/></Link>}
            <button onClick={logout} title={t('logout')} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"><LogOut size={16}/></button>
            <div className="hidden lg:flex items-center gap-2">
              {user.avatar
                ? <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover"/>
                : <div className={`w-8 h-8 rounded-full ${providerColor[user.provider]||'bg-violet-600'} flex items-center justify-center font-black text-sm`}>{(user.name||user.email||'?')[0].toUpperCase()}</div>
              }
              <div className="text-xs leading-tight">
                <div className="text-white font-bold truncate max-w-[120px]">{user.name || user.email || user.principal?.slice(0,12)}</div>
                <div className="text-white/50">{providerLabel[user.provider]||user.provider}</div>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold">
            <User size={16}/> {t('login')}
          </Link>
        )}
      </div>
    </header>
  )
}
