import { colorLog, jsonParse } from "../../deps.ts";
import { validateConfigArgs } from "../validate/args.ts";
import { validateConfigJson, WoodpeckerJob } from "../validate/file.ts";
import { isAbsolute } from "https://deno.land/std@0.205.0/path/mod.ts";
import { dirname, normalize } from "https://deno.land/std@0.205.0/path/mod.ts";


function viewSchedule(name: string, schedule: string, filePath: string){
  console.log(`Scheduled cron job[${name}]: ${schedule}: ${filePath}` );
}

function viewExecute(name: string, schedule: string, filePath: string){
  console.log(`Execute cron job[${name}]: ${schedule}: ${filePath}` );
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
    const path = isAbsolute(job.source)
      ? new URL(job.source, Deno.mainModule).pathname
      : normalize(`${dirname(Deno.mainModule)}/${job.source}`);
    
    viewSchedule(job.name, job.schedule, path);

    Deno.cron(job.name, job.schedule, async () => {
      const source = await import(path);
      const func = source[job.funcName || "job"];
      viewExecute(job.name, job.schedule, path)
      await func();
    });
  });
  console.log(colorLog.success(`START cron. file: ${configFilePath}`));
}
