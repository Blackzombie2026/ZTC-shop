import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'

export default function Cart(){
  const { cart, updateQty, removeItem, total } = useCart()
  const { t } = useLang()
  const nav = useNavigate()
  if(cart.length===0) return (
    <div className="max-w-[800px] mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">🛒</div>
      <h2 className="text-2xl font-black">{t('cart_empty_t')}</h2>
      <p className="text-white/60 mt-2">{t('cart_empty_d')}</p>
      <Link to="/catalog" className="inline-block mt-6 px-6 py-3 rounded-xl bg-violet-600 font-bold">{t('browse')}</Link>
    </div>
  )
  return (
    <div className="max-w-[1100px] mx-auto px-4 py-8 grid lg:grid-cols-[1fr_360px] gap-6">
      <div>
        <h1 className="text-2xl font-black">{t('cart')} ({cart.length})</h1>
        <div className="mt-4 space-y-3">
          {cart.map(item=>(
            <div key={item.key} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover"/>
              <div className="flex-1">
                <div className="font-bold leading-tight">{item.name}</div>
                <div className="text-xs text-white/50">{item.variantLabel} • {item.category}</div>
                <div className="text-sm font-bold text-violet-400 mt-1">{item.price.toFixed(2)} TND</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 bg-black/30 rounded-xl p-1 border border-white/10">
                  <button onClick={()=>updateQty(item.key, item.qty-1)} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center"><Minus size={12}/></button>
                  <span className="w-7 text-center text-sm font-bold">{item.qty}</span>
                  <button onClick={()=>updateQty(item.key, item.qty+1)} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center"><Plus size={12}/></button>
                </div>
                <button onClick={()=>removeItem(item.key)} className="text-xs text-red-400 flex items-center gap-1 hover:text-red-300"><Trash2 size={12}/> X</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 h-fit sticky top-20">
        <h3 className="font-black">{t('total')}</h3>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-white/60"><span>{t('subtotal')}</span><span>{total.toFixed(2)} TND</span></div>
          <div className="flex justify-between text-white/60"><span>{t('fees')}</span><span className="text-emerald-400">{t('free')}</span></div>
          <div className="flex justify-between font-black text-lg border-t border-white/10 pt-2"><span>{t('total')}</span><span className="text-violet-400">{total.toFixed(2)} TND</span></div>
        </div>
        <button onClick={()=>nav('/checkout')} className="mt-4 w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 font-bold flex items-center justify-center gap-2">{t('checkout_btn')} <ArrowRight size={16}/></button>
        <Link to="/catalog" className="mt-2 block text-center text-sm text-white/60 hover:text-white">{t('continue')}</Link>
        <p className="mt-4 text-xs text-white/40">{t('cod_note')}</p>
      </div>
    </div>
  )
}
