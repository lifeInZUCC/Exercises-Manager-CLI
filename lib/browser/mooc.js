(function() {
    var topic = [];
    var options = ["A", "B", "C", "D"];
    for (
        let i = 0;
        i < document.getElementsByClassName("m-choiceQuestion").length;
        i++
    ) {
        let temp = { topic: "", choice: [], answer: "" };
        temp.topic = document
            .getElementsByClassName("m-choiceQuestion")
            [i].getElementsByClassName("j-title")[0]
            .getElementsByClassName("f-richEditorText")[0].textContent;
        for (
            let j = 0;
            j <
            document
                .getElementsByClassName("m-choiceQuestion")
                [i].getElementsByClassName("j-choiceBox")[0]
                .getElementsByClassName("f-richEditorText").length;
            j++
        ) {
            if (
                document
                    .getElementsByClassName("m-choiceQuestion")
                    [i].getElementsByClassName("j-choiceBox")[0]
                    .getElementsByClassName("f-richEditorText").length == 2
            ) {
                temp.choice.push({
                    option: options[j],
                    content:
                        document
                            .getElementsByClassName("m-choiceQuestion")
                            [i].getElementsByClassName("j-choiceBox")[0]
                            .getElementsByClassName("f-richEditorText")
                            [j].getElementsByClassName("u-icon-wrong").length ==
                        0
                            ? "T"
                            : "F"
                });
            } else {
                temp.choice.push({
                    option: options[j],
                    content: document
                        .getElementsByClassName("m-choiceQuestion")
                        [i].getElementsByClassName("j-choiceBox")[0]
                        .getElementsByClassName("f-richEditorText")[j]
                        .textContent
                });
            }
        }
        temp.answer = document
            .getElementsByClassName("m-choiceQuestion")
            [i].getElementsByClassName("j-choiceBox")[0]
            .getElementsByClassName("tt2")[0].textContent;
        topic.push(temp);
    }

    saveJSON("data.json", JSON.stringify(topic, null, "\t"));
})();

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
