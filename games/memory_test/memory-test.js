const board = document.getElementById('game-board');
const status = document.getElementById('status');
const sizeSelect = document.getElementById('size-select');
const startBtn = document.getElementById('start-btn');

const allEmojis = ['🍎', '🍌', '🍇', '🍒', '🍉', '🍍', '🥝', '🍑', '🍓', '🥭', '🥥', '🫒', '🫐', '🍐', '🍅', '🩷', '🎀', '🏀'];

let firstCard, secondCard, lockBoard, matchedPairs, timerInterval, startTime;

startBtn.onclick = () => {
    const [cols, rows] = sizeSelect.value.split('x').map(Number);
    const totalCards = cols * rows;

    setupBoard(cols, rows, totalCards);
};

function setupBoard(cols, rows, totalCards) {
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = '⏱️ Time: 0.00s';
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);
    board.innerHTML = '';
    status.textContent = '';
    board.style.gridTemplateColumns = `repeat(${cols}, 80px)`;

    const neededPairs = totalCards / 2;
    const selectedEmojis = allEmojis.slice(0, neededPairs);
    const emojiPool = shuffle([...selectedEmojis, ...selectedEmojis]);

    [firstCard, secondCard] = [null, null];
    lockBoard = false;
    matchedPairs = 0;

    emojiPool.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.innerText = emoji;
        card.onclick = () => handleCardClick(card);
        board.appendChild(card);
  });
}

function handleCardClick(card) {
    if (lockBoard || card.classList.contains('revealed')) return;

    card.classList.add('revealed');

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        matchedPairs++;
        resetTurn();

        if (matchedPairs * 2 === board.children.length) {
            status.textContent = '🎉 You win!';
            clearInterval(timerInterval);
        }
    } else {
        setTimeout(() => {
        firstCard.classList.remove('revealed');
        secondCard.classList.remove('revealed');
        resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function updateTimer() {
  const elapsed = (Date.now() - startTime) / 1000;
  document.getElementById('timer').textContent = `⏱️ Time: ${elapsed.toFixed(1)}s`;
}