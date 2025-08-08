import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// This endpoint exchanges your server API key for a short-lived client token.
// The client uses that token to start a WebRTC session with the Realtime API.
export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return new NextResponse('Missing OPENAI_API_KEY', { status: 500 })
  const client = new OpenAI({ apiKey })
  // NOTE: In production, set permissions and TTL appropriately.
  const token = await client.realtime.sessions.create({
    model: process.env.OPENAI_REALTIME_MODEL || 'gpt-4o-realtime-preview-2024-12-17',
    // Optionally set voice, modalities, instructions, tools, etc.
  })
  return NextResponse.json(token)
}