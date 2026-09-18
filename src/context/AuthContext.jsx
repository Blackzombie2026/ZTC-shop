import { createContext, useContext, useEffect, useState } from 'react'

const AuthCtx = createContext()

function genPrincipal(){ return 'aaaaa-aa-' + Math.random().toString(36).slice(2,7) + '-' + Math.random().toString(36).slice(2,7) }

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('ii_user')||'null')}catch{return null}
  })
  const [orders, setOrders] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('orders')||'[]')}catch{return []}
  })
  const [products, setProducts] = useState(()=>{
    try{ const p=JSON.parse(localStorage.getItem('products_db')||'null'); return p }catch{return null}
  })

  useEffect(()=> localStorage.setItem('ii_user', JSON.stringify(user)), [user])
  useEffect(()=> localStorage.setItem('orders', JSON.stringify(orders)), [orders])
  useEffect(()=> { if(products) localStorage.setItem('products_db', JSON.stringify(products)) }, [products])

  const login = (asAdmin=false)=>{
    const u = { principal: genPrincipal(), provider:'Internet Identity', isAdmin: asAdmin, createdAt: new Date().toISOString() }
    setUser(u); return u
  }
  const logout = ()=> setUser(null)
  const addOrder = (order)=> setOrders(o=>[order, ...o])
  const updateOrderStatus = (id, status)=> setOrders(o=> o.map(x=> x.id===id? {...x, status}:x))

  return <AuthCtx.Provider value={{user, login, logout, orders, addOrder, updateOrderStatus, products, setProducts}}>{children}</AuthCtx.Provider>
}
export const useAuth = ()=> useContext(AuthCtx)
