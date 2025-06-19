const startBtn = document.getElementById('startBtn');
const box = document.getElementById('box');
const result = document.getElementById('result');
const message = document.getElementById('message');

let startTime, timeoutId;
let gameReady = false;
let gameStarted = false;

startBtn.addEventListener('click', function() {
    gameStarted = true;
    result.textContent = '';
    message.textContent = '';
    box.style.backgroundColor = '#ddd';
    box.textContent = 'Wait for green...';
    gameReady = false;

    const delay = Math.random() * 3000 + 2000;
    timeoutId = setTimeout(() => {
        box.style.backgroundColor = 'green';
        box.textContent = 'CLICK!';
        startTime = Date.now();
        gameReady = true;
    }, delay);
});

box.addEventListener('click', function() {
    if (!gameStarted) {
        message.textContent = 'Press start button first!';
        return;
    }
    if (!gameReady) {
        result.textContent = 'Too early! Wait for green!';
        clearTimeout(timeoutId);
        gameStarted = false;
        return;
    }
    if (gameReady) {
        const reactionTime = Date.now() - startTime;
        result.textContent = `Your reaction time: ${reactionTime} ms`;
        gameReady = false;
        gameStarted = false;
    }
});