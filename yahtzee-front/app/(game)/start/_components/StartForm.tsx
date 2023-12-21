'use client'

export default function StartForm() {

  const createNewGame = () => {
    // Create Game Logic Here
    // Use Auth info for player information
    // Send POST request to create game
    // Redirect to Play page
    return
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="text-3xl">Play Mode</div>
      <button
        className="text-2xl border-2 border-black rounded-lg bg-blue-300 py-2 px-3"
        onClick={createNewGame}
      >
        Single Player
      </button>
    </div>
  )
}
