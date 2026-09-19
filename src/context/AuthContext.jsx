import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { initialProducts } from '../data/products'
import { supabase, isCloudEnabled } from '../lib/supabase'

const AuthCtx = createContext()
const cloud = isCloudEnabled

function genId(prefix='user'){ return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}` }
function genPrincipal(){ return 'aaaaa-aa-' + Math.random().toString(36).slice(2,7) + '-' + Math.random().toString(36).slice(2,7) }

// Simple demo hash (mode local uniquement)
const hashPw = (pw)=> { try { return btoa('ztc$'+pw) } catch { return 'hash_'+pw.length } }

// Emails propriétaires => toujours admin (identifiant public, pas un secret)
const OWNER_EMAILS = [
  (import.meta.env.VITE_ADMIN_EMAIL || 'admin@ztc.shop').toLowerCase(),
  'apatchegaming@gmail.com',
]
const isOwnerEmail = (email)=> OWNER_EMAILS.includes((email||'').trim().toLowerCase())

function readUsers(){
  try { return JSON.parse(localStorage.getItem('ztc_users')||'[]') } catch { return [] }
}
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

// ---------- Mapping cloud <-> app ----------
const mapCloudOrder = (r)=> ({
  id: r.id, date: r.created_at,
  items: r.items||[], total: Number(r.total||0), method: r.method||'card',
  customer: r.customer||{}, userId: r.user_id, provider: r.customer?.provider||'email',
  principal: r.customer?.principal||'',
  status: r.status||'En attente de confirmation (paiement reçu)',
  cloud: true,
})
const mapCloudProduct = (r)=> ({
  id: r.id, category: r.category, name: r.name, subtitle: r.subtitle||'',
  image: r.image||'', badge: r.badge||null, description: r.description||'',
  variants: r.variants||[], stock: r.stock??0, rating: Number(r.rating||5),
})
const toCloudProduct = (p)=> ({
  id: p.id, category: p.category, name: p.name, subtitle: p.subtitle||'',
  image: p.image||'', badge: p.badge||null, description: p.description||'',
  variants: p.variants||[], stock: p.stock??0, rating: p.rating??5,
})

function mergeOrders(localArr, cloudArr){
  const map = new Map()
  localArr.forEach(o=> map.set(o.id, o))
  cloudArr.forEach(o=> map.set(o.id, o)) // le cloud gagne en cas de conflit
  return [...map.values()].sort((a,b)=> new Date(b.date||0) - new Date(a.date||0))
}

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=>{
    try{
      const u = JSON.parse(localStorage.getItem('ztc_user')||'null')
      if(u) return u
      const old = JSON.parse(localStorage.getItem('ii_user')||'null')
      if(old) return { id: genId('ii'), name: 'Joueur', email: '', provider: old.provider||'Internet Identity', principal: old.principal, isAdmin: !!old.isAdmin, createdAt: old.createdAt||new Date().toISOString() }
      return null
    }catch{return null}
  })
  const [orders, setOrders] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('orders')||'[]')}catch{return []}
  })
  const [products, setProductsState] = useState(()=>{
    try{
      const stored = JSON.parse(localStorage.getItem('products_db')||'null')
      if(!stored) return null
      if(!Array.isArray(stored)) return null
      const ids = new Set(stored.map(p=>p.id))
      const missing = initialProducts.filter(p=>!ids.has(p.id))
      const byId = Object.fromEntries(initialProducts.map(p=>[p.id,p]))
      const synced = stored.map(p=> byId[p.id] ? { ...p, image: byId[p.id].image, category: byId[p.id].category, name: byId[p.id].name, subtitle: byId[p.id].subtitle, variants: byId[p.id].variants } : p)
      return missing.length ? [...synced, ...missing] : synced
    }catch{return null}
  })
  const [cloudProfiles, setCloudProfiles] = useState(null) // null = pas admin cloud ou pas chargé
  const sbUserId = useRef(null)

  useEffect(()=> localStorage.setItem('ztc_user', JSON.stringify(user)), [user])
  useEffect(()=> localStorage.setItem('ii_user', JSON.stringify(user)), [user])
  useEffect(()=> localStorage.setItem('orders', JSON.stringify(orders.filter(o=>!o.cloud))), [orders])
  useEffect(()=> { if(products) localStorage.setItem('products_db', JSON.stringify(products)) }, [products])

  // ---------- Refresh cloud ----------
  const refreshCloudOrders = useCallback(async ()=>{
    if(!cloud) return
    try{
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(200)
      if(error) throw error
      const mapped = (data||[]).map(mapCloudOrder)
      setOrders(prev=> mergeOrders(prev, mapped))
    }catch(e){ console.warn('cloud orders:', e.message) }
  }, [])

  const refreshCloudProducts = useCallback(async ()=>{
    if(!cloud) return
    try{
      const { data, error } = await supabase.from('products').select('*')
      if(error) throw error
      if(data && data.length) setProductsState(data.map(mapCloudProduct))
    }catch(e){ console.warn('cloud products:', e.message) }
  }, [])

  const refreshCloudProfiles = useCallback(async ()=>{
    if(!cloud) return
    try{
      const { data, error } = await supabase.from('profiles').select('*').limit(500)
      if(error) throw error
      setCloudProfiles(data||[])
    }catch{ setCloudProfiles(null) }
  }, [])

  const refreshAll = useCallback(()=>{
    refreshCloudOrders(); refreshCloudProducts(); refreshCloudProfiles()
  }, [refreshCloudOrders, refreshCloudProducts, refreshCloudProfiles])

  // Session cloud au démarrage + realtime + refresh au focus
  useEffect(()=>{
    if(!cloud) return
    let mounted = true
    supabase.auth.getSession().then(async ({ data })=>{
      const s = data?.session
      if(s && mounted) await buildCloudUser(s.user)
      refreshAll()
    })
    const { data: sub } = supabase.auth.onAuthStateChange(async (_ev, session)=>{
      if(session?.user && mounted) await buildCloudUser(session.user)
    })
    const ch = supabase.channel('ztc-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, ()=> refreshCloudOrders())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, ()=> refreshCloudProducts())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, ()=> refreshCloudProfiles())
      .subscribe()
    const onFocus = ()=> refreshAll()
    window.addEventListener('focus', onFocus)
    return ()=>{ mounted = false; sub.subscription.unsubscribe(); supabase.removeChannel(ch); window.removeEventListener('focus', onFocus) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buildCloudUser = async (sbUser)=>{
    try{
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', sbUser.id).single()
      const email = (sbUser.email||'').toLowerCase()
      const u = {
        id: sbUser.id, cloud: true,
        name: prof?.name || sbUser.user_metadata?.name || email.split('@')[0] || 'Client',
        email, provider: 'email', principal: 'sb-'+String(sbUser.id).slice(0,8),
        isAdmin: !!(prof?.is_admin || isOwnerEmail(email)),
        createdAt: prof?.created_at || new Date().toISOString(),
      }
      sbUserId.current = sbUser.id
      setUser(u); saveProfile(u)
      return u
    }catch{
      const email = (sbUser.email||'').toLowerCase()
      const u = { id: sbUser.id, cloud: true, name: email.split('@')[0]||'Client', email, provider:'email', principal: 'sb-'+String(sbUser.id).slice(0,8), isAdmin: isOwnerEmail(email), createdAt: new Date().toISOString() }
      sbUserId.current = sbUser.id
      setUser(u); return u
    }
  }

  const upsertCloudProfile = async (sbUser, name)=>{
    try{
      const email = (sbUser.email||'').toLowerCase()
      // Pour un email propriétaire SANS ligne existante, l'INSERT passe avec is_admin=true
      // (aucun trigger sur INSERT). Si la ligne existe déjà, l'UPDATE est bloqué par le
      // trigger anti-escalade — dans ce cas supprime ta ligne via Table Editor puis reconnecte-toi.
      await supabase.from('profiles').upsert(
        { id: sbUser.id, email, name: name || sbUser.user_metadata?.name || email.split('@')[0], provider: 'email', ...(isOwnerEmail(email) ? { is_admin: true } : {}) },
        { onConflict: 'id' }
      )
    }catch{}
  }

  // ---- OAuth callback démo (Discord token direct, mode local) ----
  useEffect(()=>{
    const hash = window.location.hash
    if(hash.includes('access_token')){
      const params = new URLSearchParams(hash.slice(1))
      const token = params.get('access_token')
      const state = params.get('state')||''
      if(token){
        const provider = state.startsWith('discord') ? 'discord' : state.startsWith('facebook') ? 'facebook' : 'oauth'
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

  // Legacy Internet Identity (local)
  const login = (asAdmin=false)=>{
    const u = { id: genId('ii'), name: asAdmin?'Admin':'Joueur', email:'', provider:'Internet Identity', principal: genPrincipal(), isAdmin: asAdmin, createdAt: new Date().toISOString() }
    setUser(u); saveProfile(u); return u
  }

  // ---- Email : cloud si configuré, sinon local ----
  const signupWithEmail = async (name, email, password)=>{
    email = email.trim().toLowerCase()
    if(!email || !password) throw new Error('Email et mot de passe requis')
    if(password.length<4) throw new Error('Mot de passe trop court (min 4)')
    if(cloud){
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name: name||email.split('@')[0] } } })
      if(error) throw new Error(error.message)
      if(!data.session) throw new Error('Compte créé ! Vérifie ton email puis connecte-toi (ou désactive « Confirm email » dans Supabase > Auth).')
      await upsertCloudProfile(data.user, name)
      return await buildCloudUser(data.user)
    }
    const users = readUsers()
    if(users.find(u=> u.email===email)) throw new Error('Ce email a déjà un compte — connecte-toi')
    const u = { id: genId('email'), name: name||email.split('@')[0], email, passwordHash: hashPw(password), provider:'email', principal: genPrincipal(), isAdmin: isOwnerEmail(email), createdAt: new Date().toISOString() }
    users.push(u); localStorage.setItem('ztc_users', JSON.stringify(users))
    const { passwordHash, ...safe } = u
    setUser(safe); return safe
  }
  const loginWithEmail = async (email, password)=>{
    email = email.trim().toLowerCase()
    if(cloud){
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if(error) throw new Error(error.message === 'Invalid login credentials' ? 'Email ou mot de passe incorrect' : error.message)
      await upsertCloudProfile(data.user)
      const u = await buildCloudUser(data.user)
      refreshAll()
      return u
    }
    const users = readUsers()
    const found = users.find(u=> u.email===email)
    if(!found) throw new Error('Aucun compte avec cet email — crée un compte')
    if(found.passwordHash !== hashPw(password)) throw new Error('Mot de passe incorrect')
    const { passwordHash, ...safe } = found
    if(isOwnerEmail(email)) safe.isAdmin = true
    setUser(safe); saveProfile(safe); return safe
  }

  // ---- Discord / Facebook (démo locale ; commandes locales) ----
  const loginWithDiscord = ()=>{
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID
    if(clientId){
      const redirect = encodeURIComponent(window.location.origin + '/login')
      const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=token&scope=identify%20email&state=discord_${Date.now()}`
      window.location.href = url
      return null
    }
    const u = { id: genId('discord'), name: 'Joueur Discord', email:'', provider:'discord', principal: genPrincipal(), createdAt: new Date().toISOString() }
    setUser(u); saveProfile(u); return u
  }
  const loginWithFacebook = ()=>{
    const appId = import.meta.env.VITE_FACEBOOK_APP_ID
    if(appId){
      const redirect = encodeURIComponent(window.location.origin + '/login')
      const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirect}&scope=email&response_type=token&state=facebook_${Date.now()}`
      window.location.href = url
      return null
    }
    const u = { id: genId('fb'), name: 'Joueur Facebook', email:'', provider:'facebook', principal: genPrincipal(), createdAt: new Date().toISOString() }
    setUser(u); saveProfile(u); return u
  }

  // ---- Admin propriétaire ----
  const loginAdmin = (email, password)=>{
    const expectedEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@ztc.shop').toLowerCase()
    const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD || 'ztc2026admin'
    email = (email||'').trim().toLowerCase()
    if(email === expectedEmail && password === expectedPass){
      const u = { id: 'admin_owner', name: 'Admin ZTC', email, provider:'email', principal: genPrincipal(), isAdmin: true, createdAt: new Date().toISOString() }
      setUser(u); saveProfile(u); return u
    }
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

  const logout = async ()=>{
    try{ if(cloud) await supabase.auth.signOut() }catch{}
    sbUserId.current = null
    setUser(null)
  }

  // ---- Commandes : cloud si compte cloud, sinon local ----
  const addOrder = async (order)=>{
    const full = { ...order, cloud: !!(cloud && user?.cloud) }
    setOrders(prev=> [full, ...prev]) // optimiste : visible tout de suite
    if(full.cloud){
      try{
        await supabase.from('orders').insert({
          id: full.id, user_id: sbUserId.current || user.id,
          customer: { ...(full.customer||{}), provider: user.provider, principal: user.principal },
          items: full.items||[], total: full.total||0, method: full.method||'card', status: full.status,
        })
        refreshCloudOrders()
      }catch(e){ console.warn('cloud insert order:', e.message) }
    }
    return full
  }
  const updateOrderStatus = async (id, status)=>{
    setOrders(prev=> prev.map(x=> x.id===id? {...x, status}:x)) // optimiste
    const target = orders.find(o=> o.id===id)
    if(cloud && target?.cloud){
      try{ await supabase.from('orders').update({ status }).eq('id', id); refreshCloudOrders() }
      catch(e){ console.warn('cloud update order:', e.message) }
    }
  }

  // ---- Produits : écriture cloud (remplacement table, admin) ou locale ----
  const setProducts = (next)=>{
    setProductsState(next)
  }
  const saveProducts = async (next)=>{
    setProductsState(next)
    if(!cloud) return
    try{
      const rows = next.map(toCloudProduct)
      const ids = rows.map(r=>r.id)
      await supabase.from('products').delete().in('id', ids)
      const { error } = await supabase.from('products').insert(rows)
      if(error) throw error
      refreshCloudProducts()
    }catch(e){ console.warn('cloud save products:', e.message); throw e }
  }

  const myOrders = (u=user)=>{
    if(!u) return []
    return orders.filter(o=> o.userId===u.id || o.principal===u.principal || (u.email && o.customer?.email?.toLowerCase()===u.email.toLowerCase()))
  }

  // Tous les comptes : registre local + profils cloud + clients vus via commandes
  const allAccounts = ()=>{
    const map = new Map()
    readUsers().forEach(r=> map.set(r.id, { ...r, phones: [], ordersCount: 0, totalSpent: 0, lastOrder: null, orderIds: [] }))
    ;(cloudProfiles||[]).forEach(p=>{
      if(!map.has(p.id)) map.set(p.id, { id: p.id, name: p.name||'', email: p.email||'', provider: p.provider||'email', principal: '', isAdmin: !!p.is_admin, createdAt: p.created_at, lastSeen: p.created_at, phones: [], ordersCount: 0, totalSpent: 0, lastOrder: null, orderIds: [] })
      else { const a = map.get(p.id); a.isAdmin = a.isAdmin || !!p.is_admin; if(p.name) a.name = p.name; if(p.email) a.email = p.email }
    })
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

  // L'admin a-t-il la vue globale cloud ? (false tant que le SQL is_admin n'est pas exécuté)
  const needsDbGrant = cloud && !!user?.isAdmin && cloudProfiles === null

  return <AuthCtx.Provider value={{user, setUser, cloud, needsDbGrant, refreshAll, login, loginAdmin, loginWithEmail, signupWithEmail, loginWithDiscord, loginWithFacebook, logout, orders, myOrders, allAccounts, addOrder, updateOrderStatus, products, setProducts, saveProducts}}>{children}</AuthCtx.Provider>
}
export const useAuth = ()=> useContext(AuthCtx)
