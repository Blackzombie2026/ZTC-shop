import { createContext, useContext, useEffect, useState } from 'react'

const AuthCtx = createContext()

function genId(prefix='user'){ return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}` }
function genPrincipal(){ return 'aaaaa-aa-' + Math.random().toString(36).slice(2,7) + '-' + Math.random().toString(36).slice(2,7) }

// Simple demo hash (NOT secure - remplace par backend en prod)
const hashPw = (pw)=> { try { return btoa('ztc$'+pw) } catch { return 'hash_'+pw.length } }

function readUsers(){
  try { return JSON.parse(localStorage.getItem('ztc_users')||'[]') } catch { return [] }
}

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=>{
    try{
      const u = JSON.parse(localStorage.getItem('ztc_user')||'null')
      if(u) return u
      // migration ancien ii_user
      const old = JSON.parse(localStorage.getItem('ii_user')||'null')
      if(old) return { id: genId('ii'), name: 'Joueur', email: '', provider: old.provider||'Internet Identity', principal: old.principal, isAdmin: !!old.isAdmin, createdAt: old.createdAt||new Date().toISOString() }
      return null
    }catch{return null}
  })
  const [orders, setOrders] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('orders')||'[]')}catch{return []}
  })
  const [products, setProducts] = useState(()=>{
    try{ const p=JSON.parse(localStorage.getItem('products_db')||'null'); return p }catch{return null}
  })

  useEffect(()=> localStorage.setItem('ztc_user', JSON.stringify(user)), [user])
  // garde compat ancien système
  useEffect(()=> localStorage.setItem('ii_user', JSON.stringify(user)), [user])
  useEffect(()=> localStorage.setItem('orders', JSON.stringify(orders)), [orders])
  useEffect(()=> { if(products) localStorage.setItem('products_db', JSON.stringify(products)) }, [products])

  // ---- OAuth callback (Discord réel si token dans l'URL) ----
  useEffect(()=>{
    const hash = window.location.hash
    if(hash.includes('access_token')){
      const params = new URLSearchParams(hash.slice(1))
      const token = params.get('access_token')
      const state = params.get('state')||''
      if(token){
        const provider = state.startsWith('discord') ? 'discord' : state.startsWith('facebook') ? 'facebook' : 'oauth'
        // Tente de récupérer le profil Discord réel
        if(provider==='discord'){
          fetch('https://discord.com/api/users/@me', { headers: { Authorization: `Bearer ${token}` } })
            .then(r=> r.ok? r.json(): null)
            .then(profile=>{
              const u = profile ? {
                id: 'discord_'+profile.id, name: profile.username, email: profile.email||'',
                avatar: profile.avatar? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`: '',
                provider:'discord', principal: genPrincipal(), createdAt: new Date().toISOString()
              } : {
                id: genId('discord'), name: 'Joueur Discord', email:'', provider:'discord', principal: genPrincipal(), createdAt: new Date().toISOString()
              }
              setUser(u)
              window.history.replaceState({}, '', window.location.pathname)
            })
            .catch(()=> window.history.replaceState({}, '', window.location.pathname))
        } else {
          window.history.replaceState({}, '', window.location.pathname)
        }
      }
    }
  }, [])

  // Legacy Internet Identity (gardé pour admin + compat)
  const login = (asAdmin=false)=>{
    const u = { id: genId('ii'), name: asAdmin?'Admin':'Joueur', email:'', provider:'Internet Identity', principal: genPrincipal(), isAdmin: asAdmin, createdAt: new Date().toISOString() }
    setUser(u); return u
  }

  // ---- Email ----
  const signupWithEmail = (name, email, password)=>{
    email = email.trim().toLowerCase()
    if(!email || !password) throw new Error('Email et mot de passe requis')
    if(password.length<4) throw new Error('Mot de passe trop court (min 4)')
    const users = readUsers()
    if(users.find(u=> u.email===email)) throw new Error('Ce email a déjà un compte — connecte-toi')
    const u = { id: genId('email'), name: name||email.split('@')[0], email, passwordHash: hashPw(password), provider:'email', principal: genPrincipal(), createdAt: new Date().toISOString() }
    users.push(u); localStorage.setItem('ztc_users', JSON.stringify(users))
    const { passwordHash, ...safe } = u
    setUser(safe); return safe
  }
  const loginWithEmail = (email, password)=>{
    email = email.trim().toLowerCase()
    const users = readUsers()
    const found = users.find(u=> u.email===email)
    if(!found) throw new Error('Aucun compte avec cet email — crée un compte')
    if(found.passwordHash !== hashPw(password)) throw new Error('Mot de passe incorrect')
    const { passwordHash, ...safe } = found
    setUser(safe); return safe
  }

  // ---- Discord ----
  const loginWithDiscord = ()=>{
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
    if(clientId){
      // OAuth réel Discord
      const redirect = encodeURIComponent(window.location.origin + '/login')
      const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=token&scope=identify%20email&state=discord_${Date.now()}`
      window.location.href = url
      return null
    }
    // Démo locale (sans Client ID)
    const u = { id: genId('discord'), name: 'Joueur Discord', email:'', provider:'discord', principal: genPrincipal(), createdAt: new Date().toISOString() }
    setUser(u); return u
  }

  // ---- Facebook ----
  const loginWithFacebook = ()=>{
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID
    if(appId){
      const redirect = encodeURIComponent(window.location.origin + '/login')
      const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirect}&scope=email&response_type=token&state=facebook_${Date.now()}`
      window.location.href = url
      return null
    }
    // Démo locale (sans App ID)
    const u = { id: genId('fb'), name: 'Joueur Facebook', email:'', provider:'facebook', principal: genPrincipal(), createdAt: new Date().toISOString() }
    setUser(u); return u
  }

  const logout = ()=> setUser(null)
  const addOrder = (order)=> setOrders(o=>[order, ...o])
  const updateOrderStatus = (id, status)=> setOrders(o=> o.map(x=> x.id===id? {...x, status}:x))

  // helper: mes commandes (compat ancien + nouveau)
  const myOrders = (u=user)=>{
    if(!u) return []
    return orders.filter(o=> o.userId===u.id || o.principal===u.principal || (u.email && o.customer?.email?.toLowerCase()===u.email.toLowerCase()))
  }

  return <AuthCtx.Provider value={{user, setUser, login, loginWithEmail, signupWithEmail, loginWithDiscord, loginWithFacebook, logout, orders, myOrders, addOrder, updateOrderStatus, products, setProducts}}>{children}</AuthCtx.Provider>
}
export const useAuth = ()=> useContext(AuthCtx)
