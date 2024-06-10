
import DiceBoard from "../game/DiceBoard"
import GameFeed from "../game/GameFeed"
import ScoreCard from "../game/ScoreCard"

const GameLayout = ({scorecard, setScorecard, gameFeed, setGameFeed, user}) => {

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 left-0 w-full h-full flex gap-10 p-5">
        <div className="w-1/2 h-full flex flex-col gap-5">
          <DiceBoard scorecard={scorecard} setScorecard={setScorecard} gameFeed={gameFeed} setGameFeed={setGameFeed}/>
          <GameFeed user={user} gameFeed={gameFeed} />
        </div>
        <div className="w-1/2 h-full ">
          <ScoreCard scorecard={scorecard} />
        </div>
      </div>
    </div>
  )
}

export default GameLayout;
