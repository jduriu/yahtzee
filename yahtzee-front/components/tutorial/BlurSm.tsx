interface BlurProps {
  children: JSX.Element
}

const Blur = ({children}: BlurProps) => {
  return (
    <div className="w-full h-full blur-sm">
      {children}
    </div>
  )
}

export default Blur;
