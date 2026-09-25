import { Component } from 'react'

// Filet anti page noire : affiche un message + bouton recharge au lieu d'un écran vide
export default class ErrorBoundary extends Component {
  constructor(p){ super(p); this.state = { err: null } }
  static getDerivedStateFromError(e){ return { err: e } }
  componentDidCatch(){}
  render(){
    if(this.state.err){
      return (
        <div style={{maxWidth:520,margin:'60px auto',padding:24,textAlign:'center',fontFamily:'sans-serif',color:'#fff',background:'#141417',borderRadius:16}}>
          <h2>Oups — problème d'affichage</h2>
          <p style={{opacity:.7,fontSize:14}}>Le site a besoin d'être rechargé (nouvelle version).</p>
          <button onClick={()=>{ try{ localStorage.removeItem('products_db') }catch{}; location.reload() }} style={{marginTop:12,padding:'12px 24px',borderRadius:12,border:0,background:'#a3e635',color:'#000',fontWeight:800,cursor:'pointer'}}>↻ Recharger le site</button>
        </div>
      )
    }
    return this.props.children
  }
}
