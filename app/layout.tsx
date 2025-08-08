import StreakPuzzle from '@/components/StreakPuzzle'
export const metadata = { title: 'Nihongo N4→N3', description: 'Japanese learning app (Next.js + OpenAI Realtime)' }
export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="it">
      <body style={{fontFamily:'system-ui, -apple-system, Segoe UI, Roboto, Noto Sans JP, sans-serif', background:'#0b0c0f', color:'#eaeef2', margin:0}}>
        <header style={{background:'#11141a', position:'sticky', top:0, padding:'12px 16px'}}>
          <nav style={{maxWidth:980, margin:'0 auto', display:'flex', gap:12, alignItems:'center'}}>
            <a href="/" style={{color:'#68a0ff'}}>Home</a>
            <a href="/n4" style={{color:'#68a0ff'}}>Sezione N4</a>
            <a href="/n3" style={{color:'#68a0ff'}}>Sezione N3</a>
            <a href="/trainer" style={{color:'#68a0ff'}}>Kanji Trainer</a>
            <a href="/games" style={{color:'#68a0ff'}}>Giochi</a>
            <a href="/anime" style={{color:'#68a0ff'}}>Anime</a>
            <a href="/realtime" style={{color:'#68a0ff'}}>Realtime</a>
          </nav>
        </header>
        <main style={{maxWidth:980, margin:'0 auto', padding:16}}>{children}</main>
      </body>
    </html>
  )
}