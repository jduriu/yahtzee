import { z } from "zod";
import {
  Scorecard,
  UpperCategoryKeys,
  CategoryKeys,
} from "@/schema/ScorecardSchema";

type UpperCategories = z.infer<typeof UpperCategoryKeys>;
type Categories = z.infer<typeof CategoryKeys>;
type ScorecardProps = z.infer<typeof Scorecard>;
interface Dice {
  name: string;
  value: number;
  set: (num: number) => void;
  open: boolean;
  changeStatus: () => void;
}

const upperSectionCategories = [
  "ones",
  "twos",
  "threes",
  "fours",
  "fives",
  "sixes",
];

const categoryMap = {
  ones: 1,
  twos: 2,
  threes: 3,
  fours: 4,
  fives: 5,
  sixes: 6,
};

const count = (diceArray: number[]): Record<number, number> => {
  return diceArray.reduce((values, die) => {
    values[die] = (values[die] || 0) + 1;
    return values;
  }, {} as Record<number, number>);
};

const sum = (diceArray: number[]) => {
  return diceArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};

const processUpperSectionScore = (
  diceArray: number[],
  category: UpperCategories
) => {
  const counts = count(diceArray);
  const dieNumber = categoryMap[category];
  const categoryCount = counts[dieNumber];
  if (categoryCount) {
    return dieNumber * categoryCount;
  }
  return 0;
};

const checkThreeOrFourOfKind = (diceArray: number[]) => {
  const counts = count(diceArray);

  Object.values(counts).forEach((count) => {
    if (count === 4 || count === 4) {
      return true;
    }
  });
  return false;
};

const checkFullHouse = (diceArray: number[]) => {
  const counts = count(diceArray);
  let pair = false;
  let triple = false;

  Object.values(counts).forEach((count) => {
    if (count === 2) {
      pair = true;
    } else if (count === 3) {
      triple = true;
    }
  });
  return pair && triple;
};

const checkSmStraight = (diceArray: number[]) => {
  const sortedArray = [...diceArray].sort((a, b) => a - b);
  let maxStraight = 1;
  let currentStraight = 1;

  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i] === sortedArray[i - 1] + 1) {
      currentStraight++;
    } else {
      currentStraight = 1;
    }
    maxStraight = Math.max(maxStraight, currentStraight);
    if (maxStraight >= 4) {
      return true;
    }
  }

  return false;
};

const checkLgStraight = (diceArray: number[]) => {
  const sortedArray = [...diceArray].sort((a, b) => a - b);
  let maxStraight = 1;
  let currentStraight = 1;

  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i] === sortedArray[i - 1] + 1) {
      currentStraight++;
    } else {
      currentStraight = 1;
    }
    maxStraight = Math.max(maxStraight, currentStraight);
    if (maxStraight >= 5) {
      return true;
    }
  }
  return false;
};

const checkYahtzee = (diceArray: number[]) => {
  const counts = count(diceArray);
  return Object.keys(counts).length === 1;
};

const processDice = (
  dice: Dice[],
  selectedCategory: Categories,
  scorecard: ScorecardProps
) => {
  const diceArray = dice.map((die) => die.value);
  let turnValue: number | string = 0;
  if (scorecard.scored.includes(selectedCategory)) {
    // Add error handling here!
    // Shouldn't occur if fine-grained happens in UI (e.g. not able to submit a category that isn't available)
    return;
  }
  if (upperSectionCategories.includes(selectedCategory)) {
    turnValue = processUpperSectionScore(diceArray, selectedCategory);
  } else if (
    selectedCategory === "three_of_kind" ||
    selectedCategory === "four_of_kind"
  ) {
    if (checkThreeOrFourOfKind(diceArray)) {
      turnValue = sum(diceArray);
    }
  } else if (selectedCategory === "full_house") {
    if (checkFullHouse(diceArray)) {
      turnValue = 25;
    }
  } else if (selectedCategory === "sm_straight") {
    if (checkSmStraight(diceArray)) {
      turnValue = 30;
    }
  } else if (selectedCategory === "lg_straight") {
    if (checkLgStraight(diceArray)) {
      turnValue = 40;
    }
  } else if (selectedCategory === "yahtzee") {
    if (checkYahtzee(diceArray)) {
      if (scorecard.scored.includes("yahtzee")) {
        turnValue = "yahtzeeBonus";
      } else {
        turnValue = 50;
      }
    }
  } else if (selectedCategory === "chance") {
    turnValue = sum(diceArray);
  }
  return turnValue;
};

export default processDice;
