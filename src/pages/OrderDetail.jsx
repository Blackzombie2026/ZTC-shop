import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeOff, Copy, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function OrderDetail(){
  const { id } = useParams()
  const { orders } = useAuth()
  const order = orders.find(o=> o.id===id)
  const [revealed, setRevealed] = useState({})
  const [copied, setCopied] = useState(null)

  if(!order) return <div className="max-w-[800px] mx-auto px-4 py-16">Commande introuvable.</div>

  const copy = (code)=>{
    navigator.clipboard.writeText(code); setCopied(code); setTimeout(()=>setCopied(null),1500)
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <Link to="/orders" className="text-sm text-white/60 hover:text-white">← Retour</Link>
      <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 p-6">
        <div className="flex flex-wrap justify-between gap-2">
          <h1 className="text-xl font-black">{order.id}</h1>
          <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">{order.status}</span>
        </div>
        <div className="text-sm text-white/50 mt-1">{new Date(order.date).toLocaleString('fr-FR')} • {order.method==='card'?'Payée par carte':'Payer à la livraison'} • {order.total.toFixed(2)} TND</div>
        <div className="text-xs text-white/50 mt-1">Client: {order.customer.name} • {order.customer.email}{order.customer.phone? ` • 📞 ${order.customer.phone}`:''}{order.customer.address? ` • ${order.customer.address}`:''}</div>
      </div>

      <div className="mt-6">
        <h2 className="font-black mb-3">Tes codes ({order.items.length}) — clique pour révéler</h2>
        <div className="space-y-3">
          {order.items.map((it, idx)=>(
            <div key={idx} className="p-4 rounded-2xl bg-[#18181b] border border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
              <img src={it.image} alt={it.name} className="w-16 h-16 rounded-xl object-cover"/>
              <div className="flex-1">
                <div className="font-bold text-sm">{it.name} • {it.variantLabel} ×{it.qty}</div>
                <div className="text-xs text-white/50">{it.category} • {it.price.toFixed(2)} TND</div>
                <div className="mt-2 font-mono text-sm bg-black/40 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                  <span className={revealed[idx]?'':'blur-sm select-none'}>{it.code}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={()=>setRevealed(r=>({...r,[idx]:!r[idx]}))} className="p-1.5 rounded-lg bg-white/10">
                      {revealed[idx]? <EyeOff size={14}/>:<Eye size={14}/>}
                    </button>
                    <button onClick={()=>copy(it.code)} className="p-1.5 rounded-lg bg-violet-600">
                      {copied===it.code? <Check size={14}/>:<Copy size={14}/>}
                    </button>
                  </div>
                </div>
                {!revealed[idx] && <div className="text-[11px] text-amber-300 mt-1">⚠️ Ne partage pas ce code. Une seule révélation est enregistrée.</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl bg-violet-600/10 border border-violet-500/20 text-sm text-violet-200">
          Besoin d'aide ? Contacte le support avec ton ID de commande <span className="font-mono font-bold">{order.id}</span>.
        </div>
      </div>
    </div>
  )
}
