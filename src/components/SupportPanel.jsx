import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, MessageCircle, Clock, ChevronRight, Send } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

export default function SupportPanel({ open, onClose }){
  const { t } = useLang()
  const { user, myThread, sendMessage } = useAuth()
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)
  const thread = myThread()

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [thread.length, open])

  if(!open) return null
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full max-w-md rounded-3xl bg-[#16161a] border border-white/10 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10"><X size={16}/></button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center animate-support-bounce">
            <MessageCircle size={22}/>
          </div>
          <div>
            <h2 className="text-xl font-black">{t('support_title')}</h2>
            <p className="text-xs text-emerald-300 flex items-center gap-1"><Clock size={12}/> {t('sup_hours')}</p>
          </div>
        </div>

        <div className="mt-4">
          {!user ? (
            <div className="text-center py-6">
              <p className="text-sm text-white/60">{t('chat_login_needed')}</p>
              <Link to="/login" onClick={onClose} className="inline-block mt-3 px-6 py-2.5 rounded-xl bg-violet-600 font-bold text-sm">{t('login')}</Link>
            </div>
          ) : (
            <>
              <div className="space-y-2 max-h-64 overflow-y-auto bg-black/20 rounded-2xl p-3 border border-white/5">
                {thread.length===0 && <p className="text-xs text-white/40 text-center py-4">{t('chat_empty')}</p>}
                {thread.map(m=>(
                  <div key={m.id} className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${m.sender==='admin' ? 'bg-emerald-600/20 border border-emerald-500/30 mr-auto' : 'bg-violet-600 ml-auto'}`}>
                    {m.sender==='admin' && <div className="text-[10px] font-black text-emerald-300">ZTC ✓</div>}
                    <div className="leading-snug">{m.text}</div>
                    <div className="text-[10px] opacity-60 mt-0.5">{m.date ? new Date(m.date).toLocaleString([], {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : ''}</div>
                  </div>
                ))}
                <div ref={bottomRef}/>
              </div>
              <form onSubmit={handleSend} className="flex gap-2 mt-3">
                <input value={draft} onChange={e=>setDraft(e.target.value)} placeholder={t('chat_placeholder')} className="flex-1 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm focus:outline-none focus:border-emerald-500"/>
                <button disabled={sending || !draft.trim()} className="px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-black disabled:opacity-50"><Send size={16}/></button>
              </form>
            </>
          )}
        </div>

        <div className="mt-4">
          <div className="text-sm font-black mb-2">{t('sup_faq_t')}</div>
          <div className="space-y-2">
            {faqs.map((f,i)=>(
              <details key={i} className="rounded-xl bg-black/30 border border-white/10 px-3 py-2.5 text-sm group">
                <summary className="cursor-pointer font-semibold flex items-center justify-between gap-2">{f.q}<ChevronRight size={14} className="shrink-0 text-white/40 group-open:rotate-90 transition"/></summary>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
