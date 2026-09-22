import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Clock, ChevronRight, Send, Gamepad2 } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { SUPPORT } from '../data/support'

export default function Support(){
  const { t } = useLang()
  const { user, myThread, sendMessage, refreshAll } = useAuth()
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)
  const thread = myThread()

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [thread.length])

  // Polling de sécurité : nouveaux messages admin en direct même si realtime coupé
  useEffect(()=>{
    if(!user) return
    const id = setInterval(()=>{ try{ refreshAll() }catch{} }, 10000)
    return ()=>clearInterval(id)
  }, [user])

  const faqs = [
    { q: t('faq1q'), a: t('faq1a') },
    { q: t('faq2q'), a: t('faq2a') },
    { q: t('faq3q'), a: t('faq3a') },
  ]

  const handleSend = async (e)=>{
    e.preventDefault()
    if(!draft.trim() || sending) return
    setSending(true)
    try{ await sendMessage({ text: draft }); setDraft('') }catch{}
    finally{ setSending(false) }
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="flex items-center gap-3 reveal">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center animate-support-bounce">
          <MessageCircle size={26}/>
        </div>
        <div>
          <h1 className="text-2xl font-black">{t('support_title')}</h1>
          <p className="text-xs text-emerald-300 flex items-center gap-1"><Clock size={12}/> {t('sup_hours')}</p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-5">
        {!user ? (
          <div className="text-center py-8">
            <p className="text-white/60">{t('chat_login_needed')}</p>
            <Link to="/login" className="inline-block mt-4 px-6 py-3 rounded-xl bg-violet-600 font-bold">{t('login')}</Link>
          </div>
        ) : (
          <>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto bg-black/20 rounded-2xl p-4 border border-white/5">
              {thread.length===0 && <p className="text-sm text-white/40 text-center py-6">{t('chat_empty')}</p>}
              {thread.map(m=>(
                <div key={m.id} className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${m.sender==='admin' ? 'bg-emerald-600/20 border border-emerald-500/30 mr-auto' : 'bg-violet-600 ml-auto'}`}>
                  {m.sender==='admin' && <div className="text-[10px] font-black text-emerald-300">ZTC ✓</div>}
                  <div className="leading-snug">{m.text}</div>
                  <div className="text-[10px] opacity-60 mt-0.5">{m.date ? new Date(m.date).toLocaleString([], {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : ''}</div>
                </div>
              ))}
              <div ref={bottomRef}/>
            </div>
            <form onSubmit={handleSend} className="flex gap-2 mt-4">
              <input value={draft} onChange={e=>setDraft(e.target.value)} placeholder={t('chat_placeholder')} className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-emerald-500"/>
              <button disabled={sending || !draft.trim()} className="btn-shine px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-black disabled:opacity-50 flex items-center gap-2"><Send size={16}/> {t('sup_chat_tab')}</button>
            </form>
          </>
        )}
      </div>

      <h2 className="font-black mt-8 mb-3">{t('sup_faq_t')}</h2>
      <div className="grid md:grid-cols-3 gap-3">
        {faqs.map((f,i)=>(
          <details key={i} className="rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 group">
            <summary className="cursor-pointer font-bold text-sm flex items-center justify-between gap-2">{f.q}<ChevronRight size={14} className="shrink-0 text-white/40 group-open:rotate-90 transition"/></summary>
            <p className="text-xs text-white/60 mt-2 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
