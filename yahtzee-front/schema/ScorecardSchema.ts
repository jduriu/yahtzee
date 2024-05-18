import { z } from 'zod';

const UpperCategories = z.object({
  ones: z.union([z.number(), z.null()]),
  twos: z.union([z.number(), z.null()]),
  threes: z.union([z.number(), z.null()]),
  fours: z.union([z.number(), z.null()]),
  fives: z.union([z.number(), z.null()]),
  sixes: z.union([z.number(), z.null()]),
});

const LowerCategories = z.object({
  three_of_kind: z.union([z.number(), z.null()]),
  four_of_kind: z.union([z.number(), z.null()]),
  full_house: z.union([z.number(), z.null()]),
  sm_straight: z.union([z.number(), z.null()]),
  lg_straight: z.union([z.number(), z.null()]),
  yahtzee: z.union([z.number(), z.null()]),
  chance: z.union([z.number(), z.null()]),
  yahtzee_bonus: z.union([z.number(), z.null()]),
});

const Categories = UpperCategories.merge(LowerCategories);

const Scorecard = Categories.extend({
  _id: z.string(),
  user_id: z.string(),
  player_order_id: z.number(),
  game_id: z.string(),
  scored: z.array(z.string()),
  bonus: z.union([z.number(), z.null()]),
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
