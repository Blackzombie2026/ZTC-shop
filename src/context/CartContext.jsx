import { createContext, useContext, useEffect, useState } from 'react'

const CartCtx = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
  })
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart])

  const addToCart = (product, variant, qty = 1) => {
    setCart(prev => {
      const key = `${product.id}::${variant.id}`
      const idx = prev.findIndex(i => i.key === key)
      if (idx >= 0) {
        const c = [...prev]; c[idx] = { ...c[idx], qty: c[idx].qty + qty }; return c
      }
      return [...prev, {
        key, productId: product.id, variantId: variant.id,
        name: product.name, variantLabel: variant.label, price: variant.price,
        image: product.image, category: product.category, qty
      }]
    })
  }
  const updateQty = (key, qty) => {
    if (qty <= 0) setCart(c => c.filter(i => i.key !== key))
    else setCart(c => c.map(i => i.key === key ? { ...i, qty } : i))
  }
  const removeItem = (key) => setCart(c => c.filter(i => i.key !== key))
  const clearCart = () => setCart([])

  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0)
  const count = cart.reduce((s,i)=> s + i.qty, 0)

  return <CartCtx.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, total, count }}>{children}</CartCtx.Provider>
}
export const useCart = () => useContext(CartCtx)
