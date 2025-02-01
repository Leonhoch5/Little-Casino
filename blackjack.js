const dealerCards = document.getElementById("dealer-cards");
const playerCards = document.getElementById("player-cards");
const dealerScore = document.getElementById("dealer-score");
const playerScore = document.getElementById("player-score");
const result = document.getElementById("result");
const dealButton = document.getElementById("deal");
const hitButton = document.getElementById("hit");
const standButton = document.getElementById("stand");

let deck = [];
let dealerHand = [];
let playerHand = [];
let gameOver = false;

// Create a deck of 52 cards
function createDeck() {
  const suits = ["♠", "♣", "♥", "♦"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  shuffleDeck();
}

// Shuffle the deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Deal initial cards
function deal() {
  dealerHand = [];
  playerHand = [];
  dealInitialCards();
  updateUI();
  dealButton.disabled = true;
  hitButton.disabled = false;
  standButton.disabled = false;
  gameOver = false;
  result.textContent = "";
}

// Draw a card from the deck
function drawCard() {
  return deck.pop();
}

// Calculate the score of a hand
function calculateScore(hand) {
  let score = 0;
  let aces = 0;
  for (let card of hand) {
    if (card.value === "A") {
      aces++;
      score += 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
}

// Update the UI
function updateUI() {
  dealerCards.innerHTML = dealerHand
    .map((card) => `<div class="card">${card.value}${card.suit}</div>`)
    .join("");
  playerCards.innerHTML = playerHand
    .map((card) => `<div class="card">${card.value}${card.suit}</div>`)
    .join("");
  dealerScore.textContent = calculateScore(dealerHand);
  playerScore.textContent = calculateScore(playerHand);
}

// Check for a winner
function checkWinner() {
  const dealerTotal = calculateScore(dealerHand);
  const playerTotal = calculateScore(playerHand);
  if (playerTotal > 21) {
    result.textContent = "You bust! Dealer wins.";
  } else if (dealerTotal > 21) {
    result.textContent = "Dealer busts! You win.";
  } else if (dealerTotal > playerTotal) {
    result.textContent = "Dealer wins.";
  } else if (dealerTotal < playerTotal) {
    result.textContent = "You win!";
  } else {
    result.textContent = "It's a tie!";
  }
  gameOver = true;
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;
}

// Event listeners
dealButton.addEventListener("click", deal);
hitButton.addEventListener("click", () => {
  playerHand.push(drawCard());
  updateUI();
  if (calculateScore(playerHand) > 21) {
    checkWinner();
  }
});
standButton.addEventListener("click", () => {
  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(drawCard());
  }
  updateUI();
  checkWinner();
});

// Initialize the game
createDeck();
dealButton.disabled = false;
hitButton.disabled = true;
standButton.disabled = true;

// Deal a card to a hand and update the UI
function dealCard(hand, element) {
  const card = deck.pop();
  hand.push(card);
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `${card.value}${card.suit}`;
  element.appendChild(cardElement);

  // Add flip animation
  setTimeout(() => {
    cardElement.classList.add("flip");
  }, 100);
}

// Deal initial cards to both player and dealer
function dealInitialCards() {
  dealCard(playerHand, playerCards);
  dealCard(dealerHand, dealerCards);
  dealCard(playerHand, playerCards);
  dealCard(dealerHand, dealerCards);
}
