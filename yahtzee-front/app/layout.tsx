import type { Metadata } from 'next'
import { Play } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import './globals.css'

const play = Play({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-play'
})

export const metadata: Metadata = {
  title: 'Yahtzee',
  description: 'Frontend Next app for yahtzee',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${play.variable} font-sans w-screen h-screen`}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
