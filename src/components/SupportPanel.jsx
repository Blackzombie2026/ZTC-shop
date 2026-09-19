import { X, MessageCircle, Phone, Mail, Clock, ChevronRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { SUPPORT, waLink } from '../data/support'

export default function SupportPanel({ open, onClose }){
  const { t, lang } = useLang()
  if(!open) return null
  const prefill = lang==='ar'
    ? 'مرحباً ZTC Shop، أحتاج مساعدة بخصوص طلبي'
    : lang==='en'
      ? 'Hello ZTC Shop, I need help with my order'
      : 'Bonjour ZTC Shop, besoin d’aide pour ma commande'
  const faqs = [
    { q: t('faq1q'), a: t('faq1a') },
    { q: t('faq2q'), a: t('faq2a') },
    { q: t('faq3q'), a: t('faq3a') },
  ]
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full max-w-md rounded-3xl bg-[#16161a] border border-white/10 p-6 shadow-2xl">
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
        <p className="text-sm text-white/60 mt-3">{t('support_sub')}</p>
        <div className="mt-4 space-y-2">
          <a href={waLink(prefill)} target="_blank" rel="noreferrer" className="w-full py-3.5 rounded-xl bg-[#25D366] hover:brightness-110 text-white font-black flex items-center justify-center gap-2">
            <MessageCircle size={18}/> {t('sup_whatsapp')}
          </a>
          <div className="grid grid-cols-2 gap-2">
            <a href={`tel:${SUPPORT.phone.replace(/\s/g,'')}`} className="py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-sm flex items-center justify-center gap-2">
              <Phone size={15}/> {t('sup_call')}
            </a>
            <a href={`mailto:${SUPPORT.email}`} className="py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-sm flex items-center justify-center gap-2">
              <Mail size={15}/> {t('sup_email')}
            </a>
          </div>
          <div className="text-center text-xs text-white/40">{SUPPORT.phone} • {SUPPORT.email}</div>
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
