
import Highlight from "./Highlight"
import Blur from "./BlurSm"
import DiceBoard from "../game/DiceBoard"
import GameFeed from "../game/GameFeed"
import ScoreCard from "../game/ScoreCard"

const DiceBoardLayout = ({scorecard, setScorecard, gameFeed, setGameFeed, user}) => {

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 left-0 w-full h-full flex gap-10 p-5">
        <div className="w-1/2 h-full flex flex-col gap-5">
          <Highlight>
            <DiceBoard scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed}/>
          </Highlight>
          <Blur>
            <GameFeed user={user} gameFeed={gameFeed} />
          </Blur>
        </div>
        <div className="w-1/2 h-full relative">
          <Blur>
            <ScoreCard scorecard={scorecard} />
          </Blur>
          <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="bg-white border-4 border-black text-black p-10 rounded-xl flex flex-col gap-5">
              <div>This is the Diceboard</div>
              <div>It is where you can roll dice, hold dice, and score</div>
              <div>On a given turn, you may re-roll at max 3 times before a score must be recorded</div>
              <div>Try clicking on the roll button to make your first roll</div>
              <div>You will see the dice values along with the scoring options</div>
              <div>Try holding and releasing a dice by clicking on the dice icons, you should see the hold dice change position and color as you toggle</div>
              <div>Dice which are held will not be re-rolled</div>
              <div>Try holding a die and rolling again to see how it works</div>
              <div>Click Next to see how to score!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiceBoardLayout;
