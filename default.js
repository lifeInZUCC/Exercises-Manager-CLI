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
        titleLevel: "###",
        tableHeader: "|编号|选项|",
        tableNeck: "|:-|:-|",
        colorMark: '<font color="red">',
    },
};

fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
