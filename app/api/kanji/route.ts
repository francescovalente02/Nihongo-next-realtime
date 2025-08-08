import { NextResponse } from 'next/server'
import n4 from '@/data/kanji_n4.json'
import n3 from '@/data/kanji_n3.json'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const level = (searchParams.get('level') || 'N4').toUpperCase()
  const data = level === 'N3' ? n3 : n4
  return NextResponse.json({ level, count: data.length, items: data })
}