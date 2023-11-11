const fileText = `
{
  "jobs": [
//    {
//      "name": "sample cron",
//      "schedule": "*/1 * * * *",
//      "source": "/usr/src/app/cron_task.ts"
//    },
//    {
//      "name": "sample cron 2",
//      "schedule": "*/1 * * * *",
//      "source": "/usr/src/app/cron_task.ts"
//      "funcName": "job2"
//      "backoffSchedule": [1000, 3000, 9000]
//    }
  ]
}
`;

export function getConfigFileText() {
  console.log(fileText);
}
