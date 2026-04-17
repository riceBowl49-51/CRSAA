const wordsEasy = [
    "PLANT", "BRICK", "MOUSE", "TREND", "SHOUT", "FLARE", "COAST", "GRIND", "PIANO", "WRECK",
    "SCARF", "TOKEN", "BLEND", "SWIFT", "CHALK", "DRONE", "MAPLE", "CLOUD", "BRAVE", "LIGHT",
    "ROUND", "TRACK", "PRIDE", "GLORY", "FRESH", "CLIMB", "WATER", "BROWN", "NIGHT", "STORM",
    "FAITH", "RIVAL", "GHOST", "CRANE", "SHARE", "POINT", "BLAST", "FRAME", "SOUND", "TIGER",
    "CANDY", "ROUTE", "SPEAK", "FROST", "MAGIC", "LUNCH", "POWER", "DREAM", "BLAZE", "CURVE",
    "SIGHT", "GRACE", "CABLE", "FAINT", "SOLVE", "MARCH", "GUIDE", "PRANK", "SHIFT", "COVER",
    "BRAND", "SWEAR", "FLOAT", "CRISP", "SHINE", "PLUME", "CRAFT", "STONE", "LAYER", "MIGHT",
    "ROAST", "QUIET", "BLINK", "SPLIT", "FLOUR", "TRICK", "VOTER", "GRAIN", "SHOCK", "PAINT",
    "CROWD", "FLUID", "BREAD", "CHAIR", "SCORE", "THUMB", "GLIDE", "SPARK", "CLEAN", "WORST",
    "ROBIN", "MOUNT", "PLIER", "QUEST", "CROWN", "BRUSH", "PLANE", "FORCE", "WRATH", "TOWER"
];
const wordsMedium = [
    "SHELF", "FIGHT", "DRIVE", "BLADE", "GRANT", "VIRAL", "PRIZE", "SMOKE", "CHORD", "ADULT",
    "BASIC", "CHIME", "DELTA", "EPOCH", "HONEY", "INDEX", "JOKER", "KNIFE", "LEMON", "MANGO",
    "NOBLE", "OCEAN", "PULSE", "RADIO", "SAUCE", "TABLE", "VALOR", "WALTZ", "CLEFT", "YOUNG",
    "ZONAL", "AGENT", "BEACH", "CHART", "DANCE", "EARTH", "FIELD", "GIANT", "HOTEL", "IDEAL",
    "LASER", "METAL", "NURSE", "OPERA", "PANEL", "RANCH", "PIXEL", "SHARD", "BRINK", "SOLAR",
    "TEACH", "URBAN", "SIGMA", "WHEAT", "YEAST", "ABIDE", "BIRTH", "CLOWN", "WOVEN", "DROVE",
    "ENJOY", "FANCY", "GLOVE", "HOUSE", "IVORY", "JUMBO", "LIVER", "MINOR", "VAULT", "PAUSE",
    "QUILT", "TRAIL", "USING", "VOTED", "WOMAN", "ALERT", "BINGO", "ELFIN", "FIBER", "GAMER",
    "HAVEN", "BLUER", "CRONY", "ALONE", "BRINE", "CRATE", "DRAIN", "ELATE", "FLINT", "GRATE",
    "PLAIN", "SHORE", "SLATE", "SPINE", "TRIBE", "WHILE", "WRONG", "YACHT", "ZEBRA", "QUICK"
];
const wordsHard = [
    "FJORD", "GLENT", "PRONG", "SKIRT", "ZESTY", "QUART", "XYLEM", "JUMBO", "VODKA", "NYMPH",
    "CRYPT", "LYMPH", "GLYPH", "PSALM", "WRIST", "TWIRL", "BRISK", "CLINK", "DRIFT", "FRISK",
    "GRIND", "PLINK", "SHIRK", "SKIMP", "SLINK", "SPILT", "STIRK", "SWIRL", "TRICK", "TWIST",
    "WHIRL", "WRING", "WRINK", "WRONG", "ZONED", "ZONER", "ZONED", "QUILT", "QUINT", "QUICK",
    "QUACK", "QUARK", "QUALM", "QUASH", "QUEEN", "QUERY", "QUEST", "QUEUE", "QUELL", "QUIET",
    "QUIRK", "QUITE", "QUOTH", "QUIPS", "QUODS", "ZEBRA", "ZESTY", "ZINGY", "ZIPPY", "ZONAL",
    "JOKER", "JOUST", "JUDGE", "JUICE", "JUICY", "JUMPS", "JUNTA", "JUNTO", "JUROR", "KNOCK",
    "KNACK", "KNELT", "KNELT", "KNITS", "KNOBS", "KNOLL", "KNOCK", "KNOWS", "WRACK", "WRAPT",
    "WREAK", "WREST", "WRIED", "WRIES", "WRING", "WRIST", "WRITE", "WRONG", "WROTE", "YACHT",
    "YIELD", "YOKEL", "YOUNG", "YOURS", "YOUTH", "ZAPPY", "ZEBRA", "ZESTY", "ZONED", "ZONER"
];

var players = [];

var randomWord;
var wordArray;
var pointsPerWin;
const MAXCORRECTLETTERS = 5;
const MAXROW = 6;
const MAXCOL = 5;
var gameOver = false;
var row = 1;
var col = 1;
var totalScore = Number(localStorage.getItem("totalScore")) || 0;
var lives = Number(localStorage.getItem("lives")) || 3;

const board = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
];

var difficulty = localStorage.getItem("difficulty") || "easy";
selectDifficulty();

document.getElementById("score").innerText = `Score: ${totalScore}`;
document.getElementById("lives").innerText = `You have ${lives} lives`;

function selectDifficulty() {
    if (difficulty === "easy") {
        pointsPerWin = 1;
        randomWord = wordsEasy[Math.floor(Math.random() * wordsEasy.length)];
        wordArray = randomWord.split("");
    } else if (difficulty === "medium") {
        pointsPerWin = 2;
        randomWord = wordsMedium[Math.floor(Math.random() * wordsMedium.length)];
        wordArray = randomWord.split("");
    } else if (difficulty === "hard") {
        pointsPerWin = 5;
        randomWord = wordsHard[Math.floor(Math.random() * wordsHard.length)];
        wordArray = randomWord.split("");
    }
}

document.addEventListener("keydown", function (event) {
    if (gameOver) return;
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
    if (gameOver || col > MAXCOL || row > MAXROW) return;
    board[row - 1][col - 1] = letter;
    document.getElementById("r" + row + "c" + col).innerText = letter;
    col++;
}

function onDelClicked() {
    if (gameOver || col == 1) return;
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

    let correctLetters = 0;

    for (let index = 0; index < 5; index++) {
        let guessedLetter = board[row - 1][index];

        if (guessedLetter == wordArray[index]) {
            document.getElementById("r" + row + "c" + (index + 1)).style.backgroundColor = "rgba(60, 255, 0, 0.30)";
            document.getElementById(guessedLetter.toUpperCase()).style.backgroundColor = "rgba(60, 255, 0)";
            correctLetters++;
        }
        else if (wordArray.includes(guessedLetter)) {
            document.getElementById("r" + row + "c" + (index + 1)).style.backgroundColor = "rgba(255, 187, 0, 0.3)";
            document.getElementById(guessedLetter.toUpperCase()).style.backgroundColor = "rgba(255, 187, 0)";
        }
        else {
            document.getElementById("r" + row + "c" + (index + 1)).style.backgroundColor = "rgba(255, 0, 0, 0.30)";
            document.getElementById(guessedLetter.toUpperCase()).style.backgroundColor = "rgba(255, 0, 0)";
        }
    }

    if (correctLetters == MAXCORRECTLETTERS) {
        totalScore += pointsPerWin + (MAXROW - row);
        gameOver = true;
        saveGame();
        document.getElementById("score").innerText = `Score: ${totalScore}`;
        document.getElementById("result").innerText = `Correct! +${pointsPerWin + (MAXROW - row)} points`;
        document.getElementById("next").style.visibility = "visible";
        return;
    }
    else if (row == MAXROW) {
        lives--;
        document.getElementById("lives").innerText = `You have ${lives} left.`
        if (lives <= 0) {
            document.getElementById("result").innerText = `Game Over! Final Score: ${totalScore}. Word was ${randomWord}`;
            document.getElementById("nxtPlayerButton").style.visibility = "visible";
            gameOver = true;
            return;
        }
        gameOver = true;
        saveGame();
        document.getElementById("result").innerText = `Wrong! You lost a life. Word was ${randomWord}`;
        document.getElementById("next").style.visibility = "visible";
        return;
    }

    row++;
    col = 1;
}

function resetRound() {
    gameOver = false;
    selectDifficulty();

    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 5; c++) {
            board[r][c] = "";
            let cell = document.getElementById("r" + (r + 1) + "c" + (c + 1));
            cell.innerText = "";
            cell.style.backgroundColor = "";
        }
    }

    const keys = document.querySelectorAll(".keyboard button");
    for (let i = 0; i < keys.length; i++) {
        keys[i].style.backgroundColor = "";
    };

    row = 1;
    col = 1;

    document.getElementById("result").innerText = "";
    document.getElementById("nxtPlayerButton").style.visibility = "hidden";
}

function newPlayerButton() {
    addPlayer()
    localStorage.removeItem("totalScore");
    localStorage.removeItem("username");
    localStorage.removeItem("lives");
    localStorage.removeItem("difficulty");
    resetRound();
    
}

function nextButton() {
    saveGame();
    window.location.href = "level.html"

}

function addPlayer() {
    let username = localStorage.getItem("username");
    let score = localStorage.getItem("totalScore");

    let player = {
        username: username,
        score: score, 
    };

    let players = JSON.parse(localStorage.getItem("player"))

    players.push(player);
    localStorage.setItem("player", JSON.stringify(players));
}


function saveGame() {
    localStorage.setItem("totalScore", totalScore);
    localStorage.setItem("lives", lives);
}
    
