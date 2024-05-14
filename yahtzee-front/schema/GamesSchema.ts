import { z } from 'zod';

const Game = z.object({
  _id: z.string(),
  start_time: z.number(),
  player_ids: z.string().array(),
  scorecard_ids: z.string().array(),
  turns_taken: z.number()
})

const Games = z.object({
  games: z.array(Game)
})

export {
  Game,
  Games
};
