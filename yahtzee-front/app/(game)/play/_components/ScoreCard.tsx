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
    <div className="w-full h-full px-10 py-5 text-md overflow-y-scroll">
      <div className="text-3xl py-3">SCORE CARD</div>
      <div className="text-2xl">Upper Section</div>

      <div className="grid grid-cols-[75%_25%] xl:grid-cols-[30%_20%_50%] py-3">
        <div>
          <div>Aces</div>
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
          <div>{aces}</div>
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
          <div>Count and Add Only Aces</div>
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
