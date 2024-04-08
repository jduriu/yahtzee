interface ButtonProps {
  clickHandler: () => void;
  content: string;
  style: string;
}

const Button: React.FC<ButtonProps> = ({ clickHandler, content, style }) => {
  const buttonClasses = {
    "default": "px-4 py-2 rounded-xl text-lg bg-white hover:bg-blue-500",
    "small": "p-1 rounded-xl text-lg bg-white",
    "large": `px-6 py-2 rounded-xl text-xl border-2 border-white bg-blue-400
      hover:bg-red-400 hover:text-white hover:border-black
      duration-500`,
    "submit": `px-10 py-2 text-white bg-blue-500 border-4 border-gray-300 rounded-full
    hover:bg-gray-300 hover:border-black hover:text-black duration-300`,
    "logout": `border border-black rounded-full w-[75px]`
  }

  return (
    <button
      onClick={clickHandler}
      className={`${buttonClasses[style ?? "default"]}`}
    >
      {content}
    </button>
  )
}

export default Button
