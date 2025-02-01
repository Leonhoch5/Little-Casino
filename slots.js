const reels = document.querySelectorAll(".reel");
const spinButton = document.getElementById("spin");
const result = document.getElementById("result");

const symbols = ["🍒", "🍋", "🍊", "7"];

// Spin the reels
function spin() {
  result.textContent = "";
  reels.forEach((reel, index) => {
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    reel.textContent = randomSymbol;
    reel.dataset.symbol = randomSymbol;
  });
  checkWin();
}

// Check for a win
function checkWin() {
  const symbols = Array.from(reels).map((reel) => reel.dataset.symbol);
  if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
    result.textContent = "You win!";
  } else {
    result.textContent = "Try again!";
  }
}

// Event listener
spinButton.addEventListener("click", spin);
