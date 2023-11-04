import { colorLog, zod } from "../../deps.ts";

const REGEXP_FILE_NAME = new RegExp(".(js|mjs|jsx|ts|mts|tsx)$");

const woodpeckerJob = zod.object({
  name: zod.string({
    required_error: "Required 'name'",
    invalid_type_error: "'name' must be string",
  }),
  schedule: zod.string({
    required_error: "Required 'schedule'",
    invalid_type_error: "'schedule' must be string",
  }),
  source: zod
    .string({
      required_error: "Required 'source'",
      invalid_type_error: "'source' must be string",
    })
    .regex(REGEXP_FILE_NAME, {
      message: "'source' must be file name(.(js|mjs|jsx|ts|mts|tsx))",
    }),
  funcName: zod.string().optional(),
});

export type WoodpeckerJob = zod.infer<typeof woodpeckerJob>;

const woodpeckerConfig = zod.object({
  jobs: zod.array(woodpeckerJob, {
    required_error: "Required 'jobs'",
    invalid_type_error: "jobs must be array of WoodpeckerJob",
  }),
});

export type WoodpeckerConfig = zod.infer<typeof woodpeckerConfig>;

export function validateConfigJson(json: unknown): json is WoodpeckerConfig {
  const result = woodpeckerConfig.safeParse(json);

  if (!result.success) {
    JSON.parse(result.error.message).forEach((e: zod.ZodError) =>
      console.error(colorLog.error(`${e.path.join(".")}: ${e.message}`))
    );
  }

  return result.success;
}
