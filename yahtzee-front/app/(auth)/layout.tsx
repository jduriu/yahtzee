import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className + "w-screen h-screen"}>
      <div className="h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
