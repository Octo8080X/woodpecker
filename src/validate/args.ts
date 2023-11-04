import { zod } from "../../deps.ts";

const REGEXP_FILE_NAME = new RegExp("\.(jsonc|json)$");

const isConfigArgs = zod.object({
  config: zod.string().regex(REGEXP_FILE_NAME).optional(),
});
type IsConfigArgs = zod.infer<typeof isConfigArgs>;

export function validateConfigArgs(args: unknown): args is IsConfigArgs {
  const result = isConfigArgs.safeParse(args);

  if (!result.success) {
    console.error(result.error);
  }

  return result.success;
}
