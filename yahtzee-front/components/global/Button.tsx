import React from "react";

interface ButtonProps {
  clickHandler?: () => void;
  content: string;
  style?: "default" | "small" | "large" | "submit" | "list-play" | "logout" | "score" | "arcade-orange" | "arcade-blue" | "arcade-red" | "arcade-green";
}

const Button: React.FC<ButtonProps> = ({
  clickHandler,
  content,
  style = "default",
}) => {
  const buttonClasses = {
    "default": "px-4 py-2 rounded-xl text-lg border border-red hover:bg-blue-500 duration-300",

    "small": "p-1 rounded-xl text-lg bg-white",

    "large": `px-6 py-2 rounded-xl text-xl border-2 border-white bg-blue-400
      hover:bg-red-400 hover:text-white hover:border-black
      duration-500`,

    "list-play": "py-1 px-4 rounded-full text-sm border border-white hover:bg-blue-500 shadow-xl",

    "submit": `px-10 py-2 text-white bg-blue-500 border-4 border-gray-300 rounded-full hover:bg-gray-300
     hover:border-black hover:text-black duration-300`,

    "logout": "border border-black rounded-full w-[75px]",

    "score": "px-5 py-2 border-2 border-black bg-gray-100 text-black rounded-lg hover:bg-gray-300",

    "arcade-orange": "game-button orange",

    "arcade-red": "game-button red",

    "arcade-blue": "game-button",

    "arcade-green": "game-button green"
  };

  return (
    <button onClick={clickHandler} className={`${buttonClasses[style]}`}>
      {content}
    </button>
  );
};

export default Button;
