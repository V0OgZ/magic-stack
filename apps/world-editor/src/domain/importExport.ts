import { ScenarioSchema, type Scenario } from './schema';

export function importScenarioFromJson(jsonText: string): Scenario {
  const raw = JSON.parse(jsonText);
  const parsed = ScenarioSchema.parse(raw);
  return parsed;
}

export function exportScenarioToJson(scenario: Scenario): string {
  const parsed = ScenarioSchema.parse(scenario);
  return JSON.stringify(parsed, null, 2);
}


