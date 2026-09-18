import { Link } from 'react-router-dom'
import { ArrowRight, Zap, ShieldCheck, Truck, Clock } from 'lucide-react'
import { initialProducts, categories } from '../data/products'

const heroCats = [
  { id:'valorant', label:'Valorant', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7raq6TZniTT-h3tAcCp4gTt1qayp_6_4m5VYdEKZf2w&s=10' },
  { id:'lol', label:'League of Legends', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNztnpwTexsNw2a58jD4GD3VukhzYqPHAouBNgep7nzA&s=10' },
  { id:'fc26', label:'FC 26 Coins', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPfUeZMBSqKcCZINmj7HGMN4nDmh3OVPLURigP-u5bg&s=10' },
  { id:'pubg', label:'PUBG UC', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2k0Xlx3K5dZvgyfn4R20bh_OFVCv93xOJkyMmx-g-Zg&s=10' },
  { id:'roblox', label:'Roblox', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyCcKCRn3kSwAHeU7aumRfEv7QvfvG639Rn5HkcsNUiA&s=10' },
  { id:'netflix', label:'Netflix', img:'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&q=80&auto=format&fit=crop' },
]

export default function Home(){
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-fuchsia-800/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/20 to-transparent" />
        <div className="relative max-w-[1280px] mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600/20 border border-violet-500/30 text-xs text-violet-300 mb-4">
              <Zap size={14}/> ZTC Shop • Livraison instantanée 24/7 • Codes officiels
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tight">
              ZTC Shop<br/>
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">gift cards</span><br/>
              gaming & streaming
            </h1>
            <p className="text-white/60 mt-4 text-lg max-w-lg">Valorant, LoL, FC 26 Coins, PUBG, Roblox, Free Fire, Netflix et plus. Choisis ton montant, paye par carte ou à la livraison, reçois ton code instantanément.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/catalog" className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 font-bold flex items-center gap-2">Parcourir le catalogue <ArrowRight size={18}/></Link>
              <Link to="/catalog?cat=valorant" className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 font-semibold">Voir les VP Valorant</Link>
            </div>
            <div className="flex gap-6 mt-6 text-sm">
              <span className="flex items-center gap-2 text-white/70"><ShieldCheck size={16} className="text-emerald-400"/> Paiement sécurisé</span>
              <span className="flex items-center gap-2 text-white/70"><Truck size={16} className="text-violet-400"/> Payer à la livraison</span>
              <span className="flex items-center gap-2 text-white/70"><Clock size={16} className="text-amber-400"/> Envoi &lt; 2 min</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {heroCats.map(c=>(
              <Link key={c.id} to={`/catalog?cat=${c.id}`} className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-500/50 transition">
                <img src={c.img} className="w-full h-28 object-cover group-hover:scale-105 transition duration-500" alt={c.label}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                <span className="absolute bottom-2 left-2 text-xs font-bold">{c.label}</span>
              </Link>
            ))}
            <div className="col-span-3 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 flex items-center justify-between">
              <div><div className="font-black">+ 10 marques</div><div className="text-xs opacity-80">PSN, Xbox, Steam…</div></div>
              <Link to="/catalog" className="w-9 h-9 rounded-xl bg-white text-violet-700 flex items-center justify-center"><ArrowRight size={18}/></Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">Produits populaires</h2>
          <Link to="/catalog" className="text-sm text-violet-400 hover:text-violet-300">Voir tout →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialProducts.slice(0,8).map(p=>(
            <Link key={p.id} to={`/product/${p.id}`} className="rounded-2xl overflow-hidden bg-[#18181b] border border-white/10 hover:border-violet-500/40 hover:-translate-y-1 transition group">
              <div className="relative h-36 overflow-hidden">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition" alt={p.name}/>
                {p.badge && <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-1 rounded-full bg-violet-600 text-white">{p.badge}</span>}
                <span className="absolute top-2 right-2 text-[11px] bg-black/60 backdrop-blur px-2 py-1 rounded-full">⭐ {p.rating}</span>
              </div>
              <div className="p-4">
                <div className="text-xs text-white/50 uppercase tracking-widest">{p.category}</div>
                <div className="font-bold leading-tight">{p.name}</div>
                <div className="text-xs text-white/50">{p.subtitle}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-violet-400">dès {Math.min(...p.variants.map(v=>v.price)).toFixed(2)} TND</span>
                  <span className="text-xs text-white/60">{p.variants.length} montants</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-[1280px] mx-auto px-4 pb-12 grid md:grid-cols-3 gap-4">
        {[
          {title:'Codes officiels & vérifiés', desc:'Stock réel, chaque code testé. Remboursement si invalide.'},
          {title:'Paiement flexible', desc:'Carte bancaire sécurisée ou paiement à la livraison (Cash).'},
          {title:'Historique & révélation', desc:'Connecte-toi avec Internet Identity, retrouve tes codes à tout moment.'},
        ].map(f=>(
          <div key={f.title} className="rounded-2xl p-5 bg-white/[0.04] border border-white/10">
            <div className="font-bold">{f.title}</div>
            <div className="text-sm text-white/60 mt-1">{f.desc}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
