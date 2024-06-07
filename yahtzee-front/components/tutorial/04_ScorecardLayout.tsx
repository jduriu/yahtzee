
import Highlight from "./Highlight"
import Blur from "./BlurSm"
import DiceBoard from "../game/DiceBoard"
import GameFeed from "../game/GameFeed"
import ScoreCard from "../game/ScoreCard"

const ScorecardLayout = ({scorecard, setScorecard, gameFeed, setGameFeed, user}) => {

  return (
    <div className="w-full h-full relative">
      <div className="absolute w-full h-full flex gap-10 p-5">
        <div className="w-1/2 h-full flex flex-col gap-5">
          <DiceBoard scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed}/>
          <div className="w-full h-full relative">
            <Blur>
              <GameFeed user={user} gameFeed={gameFeed} />
            </Blur>
            <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
              <div className="bg-white border-4 border-black text-black p-10 rounded-xl flex flex-col gap-5">
                <div>This is scorecard</div>
                <div>It shows all of the values scored in the given game</div>
                <div>Categories with " - " have not been scored</div>
                <div>Totals are auto-calculated and displayed in their respective rows</div>
                <div>Score descriptions appear when you hover over a category</div>
                <div>In the dice board, select a category and click the score button, you will see the score appear in the scorecard</div>
                <div>Click Next to continue the tutorial</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full">
          <Highlight>
            <ScoreCard scorecard={scorecard} />
          </Highlight>
        </div>
      </div>
    </div>
  )
}

export default ScorecardLayout;
