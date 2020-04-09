const command = require("child_process");
const fs = require("fs");
const transform = require("./lib/transform");
const options = require("./lib/");

// transform.toMarkdown(`data/data.json`);
console.log(options.replaceExt("data.md",".md"));
