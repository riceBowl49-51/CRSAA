function validateForm() {
    let playerName = document.forms["player-form"]["username"].value;
    document.forms["player-form"]["username"].value = playerName.trim();
    if (playerName.trim() === "") {
        document.getElementById("result").innerText = "Enter name!";
        return false;
    }

    for (let i = 0; i < playerName.length; i++) {
        let ch = playerName[i];

        if (
            !(ch >= 'A' && ch <= 'Z') &&
            !(ch >= 'a' && ch <= 'z') &&
            !(ch >= '0' && ch <= '9') &&
            ch !== '_'
        ) {
            document.getElementById("result").innerText = "Username can only contain letters, numbers, and underscores! and no spaces!";
            return false;
        }
    }

    return true;
}

let savedUsername = localStorage.getItem("username");

if (savedUsername) {
    document.getElementById("result").innerText = "Welcome back, " + savedUsername + " - Ready to play?";
    document.forms["player-form"].style.display = "none";
}

function saveUsername() {
    if (!validateForm()) return false;

    let username = document.forms["player-form"]["username"].value;
    localStorage.setItem("username", username);
    document.getElementById("result").innerText = `Hello, ${username} - Enter tutorial or Play!`;

    return false;
}

function changeUsername() {
    document.forms["player-form"].style.display = "block";
    document.getElementById("result").innerText = "Enter a new username:";
}

function clearUsername() {
    localStorage.removeItem("username");
    document.getElementById("result").innerText = "Username cleared.";
    document.getElementById("username").value = "";
    document.forms["player-form"].style.display = "block";
}

function newInfo() {
    localStorage.removeItem("totalScore");
    localStorage.removeItem("lives");
    localStorage.removeItem("difficulty");
}