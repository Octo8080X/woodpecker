import { colorLog, jsonParse } from "../../deps.ts";
import { validateConfigArgs } from "../validate/args.ts";
import { validateConfigJson, WoodpeckerJob } from "../validate/file.ts";

function getBackoffScheduleText(backoffSchedule: number[]) {
  return `backoffSchedule: [${backoffSchedule.join(", ")}]`;
}

function viewSchedule(
  name: string,
  schedule: string,
  filePath: string,
  funcName: string,
  backoffSchedule?: number[],
) {
  const backoffScheduleText = backoffSchedule
    ? getBackoffScheduleText(backoffSchedule)
    : "";

  console.log(
    `Scheduled cron job[${name}]: ${schedule}: ${filePath}#${funcName}${
      backoffScheduleText !== "" ? `, ${backoffScheduleText}` : ""
    }`,
  );
}

function viewExecute(
  name: string,
  schedule: string,
  filePath: string,
  funcName: string,
  backoffSchedule?: number[],
) {
  const backoffScheduleText = backoffSchedule
    ? getBackoffScheduleText(backoffSchedule)
    : "";

  console.log(
    `Execute cron job[${name}]: ${schedule}: ${filePath}#${funcName}${
      backoffScheduleText !== "" ? `, ${backoffScheduleText}` : ""
    }`,
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
    const backoffSchedule = job.backoffSchedule;
    console.log(backoffSchedule);
    viewSchedule(job.name, job.schedule, path, funcName, backoffSchedule);
    Deno.cron(job.name, job.schedule, async () => {
      const source = await import(path);
      const func = source[funcName];
      viewExecute(job.name, job.schedule, path, funcName, backoffSchedule);
      await func();
    }, { backoffSchedule });
  });
  console.log(colorLog.success(`START cron. file: ${configFilePath}`));
}
