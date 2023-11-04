# Woodpecker

Woodpecker is cron runner on 'Deno'.

# Caution

It may be subject to significant changes dependent on changes in the Deno.cron specification.

# Usage

```sh
```

# Config file 

```json 
{
  "jobs": [
    {
      "name": "Cron job 1",
      "schedule": "* * * * *",
      "source": "./cron_task.ts"
    },
    {
      "name": "Cron job 2",
      "schedule": "* * * * *",
      "source": "/app/cron_task.ts",
      "funcName": "job2"
    }
  ]
}
```

ex. When using relative paths, the reference path is relative to the Woodpecker.