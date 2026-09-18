import { createContext, useContext, useEffect, useState } from 'react'
import { initialProducts } from '../data/products'

const AuthCtx = createContext()

function genId(prefix='user'){ return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}` }
function genPrincipal(){ return 'aaaaa-aa-' + Math.random().toString(36).slice(2,7) + '-' + Math.random().toString(36).slice(2,7) }

// Simple demo hash (NOT secure - remplace par backend en prod)
const hashPw = (pw)=> { try { return btoa('ztc$'+pw) } catch { return 'hash_'+pw.length } }

// Emails propriétaires => toujours admin sur ce navigateur (identifiant public, pas un secret)
const OWNER_EMAILS = [
  (import.meta.env.VITE_ADMIN_EMAIL || 'admin@ztc.shop').toLowerCase(),
  'apatchegaming@gmail.com',
]
const isOwnerEmail = (email)=> OWNER_EMAILS.includes((email||'').trim().toLowerCase())

function readUsers(){
  try { return JSON.parse(localStorage.getItem('ztc_users')||'[]') } catch { return [] }
}
// Enregistre chaque profil connecté (email, discord, facebook, II) pour la section Comptes de l'admin
function saveProfile(u){
  try{
    const users = readUsers()
    const idx = users.findIndex(x=> x.id===u.id)
    const entry = { id: u.id, name: u.name||'', email: u.email||'', provider: u.provider||'email', principal: u.principal||'', isAdmin: !!u.isAdmin || isOwnerEmail(u.email), createdAt: u.createdAt||new Date().toISOString(), lastSeen: new Date().toISOString() }
    if(idx>=0){
      const keepHash = users[idx].passwordHash
      users[idx] = { ...entry, createdAt: users[idx].createdAt||entry.createdAt, ...(keepHash?{passwordHash: keepHash}:{}) }
      if(u.name) users[idx].name = u.name
      if(u.email) users[idx].email = u.email
    } else users.push(entry)
    localStorage.setItem('ztc_users', JSON.stringify(users))
  }catch{}
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
    // Fusionne les nouveautés du code (ex: Warzone, R6) avec la DB locale de l'admin,
    // pour que l'admin voie exactement les mêmes jeux/photos que les clients.
    try{
      const stored = JSON.parse(localStorage.getItem('products_db')||'null')
      if(!stored) return null // fallback: initialProducts du code
      if(!Array.isArray(stored)) return null
      const ids = new Set(stored.map(p=>p.id))
      const missing = initialProducts.filter(p=>!ids.has(p.id))
      // Met aussi à jour image/catégorie des produits existants si le code a changé
      const byId = Object.fromEntries(initialProducts.map(p=>[p.id,p]))
      const synced = stored.map(p=> byId[p.id] ? { ...p, image: byId[p.id].image, category: byId[p.id].category, name: byId[p.id].name, subtitle: byId[p.id].subtitle, variants: byId[p.id].variants } : p)
      return missing.length ? [...synced, ...missing] : synced
    }catch{return null}
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
              setUser(u); saveProfile(u)
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
    setUser(u); saveProfile(u); return u
  }

  // ---- Email ----
  const signupWithEmail = (name, email, password)=>{
    email = email.trim().toLowerCase()
    if(!email || !password) throw new Error('Email et mot de passe requis')
    if(password.length<4) throw new Error('Mot de passe trop court (min 4)')
    const users = readUsers()
    if(users.find(u=> u.email===email)) throw new Error('Ce email a déjà un compte — connecte-toi')
    const u = { id: genId('email'), name: name||email.split('@')[0], email, passwordHash: hashPw(password), provider:'email', principal: genPrincipal(), isAdmin: isOwnerEmail(email), createdAt: new Date().toISOString() }
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
    if(isOwnerEmail(email)) safe.isAdmin = true
    setUser(safe); saveProfile(safe); return safe
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
    setUser(u); saveProfile(u); return u
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
    setUser(u); saveProfile(u); return u
  }

  // ---- Admin (propriétaire uniquement — email + mot de passe) ----
  // Configure sur Netlify: VITE_ADMIN_EMAIL + VITE_ADMIN_PASSWORD
  const loginAdmin = (email, password)=>{
    const expectedEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@ztc.shop').toLowerCase()
    const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD || 'ztc2026admin'
    email = (email||'').trim().toLowerCase()
    // 1) Identifiants admin dédiés (env)
    if(email === expectedEmail && password === expectedPass){
      const u = { id: 'admin_owner', name: 'Admin ZTC', email, provider:'email', principal: genPrincipal(), isAdmin: true, createdAt: new Date().toISOString() }
      setUser(u); saveProfile(u); return u
    }
    // 2) Compte propriétaire : email owner + son mot de passe de compte => admin direct
    const users = readUsers()
    const found = users.find(u=> u.email===email)
    if(found && found.passwordHash === hashPw(password) && (isOwnerEmail(email) || found.isAdmin)){
      const { passwordHash, ...safe } = found
      safe.isAdmin = true
      setUser(safe); saveProfile(safe); return safe
    }
    if(email !== expectedEmail && !found) throw new Error('Email admin inconnu')
    throw new Error('Mot de passe admin incorrect')
  }

  const logout = ()=> setUser(null)
  const addOrder = (order)=> setOrders(o=>[order, ...o])
  const updateOrderStatus = (id, status)=> setOrders(o=> o.map(x=> x.id===id? {...x, status}:x))

  // helper: mes commandes (compat ancien + nouveau)
  const myOrders = (u=user)=>{
    if(!u) return []
    return orders.filter(o=> o.userId===u.id || o.principal===u.principal || (u.email && o.customer?.email?.toLowerCase()===u.email.toLowerCase()))
  }

  // Tous les comptes créés (registre local) + clients vus via commandes, avec stats
  const allAccounts = ()=>{
    const regs = readUsers()
    const map = new Map()
    regs.forEach(r=> map.set(r.id, { ...r, phones: [], ordersCount: 0, totalSpent: 0, lastOrder: null, orderIds: [] }))
    orders.forEach(o=>{
      const key = o.userId || o.principal || o.customer?.email || o.id
      if(!map.has(key)){
        map.set(key, {
          id: key, name: o.customer?.name||'Client', email: o.customer?.email||'',
          provider: o.provider||'email', principal: o.principal||'', isAdmin: false,
          createdAt: o.date, lastSeen: o.date, phones: [], ordersCount: 0, totalSpent: 0, lastOrder: null, orderIds: []
        })
      }
      const a = map.get(key)
      if(o.customer?.phone && !a.phones.includes(o.customer.phone)) a.phones.push(o.customer.phone)
      if(o.customer?.email && !a.email) a.email = o.customer.email
      if(o.customer?.name && (a.name==='Client'||!a.name)) a.name = o.customer.name
      a.ordersCount += 1
      a.totalSpent += Number(o.total||0)
      if(!a.lastOrder || new Date(o.date) > new Date(a.lastOrder)) a.lastOrder = o.date
      a.orderIds.push(o.id)
    })
    return [...map.values()].sort((a,b)=> new Date(b.lastSeen||b.createdAt||0) - new Date(a.lastSeen||a.createdAt||0))
  }

  return <AuthCtx.Provider value={{user, setUser, login, loginAdmin, loginWithEmail, signupWithEmail, loginWithDiscord, loginWithFacebook, logout, orders, myOrders, allAccounts, addOrder, updateOrderStatus, products, setProducts}}>{children}</AuthCtx.Provider>
}
export const useAuth = ()=> useContext(AuthCtx)
