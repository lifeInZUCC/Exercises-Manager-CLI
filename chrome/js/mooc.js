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

function handleRadio(problem) {
    var problemObject = { title: "", choice: [], answer: "" };
    problemObject.title = problem
        .querySelector("div.j-title div.f-richEditorText")
        .textContent.trim();
    choices = problem.querySelectorAll("div.j-choicebox .choices label.f-cb");
    for (let choice of choices) {
        problemObject.choice.push({
            option: choice
                .querySelector("div.optionPos")
                .textContent.replace(".", ""),
            content: choice
                .querySelector("div.f-richEditorText")
                .textContent.trim(),
        });
    }
    try {
        problemObject.answer = problem
            .querySelector("div.analysisInfo span.tt2")
            .textContent.trim();
    } catch (error) {
        console.log(error);
        problemObject.answer = "undefine";
    }
    console.log(problemObject);
    return problemObject;
}
function handleCheckBox(problem) {
    var problemObject = { title: "", choice: [], answer: "" };
    problemObject.title = problem
        .querySelector("div.j-title div.f-richEditorText")
        .textContent.trim();
    choices = problem.querySelectorAll("div.j-choicebox .choices label.f-cb");
    for (let choice of choices) {
        problemObject.choice.push({
            option: choice
                .querySelector("div.optionPos")
                .textContent.replace(".", ""),
            content: choice
                .querySelector("div.f-richEditorText")
                .textContent.trim(),
        });
    }
    try {
        problemObject.answer = problem
            .querySelector("div.analysisInfo span.tt2")
            .textContent.trim()
            .split("、")
            .join(" ");
    } catch (error) {
        console.log(error);
        problemObject.answer = "undefine";
    }
    console.log(problemObject);
    return problemObject;
}
function handleSimpleRadio(problem) {
    var problemObject = { title: "", choice: [], answer: "" };
    problemObject.title = problem
        .querySelector("div.j-title div.f-richEditorText")
        .textContent.trim();
    choices = problem.querySelectorAll("div.j-choicebox .choices label.f-cb");
    for (let choice of choices) {
        console.log(choice.querySelector("div.f-richEditorText"));
        problemObject.choice.push({
            option: choice
                .querySelector("div.optionPos")
                .textContent.replace(".", ""),
            content:
                choice.querySelector(
                    "div.f-richEditorText span.u-icon-wrong"
                ) === null
                    ? "T"
                    : "F",
        });
    }
    try {
        problemObject.answer = problem
            .querySelector("div.analysisInfo span.tt2")
            .textContent.trim();
    } catch (error) {
        console.log(error);
        problemObject.answer = "undefine";
    }
    console.log(problemObject);
    return problemObject;
}
function handleText(problem) {
    var problemObject = { title: "", answer: "" };
    problemObject.title = problem
        .querySelector("div.j-title div.f-richEditorText")
        .textContent.trim();
    choices = problem.querySelectorAll("div.j-choicebox .choices label.f-cb");
    try {
        problemObject.answer = problem
            .querySelector("div.analysisInfo span.tt2")
            .textContent.trim();
    } catch (error) {
        console.log(error);
        problemObject.answer = "undefine";
    }
    console.log(problemObject);
    return problemObject;
}

(function () {
    if (!/icourse163/.test(window.location.href)) {
        window.alert("检测到不符合目标网站");
        return;
    }
    var problemSet = document.querySelectorAll(".u-questionItem");
    var problemObjectSet = [];
    for (let problem of problemSet) {
        switch (problem.querySelector(".qaCate span").textContent) {
            case "单选":
                problemObjectSet.push(handleRadio(problem));
                break;
            case "多选":
                problemObjectSet.push(handleCheckBox(problem));
                break;
            case "判断":
                problemObjectSet.push(handleSimpleRadio(problem));
                break;
            case "填空":
                problemObjectSet.push(handleText(problem));
                break;
        }
    }
    saveJSON("data.json", JSON.stringify(problemObjectSet, null, "\t"));
})();
