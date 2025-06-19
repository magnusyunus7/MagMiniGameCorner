const quotes = [
    "Practice makes perfect",
    "Typing fast is a useful skill",
    "Stay focused and keep going",
    "Do or do not; there is no try",
    "Believe you can and you're halfway there",
    "Success is not final, failure is not fatal",
    "Every day is a new beginning",
    "Focus on your goals",
    "Keep pushing your limits",
    "Love all, trust a few, do wrong to none",
    "What is coming is better than what is gone",
    "Do what you can do today, not tomorrow",
    "Life is either a daring adventure or nothing",
    "The grass is greener where you water it",
    "You are stronger than you think",
    "Dream big, work hard, stay humble"
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("inputBox");
const resultEl = document.getElementById("result");
const doneBtn = document.getElementById("doneBtn");
const retryBtn = document.getElementById("retryBtn");

let currentQuote = "";
let startTime = 0;

function startTest() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = currentQuote;
    inputEl.value = "";
    inputEl.disabled = false;
    inputEl.focus();
    resultEl.textContent = "";
    resultEl.style.color = "black";
    startTime = Date.now();
    }

doneBtn.addEventListener("click", () => {
    const userInput = inputEl.value.trim();
    const correct = userInput === currentQuote;
    const timeTaken = (Date.now() - startTime) / 1000;

    if (correct) {
        resultEl.textContent = `✅ Correct! Time: ${timeTaken.toFixed(2)}s`;
        resultEl.style.color = "green";
    } else {
        resultEl.textContent = `❌ Incorrect. Try again.`;
        resultEl.style.color = "red";
    }

    inputEl.disabled = true;
});

retryBtn.addEventListener("click", () => {
    startTest();
});

window.onload = startTest;