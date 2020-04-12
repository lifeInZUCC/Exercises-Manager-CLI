let bb = document.getElementById("bb");
let mooc = document.getElementById("mooc");

bb.onclick = function (element) {
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            file: "site/bb.js",
        });
    });
};

mooc.onclick = function (element) {
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            file: "site/mooc.js",
        });
    });
};
