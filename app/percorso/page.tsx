'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MascotSushi from '@/components/MascotSushi'

type Lesson = { id:string, title:string }
type Chapter = { id:string, title:string, lessons:Lesson[] }

export default function PercorsoPage(){
  const [chapters,setChapters] = useState<Chapter[]>([])
  const [completed,setCompleted] = useState<Record<string, boolean>>({})
  const [msg,setMsg] = useState<string>('Pronto a fare una lezione?')

  useEffect(()=>{
    fetch('/api/percorso').then(r=>r.json()).then(d=> setChapters(d.chapters))
  },[])

  function progressCount(){
    return Object.values(completed).filter(Boolean).length
  }

  async function completeLesson(id:string){
    // mark completed locally
    setCompleted(prev=> ({...prev, [id]: true}))
    setMsg('Otsukaresama! +1 pezzo del puzzle 🧩')
    // tick streak on server
    await fetch('/api/streak', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ action:'tick' }) })
  }

  return (
    <div style={{background:'#141923', border:'1px solid #1f2633', borderRadius:10, padding:16}}>
      <h2>Percorso (tipo Duolingo, ma meglio per N4→N3)</h2>
      <p style={{opacity:.85}}>Ogni tappa ha 6–7 lezioni. Lo streak aumenta <b>solo qui</b>. Completa almeno 1 lezione al giorno per non perderlo.</p>
      <div style={{display:'grid', gap:16}}>
        {chapters.map((c,idx)=> (
          <div key={c.id} style={{border:'1px solid #2b3344', borderRadius:12, padding:12}}>
            <h3 style={{marginTop:0}}>{c.title}</h3>
            <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
              {c.lessons.map((l,i)=>{
                const done = !!completed[l.id]
                return (
                  <motion.button key={l.id}
                    whileTap={{ scale: .97 }}
                    onClick={()=> completeLesson(l.id)}
                    style={{ padding:'10px 12px', borderRadius:10, border:'1px solid #2b3344', background: done ? '#1e2a1e' : '#1a2233', color:'#eaeef2'}}
                  >
                    {l.title} {done ? '✓' : ''}
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:16, fontSize:12, opacity:.8}}>Lezioni completate: {progressCount()}</div>
      <MascotSushi message={msg}/>
    </div>
  )
}