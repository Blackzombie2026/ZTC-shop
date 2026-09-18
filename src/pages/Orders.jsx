import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Orders(){
  const { user, myOrders } = useAuth()
  if(!user) return <div className="max-w-[800px] mx-auto px-4 py-16 text-center">Connecte-toi pour voir tes commandes.<br/><Link to="/login" className="inline-block mt-4 px-6 py-3 rounded-xl bg-violet-600 font-bold">Se connecter</Link></div>
  const list = myOrders()
  if(list.length===0) return (
    <div className="max-w-[800px] mx-auto px-4 py-16 text-center">
      <h2 className="text-xl font-black">Aucune commande</h2>
      <p className="text-white/60 text-sm mt-1">Tes achats apparaîtront ici avec les codes à révéler.</p>
      <Link to="/catalog" className="inline-block mt-4 px-6 py-3 rounded-xl bg-violet-600 font-bold">Aller au catalogue</Link>
    </div>
  )
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-black">Mes commandes</h1>
      <p className="text-sm text-white/50">Connecté via {user.provider}{user.email? ` • ${user.email}`: user.principal? ` • ${user.principal}`:''}</p>
      <div className="mt-6 space-y-3">
        {list.map(o=>(
          <Link key={o.id} to={`/orders/${o.id}`} className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30">
            <div className="flex flex-wrap justify-between gap-2">
              <div className="font-bold">{o.id} • {new Date(o.date).toLocaleString('fr-FR')}</div>
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${o.status.includes('Payée')?'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30':'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>{o.status}</span>
            </div>
            <div className="text-sm text-white/60 mt-1">{o.items.length} article(s) • {o.total.toFixed(2)} TND • {o.method==='card'?'Carte':'À la livraison'}</div>
            <div className="text-xs text-violet-400 mt-2">Voir les codes →</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
