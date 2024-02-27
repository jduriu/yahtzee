export default function SubmitButton({buttonHandler, name}) {
  return(
    <button
    className="px-10 py-2 text-white bg-blue-500 border-4 border-gray-300 rounded-full
    hover:bg-gray-300 hover:border-black hover:text-black duration-300"
    onClick={buttonHandler}
    >
      {name}
    </button>
  )
}
