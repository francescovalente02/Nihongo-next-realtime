export default function GamesPage(){
  return <div style={{background:'#141923', border:'1px solid #1f2633', borderRadius:10, padding:16}}>
    <h2>Giochi</h2>
    <ul>
      <li>Kanji Memory (da implementare qui in client)</li>
      <li>Speed Kanji (timer 10s/5s)</li>
      <li>Boss Battle</li>
      <li>Survival (dialoghi a scelta multipla)</li>
    </ul>
    <p className="small">Suggerimento: questi mini-giochi possono vivere 100% client-side con dati JSON o via API Route.</p>
  </div>
}