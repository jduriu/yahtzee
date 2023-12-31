import DiceRoller from "./_diceBoardComps/DiceRoller"

export default function DiceBoard() {
  return (

    <div className="w-full h-full flex flex-col">
      <div className="h-1/3">
        <DiceRoller/>
      </div>
      <div className="h-2/3">
        Dice Holder
      </div>
    </div>

  )
}
