import { NextResponse } from 'next/server'

// Demo in-memory store (in production replace with DB)
let store = {
  dayCount: 0,           // total consecutive days
  lastDate: null,        // ISO string
  puzzleIndex: 0,        // which Tokyo neighborhood
  pieceCount: 0          // 0..10
}

export async function GET(){
  return NextResponse.json(store)
}

export async function POST(req: Request){
  const body = await req.json().catch(()=>({}))
  const today = new Date().toISOString().slice(0,10)

  if (body.action === 'tick') {
    const last = store.lastDate
    if (last === today) {
      // already counted
      return NextResponse.json(store)
    }
    // Simple consecutive day check
    const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10)
    if (last && last !== yesterday) {
      // missed a day -> reset
      store.dayCount = 0
      store.pieceCount = 0
    }
    store.lastDate = today
    store.dayCount += 1
    store.pieceCount += 1

    if (store.pieceCount >= 10){
      // Completed puzzle
      store.pieceCount = 0
      store.puzzleIndex = (store.puzzleIndex + 1) % 5
    }
  }
  return NextResponse.json(store)
}