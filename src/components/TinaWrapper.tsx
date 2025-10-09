import React from 'react'
import { TinaProvider } from 'tinacms/dist/react'
import { TinaCMS } from 'tinacms'

const cms = new TinaCMS({
  enabled: import.meta.env.DEV,
  sidebar: true,
})

export const TinaWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TinaProvider cms={cms}>
      {children}
    </TinaProvider>
  )
}