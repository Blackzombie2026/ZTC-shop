// Fond video : boucle neon 10s generee pour ZTC Shop (aucun copyright),
// qui tourne en boucle + overlay sombre pour la lisibilite.
const POSTER = 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_616x353.jpg'

export default function VideoBackground(){
  const src = `${import.meta.env.BASE_URL}bg-loop.mp4`
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0c]">
      <video
        autoPlay muted loop playsInline preload="auto" poster={POSTER}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* voile sombre + degrades pour la lisibilite */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/70 via-transparent to-[#0a0a0c]" />
    </div>
  )
}
