function saveDifficulty(level) {
    localStorage.setItem("difficulty", level);
}

var totalScore = Number(localStorage.getItem("totalScore")) || 0;
var lives = Number(localStorage.getItem("lives")) || 3;

document.getElementById("score").innerText = `Score: ${totalScore}`;
document.getElementById("lives").innerText = `Lives: ${lives}`;