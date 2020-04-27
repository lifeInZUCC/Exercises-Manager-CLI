const core = require("./lib/core");
const process = require("process");

//workflow主循环
var workflow = new core.Workflow();
workflow.loop();

process.on("unhandledRejection", (error) => {
    console.error("unhandledRejection", error);
    process.exit(1); // To exit with a 'failure' code
});
