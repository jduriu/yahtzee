
const categoryMap = {
  "ones": 1,
  "twos": 2,
  "threes": 3,
  "fours": 4,
  "fives": 5,
  "sixes": 6,
}

const convertToArray = (dice) => {
  const diceArray = []
  for (let die of dice) {
    diceArray.push(die.value)
  }
  return diceArray
}

const count = (diceArray) => {
  const values = {}
  for (let die of diceArray) {
    if (die in values) {
      values[die] += 1
    } else {
      values[die] = 1
    }
  }
  return values
}

const sum = (diceArray) => {
  let result = diceArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  },0);
  return result
}

const processUpperSectionScore = ( diceArray, category ) => {
  const counts = count(diceArray)
  const dieNumber = categoryMap[category]
  const categoryCount = counts[dieNumber]
  if (categoryCount) {
    return dieNumber * categoryCount
  }
  return 0
}

const checkThreeOrFourOfKind = ( diceArray ) => {
  const counts = count(diceArray)
  for (const count of Object.values(counts)) {
    if (count === 3 || count === 4) {
      return true
    }
  }
  return false
}

const checkFullHouse = ( diceArray ) => {
  const counts = count(diceArray)
  let pair = false
  let triple = false

  for (const count of Object.values(counts)) {
    if (count === 2) {
      pair = true
    } else if (count === 3) {
      triple = true
    }
  }

  return pair && triple
}

const checkSmStraight = (diceArray) => {
  diceArray.sort()
  let l = 0
  let r = 0
  let straight = 1
  while (r < diceArray.length) {
    r += 1
    if (straight === 4) {
      return true
    }
    if (diceArray[r] - straight === diceArray[l]) {
      straight += 1
      if (straight === 4) {
        return true
      }
    } else {
      l = r
    }
  }
  return false
}

const checkLgStraight = (diceArray) => {
  diceArray.sort()
  let l = 0
  let r = 0
  let straight = 1
  while (r < diceArray.length) {
    r += 1
    if (diceArray[r] - straight === diceArray[l]) {
      straight += 1
      if (straight === 5) {
        return true
      }
    } else {
      l = r
    }
  }
  return false
}


const checkYahtzee = (diceArray) => {
  let count = 0
  for (let die of diceArray) {
    if (die === diceArray[0]) {
      count += 1
    }
  }
  return count === 5
}


const processDice = ( dice, selectedCategory, scorecard ) => {
  const upperSectionCategories = ["ones", "twos", "threes", "fours", "fives", "sixes"]
  const diceArray = convertToArray(dice)
  let turnValue = 0;
  if (scorecard.scored.includes(selectedCategory)) {
    // Add error handling here!
    // Shouldn't occur if fine-grained happens in UI (e.g. not able to submit a category that isn't available)
    return
  }
  if (upperSectionCategories.includes(selectedCategory)) {
    turnValue = processUpperSectionScore(diceArray, selectedCategory)
    console.log(`Scored ${selectedCategory}`)
  } else if (selectedCategory === "three_of_kind" || selectedCategory === "four_of_kind") {
    if (checkThreeOrFourOfKind(diceArray)) {
      turnValue = sum(diceArray)
      console.log(`Scored ${selectedCategory}`)
    }
  } else if (selectedCategory === "full_house") {
    if (checkFullHouse(diceArray)) {
      turnValue = 25
      console.log(`Scored ${selectedCategory}`)
    }
  } else if (selectedCategory === "sm_straight") {
    if (checkSmStraight(diceArray)) {
      turnValue = 30
      console.log(`Scored ${selectedCategory}`)
    }
  } else if (selectedCategory === "lg_straight") {
    if (checkLgStraight(diceArray)) {
      turnValue = 40
      console.log(`Scored ${selectedCategory}`)

    }
  }  else if (selectedCategory === "yahtzee") {
    if (checkYahtzee(diceArray)) {
      if (scorecard.scored.includes("yahtzee")) {
        turnValue = "yahtzeeBonus"
      } else {
        turnValue = 50
      }
    }
  }  else if (selectedCategory === "chance") {
    turnValue = sum(diceArray)
    console.log(`Scored ${selectedCategory}`)
  }
  return turnValue
}

export default processDice
