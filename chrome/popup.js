let bb = document.getElementById("bb");
let mooc = document.getElementById("mooc");
let pta = document.getElementById("pta");

bb.onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            file: "js/bb.js",
        });
    });
};

mooc.onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            file: "js/mooc.js",
        });
    });
};

pta.onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            file: "js/pta.js",
        });
    });
};
