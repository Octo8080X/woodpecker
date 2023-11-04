const helpText = `
Usage:
  deno run --allow-read cli.ts
  deno run --allow-read cli.ts --config=same.json(c)
  deno run --allow-read cli.ts -t
  deno run --allow-read cli.ts -t --config=same.json(c)
  deno run --allow-read cli.ts -test
  deno run --allow-read cli.ts -test --config=same.json(c)
  deno run cli.ts -c >> same.jsonc
  deno run cli.ts --create >> same.jsonc
  deno run cli.ts -h 
  deno run cli.ts -help
`;

export function viewHelp() {
  console.info(helpText);
}
