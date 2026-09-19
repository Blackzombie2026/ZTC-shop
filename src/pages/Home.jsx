import { Link } from 'react-router-dom'
import { ArrowRight, Zap, ShieldCheck, Truck, Clock } from 'lucide-react'
import { initialProducts } from '../data/products'
import { useLang } from '../context/LanguageContext'

const heroCats = [
  { id:'valorant', label:'Valorant', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7raq6TZniTT-h3tAcCp4gTt1qayp_6_4m5VYdEKZf2w&s=10' },
  { id:'lol', label:'League of Legends', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNztnpwTexsNw2a58jD4GD3VukhzYqPHAouBNgep7nzA&s=10' },
  { id:'fc26', label:'FC 26 Coins', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPfUeZMBSqKcCZINmj7HGMN4nDmh3OVPLURigP-u5bg&s=10' },
  { id:'pubg', label:'PUBG UC', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2k0Xlx3K5dZvgyfn4R20bh_OFVCv93xOJkyMmx-g-Zg&s=10' },
  { id:'warzone', label:'Warzone', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZyqv8ihFLqe-huGX1idY3forMuHcN39UzhSDqVNCQ4g&s=10' },
  { id:'r6', label:'Rainbow Six', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBN2ACWqqVPyzbeCQUHPa9BmoN5rgkkccXtbNxOohIYg&s' },
  { id:'roblox', label:'Roblox', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyCcKCRn3kSwAHeU7aumRfEv7QvfvG639Rn5HkcsNUiA&s=10' },
  { id:'netflix', label:'Netflix', img:'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&q=80&auto=format&fit=crop' },
]

export default function Home(){
  const { t } = useLang()
  const trust = [
    {title: t('trust1t'), desc: t('trust1d')},
    {title: t('trust2t'), desc: t('trust2d')},
    {title: t('trust3t'), desc: t('trust3d')},
  ]
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-fuchsia-800/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/20 to-transparent" />
        <div className="blob w-72 h-72 bg-violet-600 -top-10 -left-10" />
        <div className="blob w-80 h-80 bg-fuchsia-600 top-20 right-0" style={{animationDelay:'-4s'}} />
        <div className="blob w-56 h-56 bg-emerald-500 bottom-0 left-1/3" style={{animationDelay:'-2s', opacity:.22}} />
        <div className="relative max-w-[1280px] mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600/20 border border-violet-500/30 text-xs text-violet-300 mb-4">
              <Zap size={14}/> {t('home_badge')}
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tight">
              ZTC Shop<br/>
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">gift cards</span><br/>
              gaming & streaming
            </h1>
            <p className="text-white/60 mt-4 text-lg max-w-lg">{t('home_sub')}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/catalog" className="btn-shine px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 font-bold flex items-center gap-2">{t('browse')} <ArrowRight size={18}/></Link>
              <Link to="/catalog?cat=valorant" className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 font-semibold">{t('view_vp')}</Link>
            </div>
            <div className="flex gap-6 mt-6 text-sm">
              <span className="flex items-center gap-2 text-white/70"><ShieldCheck size={16} className="text-emerald-400"/> {t('secure')}</span>
              <span className="flex items-center gap-2 text-white/70"><Truck size={16} className="text-violet-400"/> {t('cod_short')}</span>
              <span className="flex items-center gap-2 text-white/70"><Clock size={16} className="text-amber-400"/> {t('fast')}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {heroCats.map(c=>(
              <div key={c.id} className="anim-glow">
              <Link to={`/catalog?cat=${c.id}`} className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-500/50 transition block active:scale-95">
                <img src={c.img} className="w-full h-28 object-cover group-hover:scale-105 transition duration-500" alt={c.label}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                <span className="absolute bottom-2 left-2 text-xs font-bold">{c.label}</span>
              </Link>
              </div>
            ))}
            <div className="col-span-3 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 flex items-center justify-between">
              <div><div className="font-black">+ 10 marques</div><div className="text-xs opacity-80">PSN, Xbox, Steam…</div></div>
              <Link to="/catalog" className="w-9 h-9 rounded-xl bg-white text-violet-700 flex items-center justify-center"><ArrowRight size={18}/></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau défilant */}
      <div className="marquee overflow-hidden border-y border-white/10 bg-white/[0.03] py-3 select-none" dir="ltr">
        <div className="marquee-track text-sm font-black tracking-widest text-white/70">
          {[0,1].map(half=>(
            <div key={half} className="flex gap-10 items-center shrink-0" aria-hidden={half===1}>
              {['VALORANT','LEAGUE OF LEGENDS','FC 26','PUBG','WARZONE','RAINBOW SIX','ROBLOX','FREE FIRE','NETFLIX',t('secure'),t('cod_short'),t('fast')].map((s,i)=>(
                <span key={i} className="flex items-center gap-10 whitespace-nowrap">{s}<span className="text-violet-500">✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6 reveal">
          <h2 className="text-2xl font-black">{t('popular')}</h2>
          <Link to="/catalog" className="text-sm text-violet-400 hover:text-violet-300">{t('see_all')}</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialProducts.slice(0,8).map((p,i)=>(
            <div key={p.id} className="anim-glow reveal" style={{animationDelay:`${(i%8)*70}ms`}}>
            <Link to={`/product/${p.id}`} className="rounded-2xl overflow-hidden bg-[#18181b] border border-white/10 hover:border-violet-500/40 hover:-translate-y-1 transition group block">
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
                  <span className="text-sm font-bold text-violet-400">{t('from')} {Math.min(...p.variants.map(v=>v.price)).toFixed(2)} TND</span>
                  <span className="text-xs text-white/60">{p.variants.length} {t('amounts')}</span>
                </div>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 pb-12 grid md:grid-cols-3 gap-4">
        {trust.map(f=>(
          <div key={f.title} className="rounded-2xl p-5 bg-white/[0.04] border border-white/10">
            <div className="font-bold">{f.title}</div>
            <div className="text-sm text-white/60 mt-1">{f.desc}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
