import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/global_components/Header'
import Footer from '@/global_components/Footer'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className + "w-screen h-screen"}>
        <Header/>
        <main className='h-[calc(100%-100px)]'>
            {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
