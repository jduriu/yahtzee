
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-screen h-screen">
      <div className="h-full flex items-center justify-center">
        <div className="h-[90%] sm:w-3/4 lg:w-2/3 xl:w-1/3 rounded-3xl shadow-2xl p-5">
          {children}
        </div>
      </div>
    </div>
  )
}
