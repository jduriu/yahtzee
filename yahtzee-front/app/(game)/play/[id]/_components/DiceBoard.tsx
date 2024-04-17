import DiceRoller from "./_diceBoardComps/DiceRoller"

export default function DiceBoard({scorecard}) {
  console.log(scorecard)

  const getTurnsRemaining = () => {
    if (scorecard.scored) {
      return 13 - scorecard.scored.length
    }
  }


  return (
    <div className="w-full h-full flex flex-col">
      <div>Turns remaining: {getTurnsRemaining()}</div>
      <div className="h-1/3">
        <DiceRoller/>
      </div>
      <div>
        Suggestions:
      </div>
    </div>
  )
}
