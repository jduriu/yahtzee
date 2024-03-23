import DiceRoller from "./_diceBoardComps/DiceRoller"

export default function DiceBoard() {
  return (

    // initialize a new turn
    //

    <div className="w-full h-full flex flex-col">
      <div className="h-1/3">
        <DiceRoller/>
      </div>
    </div>

  )
}
