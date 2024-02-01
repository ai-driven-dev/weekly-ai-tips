import { fetchTips } from '@/src/features/tipsManagement/api/fetchTips'
import type TipEntity from '@/src/features/tipsManagement/types/TipEntity'
import React from 'react'

async function getData(): Promise<Array<Partial<TipEntity>>> {
  const tips = fetchTips()

  return await tips
}

export default async function Page(): Promise<React.ReactElement> {
  const data = await getData()

  return (
    <main>
      <pre style={{ height: '200px', overflow: 'auto' }}>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </main>
  )
}
