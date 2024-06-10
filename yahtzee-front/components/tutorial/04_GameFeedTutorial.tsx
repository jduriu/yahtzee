
import Highlight from "./Highlight"
import Blur from "./BlurSm"
import DiceBoard from "../game/DiceBoard"
import GameFeed from "../game/GameFeed"
import ScoreCard from "../game/ScoreCard"

const GameFeedTutorial = ({scorecard, setScorecard, gameFeed, setGameFeed, user}) => {

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 left-0 w-full h-full flex gap-10 p-5">
        <div className="w-1/2 h-full flex flex-col gap-5">
            <DiceBoard scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed}/>
          <Highlight>
            <GameFeed user={user} gameFeed={gameFeed} />
          </Highlight>
        </div>
        <div className="w-1/2 h-full relative">
          <Blur>
            <ScoreCard scorecard={scorecard} />
          </Blur>
          <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="bg-white border-4 border-black text-black p-10 rounded-xl flex flex-col gap-5">
              <div>This is the Game Feed</div>
              <div>It will show the logged game instances for rolls and scores</div>
              <div>If playing with a logged in account, games will be saved and the logs will re-appear when a game is re-opened</div>
              <div>Click next to see full page, you can continue to play as a guest</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameFeedTutorial;
