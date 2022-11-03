import React from 'react'
import { Squeak as Squeak_ } from 'squeak-react'

interface SqueakProps {
  slug: string
}

export function Squeak({ slug }: SqueakProps): JSX.Element {
  return (
    <div className="Squeak">
      <Squeak_
        apiHost="https://squeak.cloud"
        apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXBrcXV2d3FhYXVudXpqb2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MjE3ODUsImV4cCI6MTk2NTI5Nzc4NX0.SxdOpxHjVwap7sDUptK2TFJl7WK3v3HLuKbzb0JKeKg"
        url="https://pxipkquvwqaaunuzjoge.supabase.co"
        organizationId="2006f85c-6db5-4f4d-a413-ac2b667f3a80"
        slug={slug}
      />
    </div>
  )
}