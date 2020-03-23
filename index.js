const command = require("child_process");
const fs = require("fs");
const config = require("./config.json");
const options = require("./lib/options");

let { input: inputFile, output: outputFile } = config;

options.toMarkdown(`data/${inputFile}`, `data/${outputFile}`);
