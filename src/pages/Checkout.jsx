import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Truck, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function genCode(){ const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s=''; for(let i=0;i<16;i++) s+=chars[Math.floor(Math.random()*chars.length)]; return s.match(/.{1,4}/g).join('-') }

export default function Checkout(){
  const { cart, total, clearCart } = useCart()
  const { user, addOrder } = useAuth()
  const nav = useNavigate()
  const [method, setMethod] = useState('card')
  const [form, setForm] = useState({ name:'', email:'', address:'', cardNumber:'', exp:'', cvc:'' })
  const [loading, setLoading] = useState(false)

  if(cart.length===0) return <div className="max-w-[600px] mx-auto px-4 py-16 text-center">Panier vide.</div>
  if(!user) return (
    <div className="max-w-[600px] mx-auto px-4 py-16 text-center">
      <Lock className="mx-auto text-violet-400" size={32}/>
      <h2 className="text-xl font-black mt-3">Connexion requise</h2>
      <p className="text-white/60 text-sm mt-1">Connecte-toi avec Internet Identity pour commander et retrouver tes codes.</p>
      <button onClick={()=>nav('/login')} className="mt-4 px-6 py-3 rounded-xl bg-violet-600 font-bold">Se connecter</button>
    </div>
  )

  const handlePay = async (e)=>{
    e.preventDefault()
    if(method==='card' && (!form.cardNumber || !form.exp || !form.cvc)) return alert('Remplis les infos carte')
    if(!form.email || !form.name) return alert('Nom et email requis')
    setLoading(true)
    await new Promise(r=> setTimeout(r, 900))
    const order = {
      id: 'ORD-'+Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      items: cart.map(c=> ({...c, code: genCode()})),
      total, method, customer: { name: form.name, email: form.email, address: form.address },
      principal: user.principal,
      status: method==='cod' ? 'En attente (paiement à la livraison)' : 'Payée • Codes disponibles'
    }
    addOrder(order)
    clearCart()
    nav(`/orders/${order.id}`)
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-8 grid lg:grid-cols-[1fr_380px] gap-6">
      <form onSubmit={handlePay} className="space-y-6">
        <h1 className="text-2xl font-black">Paiement</h1>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <h3 className="font-bold mb-3">Informations</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Nom complet" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="px-3 py-3 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:border-violet-500"/>
            <input placeholder="Email (envoi des codes)" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="px-3 py-3 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:border-violet-500"/>
            <input placeholder="Adresse (si livraison)" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className="sm:col-span-2 px-3 py-3 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:border-violet-500"/>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <h3 className="font-bold mb-3">Mode de paiement</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <button type="button" onClick={()=>setMethod('card')} className={`p-4 rounded-xl border text-left flex gap-3 ${method==='card'?'bg-violet-600 border-violet-600':'bg-black/20 border-white/10'}`}>
              <CreditCard size={20}/><div><div className="font-bold text-sm">Carte bancaire</div><div className="text-xs opacity-70">Visa / Mastercard • Sécurisé</div></div>
            </button>
            <button type="button" onClick={()=>setMethod('cod')} className={`p-4 rounded-xl border text-left flex gap-3 ${method==='cod'?'bg-violet-600 border-violet-600':'bg-black/20 border-white/10'}`}>
              <Truck size={20}/><div><div className="font-bold text-sm">Payer à la livraison</div><div className="text-xs opacity-70">Cash • Confirmation immédiate</div></div>
            </button>
          </div>
          {method==='card' && (
            <div className="grid sm:grid-cols-3 gap-3 mt-4">
              <input placeholder="Numéro de carte 4242 4242 4242 4242" value={form.cardNumber} onChange={e=>setForm({...form,cardNumber:e.target.value})} className="sm:col-span-3 px-3 py-3 rounded-xl bg-black/30 border border-white/10"/>
              <input placeholder="MM/AA" value={form.exp} onChange={e=>setForm({...form,exp:e.target.value})} className="px-3 py-3 rounded-xl bg-black/30 border border-white/10"/>
              <input placeholder="CVC" value={form.cvc} onChange={e=>setForm({...form,cvc:e.target.value})} className="px-3 py-3 rounded-xl bg-black/30 border border-white/10"/>
              <div className="text-xs text-white/40 flex items-center gap-1"><Lock size={12}/> Chiffrement SSL • Aucun stockage carte</div>
            </div>
          )}
          {method==='cod' && <p className="text-xs text-amber-300 mt-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">Tu recevras une confirmation instantanée. Le code sera marqué “à révéler après livraison”. Notre livreur confirmera le paiement.</p>}
        </div>

        <button disabled={loading} className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-700 font-black disabled:opacity-60">
          {loading? 'Traitement...' : method==='card' ? `Payer ${total.toFixed(2)} TND` : `Confirmer commande • ${total.toFixed(2)} TND à la livraison`}
        </button>
      </form>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 h-fit sticky top-20">
        <h3 className="font-black">Commande</h3>
        <div className="mt-3 space-y-2">
          {cart.map(i=> <div key={i.key} className="flex justify-between text-sm"><span className="text-white/70">{i.name} ×{i.qty} <span className="text-white/40">({i.variantLabel})</span></span><span className="font-semibold">{(i.price*i.qty).toFixed(2)} TND</span></div>)}
          <div className="flex justify-between font-black border-t border-white/10 pt-2"><span>Total</span><span className="text-violet-400">{total.toFixed(2)} TND</span></div>
        </div>
        <div className="mt-4 text-xs text-white/40">En confirmant, tes codes seront générés et visibles dans “Mes commandes”.</div>
      </div>
    </div>
  )
}
