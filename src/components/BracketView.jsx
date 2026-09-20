import { useState } from 'react'
import { Check, Trophy } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { setResult, getChampion } from '../lib/bracket'

function roundName(nMatches, t){
  if(nMatches === 1) return t('br_final')
  if(nMatches === 2) return t('br_semi')
  if(nMatches === 4) return t('br_quarter')
  return `${t('br_round')} 1/${nMatches * 2}`
}

// Lecture seule par défaut ; édition si onValidate(match, scoreA, scoreB) fourni
export default function BracketView({ bracket, onValidate }){
  const { t } = useLang()
  const [scores, setScores] = useState({})
  const [err, setErr] = useState('')
  const rounds = bracket || []
  const champion = getChampion(rounds)

  if(!rounds.length) return <div className="text-sm text-white/40">{t('no_bracket')}</div>

  const submit = async (r, i)=>{
    setErr('')
    const key = `${r}-${i}`
    const s = scores[key] || {}
    const res = setResult(rounds, r, i, s.a, s.b)
    if(res.error){ setErr(res.error==='draw' ? t('br_no_draw') : t('br_need_teams')); return }
    setScores(prev=> { const c = { ...prev }; delete c[key]; return c })
    await onValidate(res.rounds)
  }

  return (
    <div>
      {champion && (
        <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center font-black text-amber-300 flex items-center justify-center gap-2">
          <Trophy size={18}/> {t('champion')} : {champion}
        </div>
      )}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {rounds.map((rd, r)=>(
          <div key={r} className="min-w-[220px] flex-1">
            <div className="text-xs font-black uppercase tracking-widest text-white/50 mb-2 text-center">{roundName(rd.matches.length, t)}</div>
            <div className="space-y-3">
              {rd.matches.map((m, i)=>{
                const key = `${r}-${i}`
                const s = scores[key] || {}
                const decided = !!m.winner
                return (
                  <div key={m.id} className={`rounded-xl border p-2.5 text-sm ${decided ? 'bg-emerald-500/5 border-emerald-500/25' : 'bg-black/30 border-white/10'}`}>
                    {[
                      { team: m.teamA, score: m.scoreA, side: 'a' },
                      { team: m.teamB, score: m.scoreB, side: 'b' },
                    ].map(row=>(
                      <div key={row.side} className={`flex items-center justify-between gap-2 py-1 ${m.winner===row.team && row.team ? 'font-black text-emerald-300' : 'text-white/70'}`}>
                        <span className="truncate">{row.team || '—'}</span>
                        {onValidate && m.teamA && m.teamB && !decided ? (
                          <input
                            type="number" min="0" value={s[row.side] ?? ''} placeholder="–"
                            onChange={e=> setScores(prev=> ({ ...prev, [key]: { ...prev[key], [row.side]: e.target.value } }))}
                            className="w-12 px-1.5 py-1 rounded-lg bg-black/50 border border-white/15 text-center"
                          />
                        ) : (
                          <span className="font-mono font-bold">{row.score ?? '–'}</span>
                        )}
                      </div>
                    ))}
                    {onValidate && m.teamA && m.teamB && !decided && (
                      <button onClick={()=>submit(r, i)} className="mt-1.5 w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-black flex items-center justify-center gap-1">
                        <Check size={12}/> {t('validate')}
                      </button>
                    )}
                    {decided && m.teamA && m.teamB && <div className="text-[10px] text-emerald-400 mt-1">✓ {m.winner}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {err && <div className="mt-2 text-xs text-red-400">{err}</div>}
    </div>
  )
}
