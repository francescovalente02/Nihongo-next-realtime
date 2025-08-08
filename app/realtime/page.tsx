'use client'
import { useRef, useState } from 'react'

export default function RealtimePage(){
  const [connected,setConnected] = useState(false)
  const localAudio = useRef<HTMLAudioElement>(null)
  const remoteAudio = useRef<HTMLAudioElement>(null)

  async function connect(){
    const tokenResp = await fetch('/api/realtime')
    const token = await tokenResp.json()
    alert('Stub: inizializza WebRTC con Realtime API usando token effimero.')
    setConnected(true)
  }

  return <div style={{background:'#141923', border:'1px solid #1f2633', borderRadius:10, padding:16}}>
    <h2>Realtime Tutor (Voce/Chat)</h2>
    <button onClick={connect} disabled={connected}>{connected?'Connesso':'Connetti Voce'}</button>
    <div style={{display:'none'}}>
      <audio ref={localAudio} autoPlay muted></audio>
      <audio ref={remoteAudio} autoPlay></audio>
    </div>
  </div>
}