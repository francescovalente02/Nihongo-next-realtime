'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import images from '@/data/puzzleImages.json'

type Streak = { dayCount:number, lastDate:string|null, puzzleIndex:number, pieceCount:number }

export default function StreakPuzzle(){
  const [s,setS] = useState<Streak|null>(null)
  const [completed,setCompleted] = useState(false)

  async function load(){ const r = await fetch('/api/streak'); setS(await r.json()) }
  useEffect(()=>{ load() }, [])

  // Grid 5x2 = 10 pieces
  const pieces = new Array(10).fill(0).map((_,i)=> i)

  const img = images[(s?.puzzleIndex ?? 0) % images.length]

  return (
    <div style={{display:'flex', alignItems:'center', gap:8}}>
      <div style={{position:'relative', width:76, height:48, overflow:'hidden', borderRadius:8, border:'1px solid #2b3344'}}>
        {/* background image */}
        <img src={`/${img.file}`} alt={img.name_romaji} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(60%)'}} />
        {/* overlay pieces */}
        {s && pieces.map(i=>{
          const filled = i < s.pieceCount
          const col = i % 5, row = Math.floor(i/5)
          return (
            <motion.div key={i}
              initial={{ opacity:0, scale:0.8 }}
              animate={{ opacity: filled ? 1 : 0.15, scale: filled ? 1 : 1 }}
              transition={{ duration: .35, delay: filled ? i*0.02 : 0 }}
              style={{
                position:'absolute',
                left: `${col*20}%`,
                top:  `${row*50}%`,
                width:'20%', height:'50%',
                backgroundImage:`url(/${img.file})`,
                backgroundPosition: `${-col*20}% ${-row*50}%`,
                backgroundSize:'500% 200%',
                border:'1px solid rgba(0,0,0,0.15)'
              }}
            />
          )
        })}
      </div>
      <div style={{display:'grid'}}>
        <div style={{fontSize:12, opacity:.8}}>Streak</div>
        <div style={{fontWeight:700}}>{s?.dayCount ?? 0} giorni</div>
      </div>
      <AnimatePresence>
        {s && s.pieceCount===0 && s.dayCount>0 && (
          <motion.div
            initial={{ opacity:0, y:-8 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0 }}
            style={{marginLeft:8, fontSize:12, opacity:.9}}
          >
            {img.name_ja} — {img.name_romaji}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}