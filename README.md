# Woodpecker

Woodpecker is cron runner on 'Deno'.

# ⚠ Caution

It may be subject to significant changes dependent on changes in the Deno.cron
specification.

# Usage

```sh
$ deno -V
deno 1.38.0

$ deno run --allow-read --unstable https://deno.land/x/woodpecker/cli.ts

#or

$ deno install --name=woodpecker --allow-read --unstable https://deno.land/x/woodpecker/cli.ts
$ woodpecker

🎉Test Pass file: ./woodpecker_config.jsonc
Scheduled cron job[Cron job 1]: * * * * *: file:/usr/src/app/cron_task.ts#job
Scheduled cron job[Cron job 2]: * * * * *: file:/usr/src/app/cron_task_2.ts#job2
START cron. file: woodpecker_config.jsonc
Execute cron job[Cron job 1]: * * * * *: file:/usr/src/app/cron_task.ts#job
Call cron job 1.
Execute cron job[Cron job 2]: * * * * *: file:/usr/src/app/cron_task.ts#job2
Call cron job 2.


$ deno run --allow-read --unstable-cron https://deno.land/x/woodpecker/cli.ts -h

Usage:
  deno run --allow-read --unstable-cron https://deno.land/x/woodpecker/cli.ts # default config file is 'woodpecker_config.jsonc'
  deno run --allow-read --unstable-cron https://deno.land/x/woodpecker/cli.ts --config=same.json(c)
  deno run --allow-read https://deno.land/x/woodpecker/cli.ts -t
  deno run --allow-read https://deno.land/x/woodpecker/cli.ts -t --config=same.json(c)
  deno run --allow-read https://deno.land/x/woodpecker/cli.ts -test
  deno run --allow-read https://deno.land/x/woodpecker/cli.ts -test --config=same.json(c)
  deno run https://deno.land/x/woodpecker/cli.ts -c >> same.jsonc
  deno run https://deno.land/x/woodpecker/cli.ts --create >> same.jsonc
  deno run https://deno.land/x/woodpecker/cli.ts -h
  deno run https://deno.land/x/woodpecker/cli.ts -help
```

# Config file

```json
{
  "jobs": [
    {
      "name": "Cron job 1",
      "schedule": "* * * * *",
      "source": "/usr/src/app/cron_task.ts"
    },
    {
      "name": "Cron job 2",
      "schedule": "* * * * *",
      "source": "/usr/src/app/cron_task_2.ts",
      "funcName": "job2",
      "backoffSchedule": [3000, 6000]
    }
  ]
}
```

- `source` is an absolute path.
- `funcName` is optional. Default is `job`.
- `backoffSchedule` is optional.
