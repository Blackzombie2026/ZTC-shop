import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { initialProducts } from '../data/products'
import { Plus, Trash2, Save } from 'lucide-react'

export default function Admin(){
  const { user, orders, updateOrderStatus, products, setProducts } = useAuth()
  const prods = products || initialProducts
  const [tab, setTab] = useState('products')
  const [newProd, setNewProd] = useState({ name:'', category:'valorant', price:'', label:'' })

  if(!user?.isAdmin) return (
    <div className="max-w-[600px] mx-auto px-4 py-16 text-center">
      <h2 className="text-xl font-black">Accès administrateur requis</h2>
      <p className="text-white/60 text-sm mt-1">Connecte-toi avec le bouton “Connexion Admin” sur la page Login.</p>
    </div>
  )

  const initIfNeeded = ()=> { if(!products) setProducts(initialProducts) }

  const handleAddVariant = ()=>{
    if(!newProd.name || !newProd.price) return alert('Nom et prix requis')
    const p = {
      id: 'custom-'+Date.now(), category: newProd.category, name: newProd.name, subtitle:'Ajouté via admin',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400', badge:'NEW',
      description:'Produit créé depuis la console admin.', variants:[{id:'var-'+Date.now(), label:newProd.label||newProd.price+' TND', price: parseFloat(newProd.price)}],
      stock: 50, rating: 5.0
    }
    setProducts([p, ...prods]); setNewProd({ name:'', category:'valorant', price:'', label:'' })
  }

  const changeStock = (id, delta)=>{
    setProducts(prods.map(p=> p.id===id? {...p, stock: Math.max(0, p.stock+delta)}:p))
  }
  const deleteProd = (id)=> setProducts(prods.filter(p=> p.id!==id))

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-black">Console d'administration</h1>
      <p className="text-sm text-white/50">Gère produits, stock de codes et commandes. Protégé par Internet Identity (rôle admin).</p>
      <div className="flex gap-2 mt-4">
        <button onClick={()=>setTab('products')} className={`px-4 py-2 rounded-xl text-sm font-bold border ${tab==='products'?'bg-violet-600 border-violet-600':'bg-white/5 border-white/10'}`}>Produits & Stock</button>
        <button onClick={()=>setTab('orders')} className={`px-4 py-2 rounded-xl text-sm font-bold border ${tab==='orders'?'bg-violet-600 border-violet-600':'bg-white/5 border-white/10'}`}>Commandes ({orders.length})</button>
        <button onClick={initIfNeeded} className="ml-auto text-xs px-3 py-2 rounded-xl bg-white/5 border border-white/10">Réinitialiser DB démo</button>
      </div>

      {tab==='products' && (
        <div className="mt-6">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 grid md:grid-cols-5 gap-3">
            <input placeholder="Nom produit" value={newProd.name} onChange={e=>setNewProd({...newProd,name:e.target.value})} className="px-3 py-2.5 rounded-xl bg-black/30 border border-white/10"/>
            <select value={newProd.category} onChange={e=>setNewProd({...newProd,category:e.target.value})} className="px-3 py-2.5 rounded-xl bg-black/30 border border-white/10">
              <option value="valorant">Valorant</option><option value="lol">LoL</option><option value="fc26">FC26</option><option value="pubg">PUBG</option><option value="roblox">Roblox</option><option value="freefire">Free Fire</option><option value="netflix">Netflix</option><option value="other">Autres</option>
            </select>
            <input placeholder="Label (ex 1000 VP)" value={newProd.label} onChange={e=>setNewProd({...newProd,label:e.target.value})} className="px-3 py-2.5 rounded-xl bg-black/30 border border-white/10"/>
            <input placeholder="Prix TND" type="number" value={newProd.price} onChange={e=>setNewProd({...newProd,price:e.target.value})} className="px-3 py-2.5 rounded-xl bg-black/30 border border-white/10"/>
            <button onClick={handleAddVariant} className="px-4 py-2.5 rounded-xl bg-violet-600 font-bold flex items-center justify-center gap-2"><Plus size={16}/> Ajouter</button>
          </div>

          <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {prods.map(p=>(
              <div key={p.id} className="rounded-2xl bg-[#18181b] border border-white/10 p-4">
                <div className="flex gap-3">
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover"/>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate">{p.name}</div>
                    <div className="text-xs text-white/50">{p.category} • {p.variants.map(v=> v.label+' '+v.price.toFixed(2)+' TND').join(', ')}</div>
                    <div className="text-xs mt-1">Stock: <span className="font-bold text-violet-400">{p.stock}</span> codes</div>
                  </div>
                  <button onClick={()=>deleteProd(p.id)} className="p-2 rounded-xl bg-red-500/20 text-red-400 h-fit"><Trash2 size={14}/></button>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={()=>changeStock(p.id,-10)} className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-xs">-10</button>
                  <button onClick={()=>changeStock(p.id,-1)} className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-xs">-1</button>
                  <button onClick={()=>changeStock(p.id,1)} className="flex-1 py-2 rounded-xl bg-violet-600 text-xs font-bold">+1</button>
                  <button onClick={()=>changeStock(p.id,10)} className="flex-1 py-2 rounded-xl bg-violet-600 text-xs font-bold">+10</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='orders' && (
        <div className="mt-6 space-y-3">
          {orders.length===0 && <div className="text-white/50 text-center py-8">Aucune commande pour l'instant.</div>}
          {orders.map(o=>(
            <div key={o.id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex flex-wrap justify-between gap-2">
                <div className="font-bold text-sm">{o.id} • {o.customer.name} • {o.customer.email}</div>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10">{o.status}</span>
              </div>
              <div className="text-xs text-white/50 mt-1">{new Date(o.date).toLocaleString('fr-FR')} • {o.total.toFixed(2)} TND • {o.method} • Principal {o.principal.slice(0,12)}...</div>
              <div className="text-xs mt-2">{o.items.map(i=> `${i.name} (${i.variantLabel}) ×${i.qty} → ${i.code}`).join(' | ')}</div>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>updateOrderStatus(o.id,'Payée • Codes disponibles')} className="px-3 py-1.5 rounded-xl bg-emerald-600 text-xs font-bold">Marquer payée</button>
                <button onClick={()=>updateOrderStatus(o.id,'Livrée')} className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs">Marquer livrée</button>
                <button onClick={()=>updateOrderStatus(o.id,'Annulée')} className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 text-xs">Annuler</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
