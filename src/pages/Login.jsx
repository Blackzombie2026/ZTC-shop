import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { Fingerprint, Shield, Mail, MessageCircle, ThumbsUp, UserPlus, LogIn } from 'lucide-react'

export default function Login(){
  const { user, login, loginWithEmail, signupWithEmail, loginWithDiscord, loginWithFacebook } = useAuth()
  const { t } = useLang()
  const nav = useNavigate()
  const loc = useLocation()
  const [mode, setMode] = useState('login') // login | signup
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = loc.state?.from || '/orders'

  useEffect(()=>{ if(user) nav(from, {replace:true}) }, [user])

  const handleEmail = (e)=>{
    e.preventDefault(); setError('')
    try{
      if(mode==='signup') signupWithEmail(name, email, password)
      else loginWithEmail(email, password)
      nav(from)
    }catch(err){ setError(err.message) }
  }

  const discordConfigured = !!import.meta.env.VITE_DISCORD_CLIENT_ID
  const fbConfigured = !!import.meta.env.VITE_FACEBOOK_APP_ID

  return (
    <div className="max-w-[560px] mx-auto px-4 py-10">
      <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-black">{t('login_title')}</h1>
          <p className="text-sm text-white/60 mt-1">{t('login_sub')}</p>
        </div>

        {/* EMAIL */}
        <div className="mt-6 rounded-2xl bg-black/30 border border-white/10 p-4">
          <div className="flex gap-2 mb-4">
            <button onClick={()=>setMode('login')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${mode==='login'?'bg-violet-600':'bg-white/5 border border-white/10'}`}><LogIn size={15}/> {t('signin')}</button>
            <button onClick={()=>setMode('signup')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${mode==='signup'?'bg-violet-600':'bg-white/5 border border-white/10'}`}><UserPlus size={15}/> {t('signup')}</button>
          </div>
          <form onSubmit={handleEmail} className="space-y-3">
            {mode==='signup' && (
              <input placeholder={t('pseudo_ph')} value={name} onChange={e=>setName(e.target.value)} className="w-full px-3 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-violet-500"/>
            )}
            <input placeholder="Email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-3 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-violet-500"/>
            <input placeholder={t('pass_ph')} type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-3 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-violet-500"/>
            {error && <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-2.5">{error}</div>}
            <button className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 font-bold flex items-center justify-center gap-2">
              <Mail size={16}/> {mode==='signup' ? t('create_account') : t('login_email')}
            </button>
          </form>
          <p className="text-[11px] text-white/40 mt-2 text-center">Démo locale : comptes stockés dans ton navigateur (localStorage).</p>
        </div>

        <div className="flex items-center gap-3 my-4 text-xs text-white/40"><div className="flex-1 h-px bg-white/10"/><span>{t('or_with')}</span><div className="flex-1 h-px bg-white/10"/></div>

        {/* SOCIAL */}
        <div className="grid sm:grid-cols-2 gap-3">
          <button onClick={()=>{ loginWithDiscord(); }} className="py-3.5 rounded-xl bg-[#5865F2] hover:brightness-110 font-bold flex items-center justify-center gap-2 text-white">
            <MessageCircle size={18}/> Discord {!discordConfigured && <span className="text-[10px] opacity-70 font-normal">(démo)</span>}
          </button>
          <button onClick={()=>{ loginWithFacebook(); }} className="py-3.5 rounded-xl bg-[#1877F2] hover:brightness-110 font-bold flex items-center justify-center gap-2 text-white">
            <ThumbsUp size={18}/> Facebook {!fbConfigured && <span className="text-[10px] opacity-70 font-normal">(démo)</span>}
          </button>
        </div>
        {!discordConfigured && !fbConfigured && (
          <p className="text-[11px] text-white/40 mt-2 text-center">Mode démo : pour un vrai OAuth, ajoute <span className="font-mono">VITE_DISCORD_CLIENT_ID</span> et <span className="font-mono">VITE_FACEBOOK_APP_ID</span> dans <span className="font-mono">.env</span> puis redéploie.</p>
        )}

        <div className="flex items-center gap-3 my-4 text-xs text-white/40"><div className="flex-1 h-px bg-white/10"/><span>avancé</span><div className="flex-1 h-px bg-white/10"/></div>

        <div className="space-y-2">
          <button onClick={()=>{login(false); nav('/orders')}} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-semibold flex items-center justify-center gap-2">
            <Fingerprint size={16}/> Internet Identity (démo)
          </button>
          <button onClick={()=>{login(true); nav('/admin')}} className="w-full py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-bold flex items-center justify-center gap-2">
            <Shield size={16}/> Connexion Admin (démo)
          </button>
        </div>
      </div>
    </div>
  )
}
