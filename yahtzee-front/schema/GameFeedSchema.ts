import { z } from 'zod';

const LogTypes = z.enum(['score', 'roll', 'turn']);

const Log = z.object({
  log_time: z.number(),
  type: LogTypes,
  category: z.string().optional(),
  value: z.number().or(z.number().array())
})

const GameFeed = z.object({
  _id: z.string(),
  scorecard_id: z.string(),
  logs: z.array(Log)
})

export {
  Log,
  GameFeed
};
