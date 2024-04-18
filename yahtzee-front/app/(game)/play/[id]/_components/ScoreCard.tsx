export default function ScoreCard({ scorecard }) {

  const getUpperSubtotal = () => {
    const values = [ones, twos, threes, fours, fives, sixes]
    let subtotal = 0
    for (let value of values) {
      if (value !== '-') {
        subtotal += value
      }
    }
    return subtotal
  }

  const getUpperTotal = () => {
    if (bonus) {
      return upperSubTotal + 35
    } else {
      return upperSubTotal
    }
  }

  const getLowerTotal = () => {
    const values  = [threeOfKind, fourOfKind, fullHouse, smStraight, lgStraight, yahtzee]
    let subtotal = 0
      for (let value of values) {
        if (value !== '-') {
          subtotal += value
        }
      }
    return subtotal + (yahtzeeBonus * 100)
  }

  const getGrandTotal = () => {
    return upperTotal + lowerTotal
  }

  const ones = scorecard.ones ?? '-'
  const twos = scorecard.twos ?? '-'
  const threes  = scorecard.threes ?? '-'
  const fours = scorecard.fours ?? '-'
  const fives = scorecard.fives ?? '-'
  const sixes = scorecard.sixes ?? '-'
  const bonus = false
  const upperSubTotal = getUpperSubtotal()
  const upperTotal = getUpperTotal()

  const threeOfKind = scorecard.three_of_kind ?? '-'
  const fourOfKind = scorecard.four_of_kind ?? '-'
  const fullHouse = scorecard.full_house ?? '-'
  const smStraight = scorecard.sm_straight ?? '-'
  const lgStraight = scorecard.lg_straight ?? '-'
  const yahtzee = scorecard.yahtzee ?? '-'
  const chance = scorecard.chance ?? '-'
  const yahtzeeBonus = scorecard.yahtzee_bonus ?? 0
  const lowerTotal = getLowerTotal()
  const grandTotal = getGrandTotal()

  return (
    <div className="w-full h-full px-10 py-5 text-md overflow-y-scroll">
      <div className="text-3xl py-3">SCORE CARD</div>
      <div className="text-2xl">Upper Section</div>

      <div className="grid grid-cols-[75%_25%] xl:grid-cols-[30%_20%_50%] py-3">
        <div>
          <div>Ones</div>
          <div>Twos</div>
          <div>Threes</div>
          <div>Fours</div>
          <div>Fives</div>
          <div>Sixes</div>
          <div>Upper Subtotal</div>
          <div>Bonus</div>
          <div>Upper Total</div>
        </div>
        <div>
          <div>{ones}</div>
          <div>{twos}</div>
          <div>{threes}</div>
          <div>{fours}</div>
          <div>{fives}</div>
          <div>{sixes}</div>
          <div>{upperSubTotal}</div>
          <div>{bonus ? "True" : "False"}</div>
          <div>{upperTotal}</div>
        </div>
        <div className="hidden lg:block">
          <div>Count and Add Only Ones</div>
          <div>Count and Add Only Twos</div>
          <div>Count and Add Only Threes</div>
          <div>Count and Add Only Fours</div>
          <div>Count and Add Only Fives</div>
          <div>Count and Add Only Sixes</div>
          <div>If total score is 63 or over</div>
        </div>
      </div>

      <div className="text-2xl">Lower Section</div>

      <div className="grid grid-cols-[75%_25%] xl:grid-cols-[30%_20%_50%] py-3">
        <div>
          <div>3 of a Kind</div>
          <div>4 of a Kind</div>
          <div>Full House</div>
          <div>Sm. Straight</div>
          <div>Lg. Straight</div>
          <div>Yahtzee</div>
          <div>Chance</div>
          <div>Yahtzee Bonus</div>
          <div>Lower Total</div>
          <div>Upper Total</div>
          <div>Grand Total</div>
        </div>
        <div>
          <div>{threeOfKind}</div>
          <div>{fourOfKind}</div>
          <div>{fullHouse}</div>
          <div>{smStraight}</div>
          <div>{lgStraight}</div>
          <div>{yahtzee}</div>
          <div>{chance}</div>
          <div>{yahtzeeBonus * 100}</div>
          <div>{lowerTotal}</div>
          <div>{upperTotal}</div>
          <div>{grandTotal}</div>
        </div>
        <div className="hidden lg:block">
          <div>Add total of 3 matching dice</div>
          <div>Add total of 4 matching dice</div>
          <div>Add total of 3 matching dice + 2 matching dice</div>
          <div>Sequence of 4</div>
          <div>Sequence of 5</div>
          <div>5 of a Kind</div>
          <div>Add Total of All Dice</div>
          <div>100 for Each Bonus</div>
        </div>
      </div>
    </div>
  )
}
