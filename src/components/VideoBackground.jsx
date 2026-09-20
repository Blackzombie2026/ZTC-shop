import { useEffect, useState } from 'react'

// Fond "vidéo" : diaporama cinématique de champions (zoom lent + fondu),
// avec overlay sombre pour garder le texte lisible. Léger : images distantes mises en cache.
const SLIDES = [
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_616x353.jpg', // Apex Legends
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7raq6TZniTT-h3tAcCp4gTt1qayp_6_4m5VYdEKZf2w&s=10', // Valorant
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1808500/capsule_616x353.jpg', // ARC Raiders
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPfUeZMBSqKcCZINmj7HGMN4nDmh3OVPLURigP-u5bg&s=10', // FC 26
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/capsule_616x353.jpg', // Warzone / CoD
  'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_616x353.jpg', // PUBG
  'https://cdn.cloudflare.steamstatic.com/steam/apps/359550/capsule_616x353.jpg', // Rainbow Six
]

const DURATION = 6000

export default function VideoBackground(){
  const [index, setIndex] = useState(0)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(()=>{
    if(reduced) return
    const timer = setInterval(()=> setIndex(i=> (i+1) % SLIDES.length), DURATION)
    return ()=> clearInterval(timer)
  }, [reduced])

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0c]">
      {SLIDES.map((src, i)=>(
        <img
          key={src}
          src={src}
          alt=""
          loading={i===0 ? 'eager' : 'lazy'}
          className={`slide-img absolute inset-0 w-full h-full object-cover ${i===index ? 'opacity-100' : 'opacity-0'} ${i===index && !reduced ? (i%2===0 ? 'slide-zoom-a' : 'slide-zoom-b') : ''}`}
        />
      ))}
      {/* voile sombre + dégradés pour la lisibilité */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/70 via-transparent to-[#0a0a0c]" />
    </div>
  )
}
