import { colorLog, jsonParse } from "../../deps.ts";
import { validateConfigArgs } from "../validate/args.ts";
import { validateConfigJson, WoodpeckerJob } from "../validate/file.ts";

function viewSchedule(
  name: string,
  schedule: string,
  filePath: string,
  funcName: string,
) {
  console.log(
    `Scheduled cron job[${name}]: ${schedule}: ${filePath}#${funcName}`,
  );
}

function viewExecute(
  name: string,
  schedule: string,
  filePath: string,
  funcName: string,
) {
  console.log(
    `Execute cron job[${name}]: ${schedule}: ${filePath}#${funcName}`,
  );
}

export async function startCron(
  args: Record<string, unknown>,
  options = { isTest: true },
) {
  if (!validateConfigArgs(args)) {
    Deno.exit();
  }

  const configFilePath = args.config || "./woodpecker_config.jsonc";
  const file = await Deno.readTextFileSync(configFilePath);
  const json = jsonParse(file);

  if (!validateConfigJson(json)) {
    console.error(colorLog.error(`Invalid config file:${configFilePath}`));
    Deno.exit();
  }
  console.log(colorLog.success(`🎉Test Pass file: ${configFilePath}`));

  if (options.isTest) {
    Deno.exit();
  }
  json.jobs.forEach((job: WoodpeckerJob) => {
    const path = `file:${job.source}`;
    const funcName = job.funcName || "job";
    viewSchedule(job.name, job.schedule, path, funcName);
    Deno.cron(job.name, job.schedule, async () => {
      const source = await import(path);
      const func = source[funcName];
      viewExecute(job.name, job.schedule, path, funcName);
      await func();
    });
  });
  console.log(colorLog.success(`START cron. file: ${configFilePath}`));
}
