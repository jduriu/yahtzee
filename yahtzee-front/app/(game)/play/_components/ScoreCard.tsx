'use client'

import { useState } from 'react'

export default function ScoreCard() {

  const getUpperSubtotal = () => {
    const initialValue = 0
    const values = [aces, twos, threes, fours, fives, sixes]
    const subtotal = values.reduce((acc, val) => acc + val, initialValue)
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
    const initialValue = 0
    const values  = [threeOfKind, fourOfKind, fullHouse, smStraight, lgStraight, yahtzee]
    const subtotal = values.reduce((acc, val) => acc + val, initialValue)
    return subtotal + (yahtzeeBonus * 100)
  }

  const getGrandTotal = () => {
    return upperTotal + lowerTotal
  }

  const [aces, setAces] = useState(0)
  const [twos, setTwos] = useState(0)
  const [threes, setThrees] = useState(0)
  const [fours, setFours] = useState(0)
  const [fives, setFives] = useState(0)
  const [sixes, setSixes] = useState(0)
  const [bonus, setBonus] = useState(false)
  const [upperSubTotal, setUpperSubTotal] = useState(getUpperSubtotal)
  const [upperTotal, setUpperTotal] = useState(getUpperTotal)

  const [threeOfKind, setThreeOfKind] = useState(0)
  const [fourOfKind, setFourOfKind] = useState(0)
  const [fullHouse, setFullHouse] = useState(0)
  const [smStraight, setSmStraight] = useState(0)
  const [lgStraight, setLgStraight] = useState(0)
  const [yahtzee, setYahtzee] = useState(0)
  const [chance, setChance] = useState(0)
  const [yahtzeeBonus, setYahtzeeBonus] = useState(0)
  const [lowerTotal, setLowerTotal] = useState(getLowerTotal)
  const [grandTotal, setGrandTotal] = useState(getGrandTotal)

  return (
    <div className="w-full h-full p-5 text-sm">
      <div>SCORE CARD</div>
      <div className="grid grid-cols-3">
        <div>Category</div>
        <div>Score</div>
        <div>How to Score</div>
      </div>

      <div>Upper Section</div>

      <div className="grid grid-rows-9 auto-rows-min">
        <div className="grid grid-cols-3">
          <div>Aces</div>
          <div>{aces}</div>
          <div>Count and Add Only Aces</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Twos</div>
          <div>{twos}</div>
          <div>Count and Add Only Twos</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Threes</div>
          <div>{threes}</div>
          <div>Count and Add Only Threes</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Fours</div>
          <div>{fours}</div>
          <div>Count and Add Only Fours</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Fives</div>
          <div>{fives}</div>
          <div>Count and Add Only Fives</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Sixes</div>
          <div>{sixes}</div>
          <div>Count and Add Only Sixes</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Upper Subtotal</div>
          <div>{upperSubTotal}</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Bonus</div>
          <div>{bonus}</div>
          <div>If total score is 63 or over</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Lower Total</div>
          <div>{lowerTotal}</div>
        </div>
      </div>

      <div>Lower Section</div>

      <div className="grid grid-rows-11 items-center">
        <div className="grid grid-cols-3">
          <div>3 of a Kind</div>
          <div>{threeOfKind}</div>
          <div>Add total of 3 matching dice</div>
        </div>
        <div className="grid grid-cols-3">
          <div>4 of a Kind</div>
          <div>{fourOfKind}</div>
          <div>Add total of 4 matching dice</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Full House</div>
          <div>{fullHouse}</div>
          <div>Add total of 3 matching dice + 2 matching dice</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Sm. Straight</div>
          <div>{smStraight}</div>
          <div>Sequence of 4</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Lg. Straight</div>
          <div>{lgStraight}</div>
          <div>Sequence of 5</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Yahtzee</div>
          <div>{yahtzee}</div>
          <div>5 of a Kind</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Chance</div>
          <div>{chance}</div>
          <div>Add Total of All Dice</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Yahtzee Bonus</div>
          <div>{yahtzeeBonus * 100}</div>
          <div>100 for Each Bonus</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Lower Total</div>
          <div>{lowerTotal}</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Upper Total</div>
          <div>{upperTotal}</div>
        </div>
        <div className="grid grid-cols-3">
          <div>Grand Total</div>
          <div>{grandTotal}</div>
        </div>
      </div>
    </div>
  )
}
