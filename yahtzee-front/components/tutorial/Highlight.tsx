interface BlurProps {
  children: JSX.Element
}

const Highlight = ({children}: BlurProps) => {
  return (
    <div className="w-full h-full border-4 rounded-lg border-red-600">
      {children}
    </div>
  )
}

export default Highlight;
