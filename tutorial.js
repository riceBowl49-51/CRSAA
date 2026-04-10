function loadUsername() {
    let username = localStorage.getItem("username");

    if (!username) {
        document.getElementById("greetings").innerText = "Tutorial Mode: Try typing any word!";
        return;
    }

    document.getElementById("greetings").innerText = `Hello, ${username} - Try typing any word!`;
}

document.getElementById("playButton").style.visibility = "hidden";
const MAXROW = 1;
const MAXCOL = 5;

var row = 1;
var col = 1;

const board = [
    ["", "", "", "", ""]
];

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (/^[a-zA-Z]$/.test(key)) {
        onLetterClicked(key.toUpperCase());
    }

    else if (key === "Enter") {
        event.preventDefault();
        onEnterClicked();
    }

    else if (key === "Backspace") {
        event.preventDefault();
        onDelClicked();
    }

});

function onLetterClicked(letter) {
    if (col > MAXCOL) return;

    board[row - 1][col - 1] = letter;
    document.getElementById("r" + row + "c" + col).innerText = letter;

    col++;
}

function onDelClicked() {
    if (col == 1) return;

    col--;
    board[row - 1][col - 1] = "";

    document.getElementById("r" + row + "c" + col).innerText = "";
}

function onEnterClicked() {
    if (col <= MAXCOL) {
        document.getElementById("result").innerText = "Finish the word first!";
        return;
    }

    document.getElementById("result").innerText = "";

    for (let index = 0; index < 5; index++) {
        if (index === 0) {
            document.getElementById("r" + row + "c" + (index + 1)).style.backgroundColor = "rgba(60, 255, 0, 0.30)";
        }
        else if (index === 1) {
            document.getElementById("r" + row + "c" + (index + 1)).style.backgroundColor = "rgba(255, 187, 0, 0.3)";
        }
        else {
            document.getElementById("r" + row + "c" + (index + 1)).style.backgroundColor = "rgba(255, 0, 0, 0.30)";
        }
    }

    document.getElementById("playButton").style.visibility = "visible";
    return;
}