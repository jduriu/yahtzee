
import Highlight from "./Highlight"
import DiceBoard from "../game/DiceBoard"
import GameFeed from "../game/GameFeed"
import ScoreCard from "../game/ScoreCard"

const GameLayoutBlurWithModal = ({scorecard, setScorecard, gameFeed, setGameFeed, user}) => {

  return (
    <div className="w-full h-full relative">
      <Highlight>
          <div className="absolute top-0 left-0 w-full h-full flex gap-10 p-5">
            <div className="w-1/2 h-full flex flex-col gap-5">
              <DiceBoard scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed}/>
              <GameFeed user={user} gameFeed={gameFeed} />
            </div>
            <div className="w-1/2 h-full ">
              <ScoreCard scorecard={scorecard} />
            </div>
          </div>
      </Highlight>
      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="bg-white border-4 border-black text-black p-10 rounded-xl flex flex-col gap-5">
          <div>This is the Game Board</div>
          <div>Click Next to continue</div>
        </div>
      </div>
    </div>
  )
}

export default GameLayoutBlurWithModal;