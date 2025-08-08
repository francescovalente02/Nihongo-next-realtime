import { NextResponse } from 'next/server'
import percorso from '@/data/percorso.json'

// In a real app, merge with user progress.
export async function GET(){
  return NextResponse.json(percorso)
}