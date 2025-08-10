import { z } from 'zod';

export const IdSchema = z.string().min(1);

export const MetadataSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(''),
  difficulty: z.enum(['easy', 'normal', 'hard', 'nightmare']).default('normal'),
  duration: z.string().default(''),
  created: z.string().datetime().optional(),
});

export const InitialStateSchema = z.object({
  day: z.number().int().nonnegative().default(1),
  tw: z.number().default(0),
  te: z.number().default(0),
  resources: z
    .object({
      crystals: z.number().int().nonnegative().default(0),
      energy: z.number().int().nonnegative().default(0),
      temporal: z.number().int().nonnegative().default(0),
      quantum: z.number().int().nonnegative().default(0),
    })
    .default({ crystals: 0, energy: 0, temporal: 0, quantum: 0 }),
});

export const MapObjectSchema = z.object({
  kind: z.string().min(1),
  x: z.number().int().nonnegative(),
  y: z.number().int().nonnegative(),
  data: z.record(z.any()).optional(),
});

export const MapSchema = z.object({
  size: z.object({ x: z.number().int().positive(), y: z.number().int().positive() }),
  terrain: z.array(z.record(z.any())).default([]),
  objects: z.array(MapObjectSchema).default([]),
});

export const RegulatorsSchema = z.object({
  vince: z.object({ active: z.boolean().default(true), zone: z.string().default('') }).default({ active: true, zone: '' }),
  anna: z.object({ decay: z.number().int().nonnegative().default(0), zone: z.string().default('') }).default({ decay: 0, zone: '' }),
  overload: z.object({ stack: z.number().int().nonnegative().default(0), maxStack: z.number().int().positive().default(10) }).default({ stack: 0, maxStack: 10 }),
});

export const VictoryConditionSchema = z.object({
  type: z.string().min(1),
  params: z.record(z.any()).optional(),
});

export const EventSchema = z.object({
  id: IdSchema,
  day: z.number().int().nonnegative().default(1),
  type: z.string().min(1),
  payload: z.record(z.any()).default({}),
});

export const ScenarioSchema = z.object({
  id: IdSchema,
  version: z.literal('2.0'),
  metadata: MetadataSchema,
  initial_state: InitialStateSchema,
  map: MapSchema,
  regulators: RegulatorsSchema,
  victory_conditions: z.array(VictoryConditionSchema).default([]),
  events: z.array(EventSchema).default([]),
});

export type Scenario = z.infer<typeof ScenarioSchema>;

export function isScenario(value: unknown): value is Scenario {
  return ScenarioSchema.safeParse(value).success;
}


