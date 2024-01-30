export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen">
      <div className="h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
