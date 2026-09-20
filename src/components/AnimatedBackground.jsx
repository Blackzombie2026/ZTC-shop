import { useEffect, useRef } from 'react'

// Fond animé gaming : grille neon + particules, léger comme une vidéo.
// - 1 seul canvas, ~75 particules max, DPR plafonné
// - pause auto quand l'onglet est caché (requestAnimationFrame)
// - image fixe si prefers-reduced-motion
export default function AnimatedBackground(){
  const ref = useRef(null)

  useEffect(()=>{
    const canvas = ref.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    let w = 0, h = 0, raf = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = ()=>{
      w = window.innerWidth; h = window.innerHeight
      canvas.width = Math.floor(w * DPR); canvas.height = Math.floor(h * DPR)
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = ['124,58,237', '217,70,239', '16,185,129', '96,165,250']
    const N = w < 640 ? 38 : 72
    const parts = Array.from({ length: N }, ()=>({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.08),
      c: COLORS[(Math.random() * COLORS.length) | 0],
      tw: Math.random() * Math.PI * 2,
      ts: Math.random() * 0.02 + 0.005,
    }))
    let gridOff = 0

    const frame = ()=>{
      ctx.clearRect(0, 0, w, h)
      // grille neon qui défile doucement
      const gap = 46
      gridOff = (gridOff + 0.25) % gap
      ctx.strokeStyle = 'rgba(124,58,237,0.07)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for(let x = -gap + gridOff; x < w + gap; x += gap){ ctx.moveTo(x, 0); ctx.lineTo(x, h) }
      for(let y = -gap + gridOff; y < h + gap; y += gap){ ctx.moveTo(0, y); ctx.lineTo(w, y) }
      ctx.stroke()
      // lignes entre particules proches
      ctx.lineWidth = 1
      for(let i = 0; i < parts.length; i++){
        const a = parts[i]
        for(let j = i + 1; j < parts.length; j++){
          const b = parts[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if(d2 < 12100){
            const o = (1 - Math.sqrt(d2) / 110) * 0.12
            ctx.strokeStyle = 'rgba(139,92,246,' + o.toFixed(3) + ')'
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      // particules qui montent + scintillent
      for(const p of parts){
        p.tw += p.ts
        const alpha = 0.35 + Math.abs(Math.sin(p.tw)) * 0.45
        ctx.fillStyle = 'rgba(' + p.c + ',' + alpha.toFixed(3) + ')'
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
        p.x += p.vx; p.y += p.vy
        if(p.y < -10){ p.y = h + 10; p.x = Math.random() * w }
        if(p.x < -10) p.x = w + 10
        if(p.x > w + 10) p.x = -10
      }
      if(!reduced) raf = requestAnimationFrame(frame)
    }
    frame()

    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} aria-hidden className="fixed inset-0 z-0 pointer-events-none" />
}
