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

(function() {
    var topic = [];
    var options = ["A", "B", "C", "D"];
    for (let takeQuestionDiv of document.getElementsByTagName("fieldset")) {
        let temp = { topic: "", choice: [], answer: "" };
        temp.topic = takeQuestionDiv
            .getElementsByClassName("vtbegenerated")[0]
            .innerText.replace(/[\s]|[\d\.]+/g, "");
        for (
            let i = 0;
            i < takeQuestionDiv.getElementsByTagName("label").length;
            i++
        ) {
            temp.choice.push({
                option: options[i],
                content: takeQuestionDiv
                    .getElementsByTagName("label")
                    [i].innerText.replace(/[\s]|[\d\.]+/g, "")
            });
        }
        topic.push(temp);
    }
    saveJSON("data.json", JSON.stringify(topic, null, "\t"));
})();
