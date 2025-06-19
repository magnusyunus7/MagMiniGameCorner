let selectedWord = "";
let correctGuesses = [];
let wrongGuesses = [];
const maxWrong = 10;
let words = [];

const wordDisplay = document.getElementById("wordDisplay");
const lettersContainer = document.getElementById("letters");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");


function setupGame() {
    if (words.length === 0) return;
    selectedWord = words[Math.floor(Math.random() * words.length)];
    correctGuesses = [];
    wrongGuesses = [];
    status.textContent = "";
    displayWord();
    generateLetters();
}

fetch("words.json")
    .then(res => res.json())
    .then(data => {
        words = data.words;
        setupGame();
    })
    .catch(err => {
        status.textContent = "Error loading word list.";
        console.error(err);
    });

function displayWord() {
    const display = selectedWord
        .split("")
        .map(letter => (correctGuesses.includes(letter) ? letter : "_"))
        .join(" ");
    wordDisplay.textContent = display;

    if (!display.includes("_")) {
        status.textContent = "🎉 You win!";
        disableAll();
    }
}

function generateLetters() {
    lettersContainer.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const char = String.fromCharCode(i).toLowerCase();
        const btn = document.createElement("button");
        btn.textContent = char;
        btn.addEventListener("click", () => handleGuess(char, btn));
        lettersContainer.appendChild(btn);
    }
}

function handleGuess(letter, btn) {
    btn.disabled = true;
    if (selectedWord.includes(letter)) {
        correctGuesses.push(letter);
        displayWord();
    } else {
        wrongGuesses.push(letter);
        status.textContent = `❌ Wrong guesses: ${wrongGuesses.length}/${maxWrong}`;
        if (wrongGuesses.length >= maxWrong) {
        status.textContent = `💀 You lose! The word was "${selectedWord}"`;
        disableAll();
        }
    }
}

function disableAll() {
    const buttons = lettersContainer.querySelectorAll("button");
    buttons.forEach(btn => (btn.disabled = true));
}

restartBtn.addEventListener("click", setupGame);

setupGame();
