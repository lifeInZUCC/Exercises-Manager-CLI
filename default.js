const fs = require("fs");

const config = {
    origin: {
        switch: true,
        template: "txt",
        storage: "origin",
        extra: {
            file: [],
            dir: [],
        },
    },
    data: {
        switch: true,
        template: "json",
        storage: "data",
        extra: {
            file: [],
            dir: [],
        },
    },
    view: {
        template: "md",
        storage: "view",
    },
    viewformat: {
        size: "middle",
        align: "left",
        color: "red",
    },
};

fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
