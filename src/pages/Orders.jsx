import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'

export default function Orders(){
  const { user, myOrders, retryOrder } = useAuth()
  const { t } = useLang()
  const [retrying, setRetrying] = useState(null)
  const [retryMsg, setRetryMsg] = useState('')
  if(!user) return <div className="max-w-[800px] mx-auto px-4 py-16 text-center">{t('login_required')}<br/><Link to="/login" className="inline-block mt-4 px-6 py-3 rounded-xl bg-lime-400 text-black font-black">{t('login')}</Link></div>
  const list = myOrders()
  const badge = (s)=>{
    if(s.includes('Annulée')) return 'bg-red-500/20 text-red-300 border-red-500/30'
    if(s.includes('Livrée')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    if(s.includes('Confirmée')||s.includes('Payée')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    return 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  }
  if(list.length===0) return (
    <div className="max-w-[800px] mx-auto px-4 py-16 text-center">
      <h2 className="text-xl font-black">{t('no_orders')}</h2>
      <p className="text-white/60 text-sm mt-1">{t('no_orders_d')}</p>
      <Link to="/catalog" className="inline-block mt-4 px-6 py-3 rounded-xl bg-lime-400 text-black font-black">{t('go_catalog')}</Link>
    </div>
  )
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-black">{t('my_orders')}</h1>
      <p className="text-sm text-white/50">{user.provider}{user.email? ` • ${user.email}`: user.principal? ` • ${user.principal}`:''}</p>
      {!user.cloud && <p className="mt-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5">⚠️ Compte local : tes commandes restent sur cet appareil. Crée un compte email pour les retrouver partout et que le support les voie.</p>}
      {retryMsg && <p className="mt-2 text-xs text-white/70">{retryMsg}</p>}
      <div className="mt-6 space-y-3">
        {list.map(o=>(
          <div key={o.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/40">
            <Link to={`/orders/${o.id}`} className="block">
              <div className="flex flex-wrap justify-between gap-2">
                <div className="font-bold">{o.id} • {new Date(o.date).toLocaleString()}</div>
                <span className={`text-xs px-2 py-1 rounded-full font-bold border ${badge(o.status)}`}>{o.status}</span>
              </div>
              <div className="text-sm text-white/60 mt-1">{o.items.length} article(s) • {o.total.toFixed(2)} TND • {o.method==='card'?'Carte':'À la livraison'}{o.customer?.phone? ` • 📞 ${o.customer.phone}`:''}</div>
            </Link>
            {o.syncError && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded-full font-bold border bg-red-500/20 text-red-300 border-red-500/30">⚠️ Non envoyée au support</span>
                <button disabled={retrying===o.id} onClick={async()=>{ setRetrying(o.id); setRetryMsg(''); const ok = await retryOrder(o.id); setRetrying(null); setRetryMsg(ok ? '✓ Envoyée !' : '✗ Échec — vérifie ta connexion puis réessaie.') }} className="px-3 py-1.5 rounded-xl bg-lime-400 text-black font-black disabled:opacity-60">↻ Renvoyer</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
