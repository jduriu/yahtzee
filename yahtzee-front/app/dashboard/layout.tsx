import Header from '@/global_components/Header'
import Footer from '@/global_components/Footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="w-full h-[75px]">
        <Header/>
      </div>
      <main className='h-[calc(100%-150px)]'>
          {children}
      </main>
      <div className="w-full h-[75px]">
        <Footer/>
      </div>
    </>
  )
}
