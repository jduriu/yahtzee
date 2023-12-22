import DiceBoard from "./_components/DiceBoard";
import ScoreCard from "./_components/ScoreCard";

export default function Play() {
  return (
    <div className="w-full h-full flex gap-3 p-5 border-2 border-black">
      <div className="w-1/2 h-full border-2 border-black">
        <DiceBoard/>
      </div>
      <div className="w-1/2 h-full border-2 border-black">
        <ScoreCard/>
      </div>
    </div>
  )
}
