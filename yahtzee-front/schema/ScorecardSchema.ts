import { z } from 'zod';

const UpperCategories = z.object({
  ones: z.number(),
  twos: z.number(),
  threes: z.number(),
  fours: z.number(),
  fives: z.number(),
  sixes: z.number(),
});

const LowerCategories = z.object({
  three_of_kind: z.number(),
  four_of_kind: z.number(),
  full_house: z.number(),
  sm_straight: z.number(),
  lg_straight: z.number(),
  yahtzee: z.number(),
  chance: z.number(),
  yahtzee_bonus: z.number(),
});

const Categories = UpperCategories.merge(LowerCategories);

const Scorecard = Categories.extend({
  _id: z.string(),
  user_id: z.string(),
  player_order_id: z.number(),
  game_id: z.string(),
  scored: z.array(z.string()),
  bonus: z.number(),
});

const UpperCategoryKeys = UpperCategories.keyof();
const LowerCategoryKeys = LowerCategories.keyof();
const CategoryKeys = Categories.keyof();

export {
  UpperCategories,
  UpperCategoryKeys,
  LowerCategories,
  LowerCategoryKeys,
  Categories,
  CategoryKeys,
  Scorecard
};
