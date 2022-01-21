const Quote_URL = "https://api.quotable.io/random";
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const settingsSelect = document.getElementById("settings");
const ChangeTextBtn = document.getElementById("ChangeText");
const KeyScreen = document.getElementById("key");
const OffsetBG = document.getElementById("OffsetBG");
const TimerElm = document.getElementById("Timer");
const IncorrectLettersElm = document.getElementById("IncorrectLetters");
const CorrectLettersElm = document.getElementById("CorrectLetters");
function UpdateScore() {
  const IncorrectLetters = document.getElementsByClassName("incorrect");
  const CorrectLetters = document.getElementsByClassName("correct");
  IncorrectLettersElm.innerText = IncorrectLetters.length;
  CorrectLettersElm.innerText = CorrectLetters.length;
}
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  document.addEventListener("keydown", (event) => {
    const key = event.key;

    KeyScreen.classList.remove("fade");
    OffsetBG.classList.remove("fade");

    setTimeout(() => {
      KeyScreen.classList.add("fade");
      OffsetBG.classList.add("fade");
      if (key === " ") {
        KeyScreen.innerText = "Space";
      } else {
        KeyScreen.innerText = key;
      }
    }, 100);
  });
});

function ResetScore() {
  IncorrectLettersElm.innerText = 0;
  CorrectLettersElm.innerText = 0;
}
quoteInput.addEventListener("input", () => {
  const arrayValue = quoteInput.value.split("");
  const arrayQuote = quoteDisplay.querySelectorAll("span");
  let correct = true;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];

    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      UpdateScore();
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
      UpdateScore();
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
      UpdateScore();
    }
  });
  if (correct) {
    console.log("New");
    ChangeText();
  }
});

// Home Row
function GetHomeRow() {
  var result = "";
  var characters = "a s d f g h j k l ; A S D F G H J K L ";
  var charactersLength = characters.length;
  for (var i = 0; i < 260; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  let string = result.replace(/\s+/g, " ").trim();

  return string;
}

// Full Key Board
function GetFullKeyBoardString() {
  var result = "";
  var characters =
    "1234567890-=!@#$%^&*()_+QWERTYUIO P { }| A S D F G H J K L :Z X C V B N M < >? q w e r t y u i o p [ ] a s d f g h j k l ; z x c v b n m  ,  ";
  var charactersLength = characters.length;
  for (var i = 0; i < 260; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  let string = result.replace(/\s+/g, " ").trim();

  return string;
}

// Random Quote
function GetRandomQuote() {
  return fetch(Quote_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

// Function to render a new text
async function renderNewQuote() {
  const QuoteFromAPI = await GetRandomQuote();
  settingsSelect.addEventListener("change", (e) => {
    const selection = e.target.value;
    quoteDisplay.innerText = "";

    switch (selection) {
      case "HR":
        quote = GetHomeRow();
        break;
      case "FKB":
        quote = GetFullKeyBoardString();
        break;
      case "RQ":
        quote = QuoteFromAPI;
        break;
    }

    console.log("quote", quote);
    quote.split("").forEach((character) => {
      const characterSpan = document.createElement("span");
      characterSpan.innerText = character;
      quoteDisplay.appendChild(characterSpan);
    });
    quoteInput.value = null;
    RunTimer();
    ResetScore();
  });
}

// Get New Text
async function ChangeText() {
  const QuoteFromAPI = await GetRandomQuote();
  const selection = settingsSelect.value;
  quoteDisplay.innerText = "";
  switch (selection) {
    case "HR":
      quote = GetHomeRow();
      break;
    case "FKB":
      quote = GetFullKeyBoardString();
      break;
    case "RQ":
      quote = QuoteFromAPI;
      break;
  }
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });
  quoteInput.value = null;
  RunTimer();
  ResetScore();
}
ChangeTextBtn.onclick = function () {
  ChangeText();
};

function renderFirstTimeQuote() {
  const quote = GetHomeRow();
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });
  quoteInput.value = null;
  RunTimer();
  ResetScore();
}

let startTime;
function RunTimer() {
  TimerElm.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    TimerElm.innerText = GetTimerTime();
  }, 1000);
}
function GetTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}
renderFirstTimeQuote();
renderNewQuote();
