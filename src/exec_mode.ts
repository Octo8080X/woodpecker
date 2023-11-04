import { flagsParse } from "../deps.ts";
import { getConfigFileText } from "./action/get_config_file_text.ts";
import { startCron } from "./action/cron_runner.ts";
import { viewHelp } from "./action/view_help.ts";

export async function switchMode(args: string[]): Promise<void> {
  const parsedArgs = flagsParse(args);
  if (parsedArgs.help || parsedArgs.h) {
    viewHelp();
    Deno.exit();
  } else if (parsedArgs.create || parsedArgs.c) {
    getConfigFileText();
    Deno.exit();
  } else if (parsedArgs.test || parsedArgs.t) {
    startCron(parsedArgs);
  } else {
    startCron(parsedArgs, { isTest: false });
  }
}
