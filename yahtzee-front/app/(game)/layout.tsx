import Header from "./_components/Header"
import Footer from "./_components/Footer"

import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className={inter.className + "w-screen h-screen"}>
      <div className="w-full h-full flex flex-col justify-between">
        <Header/>
        <main className="h-full">
          {children}
        </main>
        <Footer/>
      </div>
    </body>
  )
}
