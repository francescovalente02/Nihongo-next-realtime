'use client'
import { useEffect, useState } from 'react'

type Kanji = { id:string, kanji:string, meanings:string[], onyomi?:string[], kunyomi?:string[], examples?: any[] }

export default function TrainerPage(){
  const [level,setLevel] = useState<'N4'|'N3'>('N4')
  const [items,setItems] = useState<Kanji[]>([])
  const [i,setI] = useState(0)
  const [show,setShow] = useState(false)

  useEffect(()=>{
    fetch(`/api/kanji?level=${level}`).then(r=>r.json()).then(d=> setItems(d.items))
  },[level])

  if (!items.length) return <div className="card">Caricamento...</div>
  const k = items[i]

  return <div style={{background:'#141923', border:'1px solid #1f2633', borderRadius:10, padding:16}}>
    <h2>Kanji Trainer – {level}</h2>
    <div style={{fontSize:42, textAlign:'center'}}>{k.kanji}</div>
    <button onClick={()=>setShow(!show)}>{show?'Nascondi':'Mostra dettagli'}</button>
    {show && <div>
      <p><b>Significati:</b> {k.meanings.join(', ')}</p>
      <p><b>On:</b> {(k.onyomi||[]).join(' / ')} | <b>Kun:</b> {(k.kunyomi||[]).join(' / ')}</p>
      <div style={{opacity:.8, fontSize:'.9rem'}}><b>Esempi:</b> {(k.examples||[]).map((e:any)=>`${e.jp} (${e.romaji}) — ${e.it}`).join(' / ')}</div>
    </div>}
    <div style={{marginTop:12}}>
      <button onClick={()=> setI((i+1)%items.length)}>Avanti</button>
      <span style={{marginLeft:12}}>Card {i+1}/{items.length}</span>
    </div>
    <div style={{marginTop:16}}>
      <label>Livello:</label>{' '}
      <button onClick={()=> setLevel(level==='N4'?'N3':'N4')}>{level}</button>
    </div>
  </div>
}