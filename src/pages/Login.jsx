import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Fingerprint, Shield } from 'lucide-react'

export default function Login(){
  const { login, user } = useAuth()
  const nav = useNavigate()
  if(user) nav('/orders')

  return (
    <div className="max-w-[520px] mx-auto px-4 py-12">
      <div className="rounded-3xl bg-white/5 border border-white/10 p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center mx-auto"><Fingerprint/></div>
        <h1 className="text-2xl font-black mt-4">Connexion Internet Identity</h1>
        <p className="text-sm text-white/60 mt-2">Authentification décentralisée simulée en local. Ton Principal sera utilisé pour retrouver tes commandes et révéler tes codes.</p>

        <div className="mt-6 space-y-3">
          <button onClick={()=>{login(false); nav('/orders')}} className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 font-bold flex items-center justify-center gap-2">
            <Fingerprint size={18}/> Se connecter avec Internet Identity
          </button>
          <button onClick={()=>{login(true); nav('/admin')}} className="w-full py-3.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold flex items-center justify-center gap-2">
            <Shield size={18}/> Connexion Admin (démo)
          </button>
        </div>
        <p className="text-xs text-white/40 mt-4">Démo locale : aucune donnée n'est envoyée. Le “Principal” est stocké dans localStorage.</p>
      </div>
    </div>
  )
}
