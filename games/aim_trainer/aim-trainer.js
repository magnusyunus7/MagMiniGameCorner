const gameArea = document.getElementById("gameArea");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("startBtn");

const totalTargets = 10;
let count = 0;
let times = [];

function getRandomPosition() {
    const x = Math.random() * (gameArea.clientWidth - 40);
    const y = Math.random() * (gameArea.clientHeight - 40);
    return { x, y };
}

function spawnTarget() {
    const target = document.createElement("div");
    target.classList.add("target");

    const { x, y } = getRandomPosition();
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    const appearTime = Date.now();

    target.addEventListener("click", () => {
        const clickTime = Date.now();
        const reactionTime = (clickTime - appearTime) / 1000;
        times.push(reactionTime);
        target.remove();
        count++;

        if (count < totalTargets) {
        setTimeout(spawnTarget, 300);
        } else {
        showResults();
        }
    });

    gameArea.appendChild(target);
}

function showResults() {
    const total = times.reduce((sum, t) => sum + t, 0);
    const average = total / times.length;
    resultEl.textContent = `🎯 Done! Average Time Per Target: ${average.toFixed(2)}s`;
}

startBtn.addEventListener("click", () => {
    resultEl.textContent = "";
    gameArea.innerHTML = "";
    times = [];
    count = 0;
    spawnTarget();
});
