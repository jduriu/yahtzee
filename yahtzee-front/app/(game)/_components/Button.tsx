interface ButtonProps {
  action: () => void;
  buttonProps: {
    name: string;
    style?: "default" | "small";
  };
}

const Button: React.FC<ButtonProps> = ({ action, buttonProps }) => {
  const buttonClasses = {
    "default": "px-4 py-2 rounded-xl text-lg bg-white hover:bg-blue-500",
    "small": "p-1 rounded-xl text-lg bg-white"
  }

  return (
    <button
      onClick={action}
      className={`${buttonClasses[buttonProps.style ?? "default"]}`}
    >
      {buttonProps.name}
    </button>
  )
}

export default Button
