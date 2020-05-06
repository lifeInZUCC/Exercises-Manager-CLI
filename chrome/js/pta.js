function saveJSON(filename, data) {
    const blobData = new Blob([data], { type: "text/json" });
    const url = window.URL.createObjectURL(blobData);
    const a = document.createElement("a");
    a.download = filename;
    a.href = url;
    a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
    const event = document.createEvent("MouseEvents");
    event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
    );
    a.dispatchEvent(event);
}

function handleSimpleRadio(problems) {
    const options = ["A", "B"];
    var problemObjectSet = [];
    for (let problem of problems) {
        var problemObject = { title: "", choice: [], answer: "" };
        console.log(problem);
        problemObject.title = problem.querySelector(
            "div.ques-view p"
        ).textContent;
        problemObject.title = problemObject.title
            .replace(
                problem.querySelector("div.ques-view span.ques-score")
                    .textContent,
                ""
            )
            .trim();
        var choices = problem.querySelectorAll(
            "div.ques-view div.ques-answer label"
        );
        console.log(choices);
        for (let index = 0; index < choices.length; index++) {
            problemObject.choice.push({
                option: options[index],
                content: choices[index].textContent.trim(),
            });
        }
        problemObjectSet.push(problemObject);
    }
    console.log(problemObjectSet);
    return problemObjectSet;
}

function handleRadio(problems) {
    const options = ["A", "B", "C", "D"];
    var problemObjectSet = [];
    for (let problem of problems) {
        var problemObject = { title: "", choice: [], answer: "" };
        console.log(problem);
        problemObject.title = problem.querySelector(
            "div.ques-view p"
        ).textContent;
        problemObject.title = problemObject.title
            .replace(
                problem.querySelector("div.ques-view span.ques-score")
                    .textContent,
                ""
            )
            .trim();
        var choices = problem.querySelectorAll(
            "div.ques-view ol.ques-answer li"
        );
        console.log(choices);
        for (let index = 0; index < choices.length; index++) {
            problemObject.choice.push({
                option: options[index],
                content: choices[index].textContent.trim(),
            });
        }
        problemObjectSet.push(problemObject);
    }
    console.log(problemObjectSet);
    return problemObjectSet;
}

(function () {
    if (!/pintia/.test(window.location.href)) {
        window.alert("检测到不符合目标网站");
        return;
    }
    problems = document.querySelectorAll('div[class^="problemListItem"]');
    var problemObjectSet;
    switch (
        document.querySelector(
            "ul.nav-tabs li.nav-item a.active div.pc-text-raw"
        ).textContent
    ) {
        case "判断题":
            problemObjectSet = handleSimpleRadio(problems);
            break;
        case "单选题":
            problemObjectSet = handleRadio(problems);
            break;
    }
    saveJSON("data.json", JSON.stringify(problemObjectSet, null, "\t"));
})();
