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
//      "fancName": "job2"
//    }
  ]
}
`;

export function getConfigFileText() {
  console.log(fileText);
}
