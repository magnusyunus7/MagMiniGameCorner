const buttons = ["green", "red", "yellow", "blue"];
let sequence = [];
let playerIndex = 0;
let waitingForInput = false;

const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");

function flash(buttonId) {
    const btn = document.getElementById(buttonId);
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 400);
}

function playSequence() {
    waitingForInput = false;
    let i = 0;

    const interval = setInterval(() => {
        flash(sequence[i]);
        i++;
        if (i >= sequence.length) {
        clearInterval(interval);
        waitingForInput = true;
        }
    }, 700);
}

function nextRound() {
    const nextColor = buttons[Math.floor(Math.random() * buttons.length)];
    sequence.push(nextColor);
    statusText.textContent = `Round ${sequence.length}`;
    playSequence();
}

function handleClick(color) {
    if (!waitingForInput) return;

    flash(color);

    if (color === sequence[playerIndex]) {
        playerIndex++;
        if (playerIndex === sequence.length) {
        playerIndex = 0;
        setTimeout(nextRound, 1000);
        }
    } else {
        statusText.textContent = `❌ Wrong! You reached round ${sequence.length}`;
        sequence = [];
        playerIndex = 0;
        waitingForInput = false;
    }
}

buttons.forEach(color => {
    document.getElementById(color).addEventListener("click", () => handleClick(color));
});

startBtn.addEventListener("click", () => {
    sequence = [];
    playerIndex = 0;
    statusText.textContent = "Watch the pattern...";
    nextRound();
});
