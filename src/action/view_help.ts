const helpText = `
Usage:
  deno run --allow-read --unstable-cron https://deno.land/x/woodpecker/cli.ts
  deno run --allow-read --unstable-cron https://deno.land/x/woodpecker/cli.ts --config=same.json(c)
  deno run --allow-read https://deno.land/x/woodpecker/cli.ts -t
  deno run --allow-read https://deno.land/x/woodpecker/cli.ts -t --config=same.json(c)
  deno run --allow-read https://deno.land/x/woodpecker/cli.ts -test
  deno run --allow-read https://deno.land/x/woodpecker/cli.ts -test --config=same.json(c)
  deno run https://deno.land/x/woodpecker/cli.ts -c >> same.jsonc
  deno run https://deno.land/x/woodpecker/cli.ts --create >> same.jsonc
  deno run https://deno.land/x/woodpecker/cli.ts -h 
  deno run https://deno.land/x/woodpecker/cli.ts -help
`;

export function viewHelp() {
  console.info(helpText);
}
