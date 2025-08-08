'use client'
import { motion } from 'framer-motion'

export default function MascotSushi({message}:{message?:string}){
  return (
    <div style={{position:'fixed', right:16, bottom:16, zIndex:50}}>
      <motion.div
        initial={{ y: 40, opacity:0 }}
        animate={{ y: 0, opacity:1 }}
        transition={{ type:'spring', stiffness:220, damping:18 }}
        style={{ display:'flex', alignItems:'flex-end', gap:8 }}
      >
        {message && (
          <motion.div
            key={message}
            initial={{ opacity:0, scale:0.9 }}
            animate={{ opacity:1, scale:1 }}
            exit={{ opacity:0 }}
            style={{ background:'#11141a', border:'1px solid #1f2633', padding:'8px 12px', borderRadius:10, maxWidth:220 }}
          >
            {message}
          </motion.div>
        )}
        <motion.div
          animate={{ rotate:[-3,0,3,0], y:[0,-2,0] }}
          transition={{ repeat: Infinity, duration:4 }}
          style={{ width:64, height:64, borderRadius:12, background:'#1a2233', border:'1px solid #2b3344', display:'grid', placeItems:'center' }}
          title="Sushi-kun"
        >
          {/* Simple emoji face sushi */}
          <div style={{fontSize:28}}>🍣</div>
        </motion.div>
      </motion.div>
    </div>
  )
}