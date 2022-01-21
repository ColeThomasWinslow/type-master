const Quote_URL = "http://api.quotable.io/random";
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const settingsSelect = document.getElementById("settings");
const ChangeTextBtn = document.getElementById("ChangeText");

quoteInput.addEventListener("input", () => {
  const arrayValue = quoteInput.value.split("");
  const arrayQuote = quoteDisplay.querySelectorAll("span");
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];

    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
    }
  });
});

// Home Row
function GetHomeRow() {
  var result = "";
  var characters = "a s d f g h j k l ; A S D F G H J K L ";
  var charactersLength = characters.length;
  for (var i = 0; i < 240; i++) {
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
  for (var i = 0; i < 240; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  let string = result.replace(/\s+/g, "-").trim();

  return string;
}

// Random Quote
// async function GetRandomQuote() {
//   const Text = await fetch(Quote_URL)
//     .then((response) => response.json())
//     .then((data) => data.content);
//   console.log(Text);
//   return Text;
// }
console.log(settingsSelect.value);
// Function to render a new text
function renderNewQuote() {
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
      //   case "RQ":
      //     quote = GetRandomQuote();
    }
    quote.split("").forEach((character) => {
      const characterSpan = document.createElement("span");
      characterSpan.innerText = character;
      quoteDisplay.appendChild(characterSpan);
    });
    quoteInput.value = null;
  });
}
function ChangeText() {
  const selection = settingsSelect.value;
  quoteDisplay.innerText = "";
  switch (selection) {
    case "HR":
      quote = GetHomeRow();
      break;
    case "FKB":
      quote = GetFullKeyBoardString();
      break;
    //   case "RQ":
    //     quote = GetRandomQuote();
  }
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });
  quoteInput.value = null;
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
}

renderFirstTimeQuote();
renderNewQuote();
