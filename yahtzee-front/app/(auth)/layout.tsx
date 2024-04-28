export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full">
      <div className="h-full flex justify-center items-center">
        <div className="h-[90%] sm:w-3/4 md:w-2/3 xl:w-1/2 rounded-3xl shadow-blue p-5">
          {children}
        </div>
      </div>
    </main>
  );
}
